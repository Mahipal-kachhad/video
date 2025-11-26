import { useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Photos({ images }: { images: { url: string }[] }) {
  // Use a single ref array for better management
  const rowRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  
  // Ref to store scroll controllers (connects buttons to the physics engine)
  const controllers = useRef<{ [key: number]: (amount: number) => void }>({});

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // --- VIEWER LOGIC ---
  const openViewer = (index: number) => {
    setViewerIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => setIsViewerOpen(false);

  const nextImage = () => {
    setViewerIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setViewerIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isViewerOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeViewer();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isViewerOpen]);

  // --- UNIFIED SCROLL ENGINE ---
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    rowRefs.current.forEach((el, index) => {
      if (!el) return;

      // Initial Position Logic
      if (index === 1) {
        // Middle row starts at the end
        el.scrollLeft = el.scrollWidth;
      } else {
        el.scrollLeft = 0;
      }

      // Physics State
      let targetScroll = el.scrollLeft;
      let isAnimating = false;
      let rafId: number | null = null;

      const clamp = (v: number) =>
        Math.max(0, Math.min(v, el.scrollWidth - el.clientWidth));

      const smoothStep = () => {
        const diff = targetScroll - el.scrollLeft;
        
        // Stop if close enough
        if (Math.abs(diff) < 1) {
          el.scrollLeft = targetScroll;
          isAnimating = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          return;
        }

        // Friction (0.2 matches your Video component feel)
        el.scrollLeft += diff * 0.2;
        rafId = requestAnimationFrame(smoothStep);
      };

      // The Mover Function (Used by Wheel AND Button)
      const moveScroll = (delta: number) => {
        targetScroll = clamp(targetScroll + delta);
        if (!isAnimating) {
          isAnimating = true;
          smoothStep();
        }
      };

      // 1. Wheel Handler
      const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Row 1 (Index 1) is inverted direction on wheel
        const direction = index === 1 ? -1 : 1;
        const speedMultiplier = 2.0;

        moveScroll(e.deltaY * direction * speedMultiplier);
      };

      el.addEventListener("wheel", wheelHandler, { passive: false });

      // 2. Controller for Buttons
      controllers.current[index] = (amount: number) => {
        // Sync target with current position first to avoid jumps
        if (!isAnimating) targetScroll = el.scrollLeft;
        moveScroll(amount);
      };

      cleanups.push(() => {
        el.removeEventListener("wheel", wheelHandler);
        if (rafId) cancelAnimationFrame(rafId);
        delete controllers.current[index];
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [images]);

  // --- BUTTON CLICK HANDLER ---
  const handleScrollClick = (index: number, direction: number) => {
    const el = rowRefs.current[index];
    if (!el || !controllers.current[index]) return;

    // Calculate dynamic width based on the first image found
    const firstImg = el.querySelector("img");
    const scrollAmount = firstImg ? firstImg.clientWidth + 16 : 300; // width + gap

    // Call the controller
    controllers.current[index](scrollAmount * direction);
  };

  // --- RENDERING HELPERS ---
  const chunk = Math.ceil(images.length / 3);
  const rows = [
    images.slice(0, chunk),
    images.slice(chunk, chunk * 2),
    images.slice(chunk * 2),
  ];

  let globalIndex = 0;

  return (
    <>
      <div className="flex flex-col gap-4 relative w-full">
        {rows.map((rowImgs, i) => (
          <div key={i} className="relative group">
            
            {/* Left Button (Only Middle Row) */}
            {i === 1 && (
              <button
                onClick={() => handleScrollClick(i, -1)}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition cursor-pointer active:scale-90"
              >
                <FaCaretLeft size={22} />
              </button>
            )}

            {/* Right Button (Top and Bottom Rows) */}
            {i !== 1 && (
              <button
                onClick={() => handleScrollClick(i, 1)}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition cursor-pointer active:scale-90"
              >
                <FaCaretRight size={22} />
              </button>
            )}

            <div
              ref={(el) => { rowRefs.current[i] = el; }}
              className="flex gap-4 overflow-x-auto no-scrollbar px-2"
            >
              {rowImgs.map((item, idx) => {
                const indexForModal = globalIndex++;
                return (
                  <img
                    key={idx}
                    src={item.url}
                    onClick={() => openViewer(indexForModal)}
                    className="rounded-2xl object-cover aspect-3/2 h-45 shrink-0 cursor-pointer hover:opacity-80 transition"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isViewerOpen && (
          <Dialog
            as="div"
            open={isViewerOpen}
            onClose={closeViewer}
            className="fixed inset-0 z-200 flex items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeViewer}
            />

            <motion.img
              key={viewerIndex}
              src={images[viewerIndex]?.url}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative z-220 max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-230 bg-black/50 hover:bg-white hover:text-black text-white p-3 rounded-full text-2xl transition"
            >
              <FaCaretLeft />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-230 bg-black/50 hover:bg-white hover:text-black text-white p-3 rounded-full text-2xl transition"
            >
              <FaCaretRight />
            </button>

            <button
              onClick={closeViewer}
              className="absolute top-5 right-5 z-230 bg-black/50 hover:bg-white hover:text-black text-white p-2 rounded-full text-2xl transition"
            >
              <IoClose />
            </button>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}