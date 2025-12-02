import { useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Photos({ images }: { images: { url: string }[] }) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const controllers = useRef<{ [key: number]: (amount: number) => void }>({});

  // Reverted to Global interaction state as requested
  const hasUserInteracted = useRef(false);
  const rowSpeeds = useRef<number[]>([]);
  const rowInView = useRef<{ [key: number]: boolean }>({});

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

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

  useEffect(() => {
    // Reset interaction state on mount/tab switch
    hasUserInteracted.current = false;

    const cleanups: (() => void)[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          rowInView.current[index] = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    const stopAllAutoScroll = () => {
      hasUserInteracted.current = true;
    };

    rowRefs.current.forEach((el, index) => {
      if (!el) return;

      observer.observe(el);
      rowInView.current[index] = false;

      // --- FIX: ResizeObserver ---
      // This detects when images load and the container gets wider.
      // If it's the middle row (index 1) and user hasn't touched it, 
      // we force it to the end (right side) so it doesn't get stuck at 0.
      const resizeObserver = new ResizeObserver(() => {
        if (index === 1 && !hasUserInteracted.current) {
             // Only snap to end if we are currently near the start (glitch state)
             // or if the difference is significant. 
             // Ideally, we just keep it pinned to end while loading.
             if(el.scrollLeft < el.scrollWidth - el.clientWidth - 100) {
                 el.scrollLeft = el.scrollWidth;
             }
        }
      });
      resizeObserver.observe(el);

      // Initial positioning
      if (index === 1) {
        el.scrollLeft = el.scrollWidth;
      } else {
        el.scrollLeft = 0;
      }

      if (!rowSpeeds.current[index]) {
        rowSpeeds.current[index] = 0.3 + Math.random() * 0.4;
      }

      let targetScroll = el.scrollLeft;
      let isAnimating = false;
      let physicsRafId: number | null = null;
      let autoScrollRafId: number | null = null;

      const clamp = (v: number) =>
        Math.max(0, Math.min(v, el.scrollWidth - el.clientWidth));

      const runAutoScroll = () => {
        if (
          rowInView.current[index] &&
          !hasUserInteracted.current &&
          !isAnimating
        ) {
          const speed = rowSpeeds.current[index];
          if (index === 1) {
            el.scrollLeft -= speed;
          } else {
            el.scrollLeft += speed;
          }
          targetScroll = el.scrollLeft;
        }
        autoScrollRafId = requestAnimationFrame(runAutoScroll);
      };
      runAutoScroll();

      const smoothStep = () => {
        const diff = targetScroll - el.scrollLeft;

        if (Math.abs(diff) < 1) {
          el.scrollLeft = targetScroll;
          isAnimating = false;
          if (physicsRafId) {
            cancelAnimationFrame(physicsRafId);
            physicsRafId = null;
          }
          return;
        }

        el.scrollLeft += diff * 0.2;
        physicsRafId = requestAnimationFrame(smoothStep);
      };

      const moveScroll = (delta: number) => {
        targetScroll = clamp(targetScroll + delta);
        if (!isAnimating) {
          isAnimating = true;
          smoothStep();
        }
      };

      const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        stopAllAutoScroll();

        const direction = index === 1 ? -1 : 1;
        const speedMultiplier = 2.0;

        moveScroll(e.deltaY * direction * speedMultiplier);
      };

      const touchHandler = () => {
        stopAllAutoScroll();
      };

      el.addEventListener("wheel", wheelHandler, { passive: false });
      el.addEventListener("touchstart", touchHandler, { passive: true });

      controllers.current[index] = (amount: number) => {
        stopAllAutoScroll();
        if (!isAnimating) targetScroll = el.scrollLeft;
        moveScroll(amount);
      };

      cleanups.push(() => {
        el.removeEventListener("wheel", wheelHandler);
        el.removeEventListener("touchstart", touchHandler);
        if (physicsRafId) cancelAnimationFrame(physicsRafId);
        if (autoScrollRafId) cancelAnimationFrame(autoScrollRafId);
        resizeObserver.disconnect(); // Clean up observer
        delete controllers.current[index];
        observer.unobserve(el);
      });
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [images]);

  const handleScrollClick = (index: number, direction: number) => {
    const el = rowRefs.current[index];
    if (!el || !controllers.current[index]) return;

    const firstImg = el.querySelector("img");
    const scrollAmount = firstImg ? firstImg.clientWidth + 16 : 300;

    controllers.current[index](scrollAmount * direction);
  };

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
            {i === 1 && (
              <button
                onClick={() => handleScrollClick(i, -1)}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition cursor-pointer active:scale-90"
              >
                <FaCaretLeft size={22} />
              </button>
            )}

            {i !== 1 && (
              <button
                onClick={() => handleScrollClick(i, 1)}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition cursor-pointer active:scale-90"
              >
                <FaCaretRight size={22} />
              </button>
            )}

            <div
              data-index={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar px-2"
              onClick={() => {}}
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
            className="fixed inset-0 z-2200 flex items-center justify-center"
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
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-230 bg-black/50 hover:bg-white hover:text-black text-white p-3 rounded-full text-2xl transition"
            >
              <FaCaretLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
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