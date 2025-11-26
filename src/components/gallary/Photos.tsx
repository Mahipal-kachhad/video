import { RefObject, useEffect, useRef, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Photos({ images }: { images: { url: string }[] }) {
  const rowRefs: RefObject<HTMLDivElement>[] = [
    useRef(null!),
    useRef(null!),
    useRef(null!),
  ];

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

  const scrollByOne = (index: number, direction: number) => {
    const el = rowRefs[index].current;
    if (!el) return;
    const firstImg = el.querySelector("img");
    if (!firstImg) return;
    const imgWidth = firstImg.clientWidth + 16;

    el.scrollTo({
      left: el.scrollLeft + imgWidth * direction,
      behavior: "smooth",
    });
  };

  // JS-based smooth horizontal scroll ONLY (no vertical fallback)
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    rowRefs.forEach((ref, index) => {
      const el = ref.current;
      if (!el) return;

      if (index === 1) el.scrollLeft = el.scrollWidth;
      else el.scrollLeft = 0;

      let isAnimating = false;
      let targetScroll = el.scrollLeft;
      let rafId: number | null = null;

      const clamp = (v: number) =>
        Math.max(0, Math.min(v, el.scrollWidth - el.clientWidth));

      const smoothStep = () => {
        const diff = targetScroll - el.scrollLeft;
        if (Math.abs(diff) < 0.5) {
          el.scrollLeft = targetScroll;
          isAnimating = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          return;
        }

        el.scrollLeft += diff * 0.15;
        rafId = requestAnimationFrame(smoothStep);
      };

      const handler = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const direction = index === 1 ? -1 : 1;
        const speedMultiplier = 1.8;

        targetScroll = clamp(
          targetScroll + e.deltaY * direction * speedMultiplier
        );

        if (!isAnimating) {
          isAnimating = true;
          smoothStep();
        }
      };

      el.addEventListener("wheel", handler, { passive: false });
      cleanups.push(() => el.removeEventListener("wheel", handler));
      cleanups.push(() => rafId && cancelAnimationFrame(rafId));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [images]);

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
          <div key={i} className="relative">
            {i === 1 && (
              <button
                onClick={() => scrollByOne(i, -1)}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-8 h-8 flex items-center justify-center rounded-full"
              >
                <FaCaretLeft size={20} />
              </button>
            )}

            {i !== 1 && (
              <button
                onClick={() => scrollByOne(i, 1)}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-8 h-8 flex items-center justify-center rounded-full"
              >
                <FaCaretRight size={20} />
              </button>
            )}

            <div
              ref={rowRefs[i]}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.img
              key={viewerIndex}
              src={images[viewerIndex]?.url}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative z-220 max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            />

            <button
              onClick={prevImage}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-230 text-white p-2 rounded-full text-3xl"
            >
              <FaCaretLeft />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-230 text-white p-2 rounded-full text-3xl"
            >
              <FaCaretRight />
            </button>

            <button
              onClick={closeViewer}
              className="absolute top-5 right-5 z-230 bg-white text-black p-2 rounded-full text-2xl"
            >
              <IoClose />
            </button>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
