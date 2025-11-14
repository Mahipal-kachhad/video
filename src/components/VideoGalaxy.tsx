"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useLayoutEffect, useState } from "react";
gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 500;
const FRAME_PATH_PREFIX = "/frames/frame_";
const FRAME_PATH_SUFFIX = ".webp";

const getImagePath = (frame: number): string => {
  return `${FRAME_PATH_PREFIX}${String(frame).padStart(
    3,
    "0"
  )}${FRAME_PATH_SUFFIX}`;
};

const VideoGalaxy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const imageCacheRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getImagePath(i);
      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
        setLoadProgress(percent);
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    imageCacheRef.current = images;
  }, []);

  useLayoutEffect(() => {
    if (!imagesLoaded || !imgRef.current || !containerRef.current) {
      return;
    }

    const img = imgRef.current;
    const scrollTrack = containerRef.current;

    img.src = getImagePath(1);

    let frame = { current: 1 };

    let ctx = gsap.context(() => {
      setTimeout(() => {
        gsap.to(frame, {
          current: FRAME_COUNT,
          scrollTrigger: {
            trigger: scrollTrack,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
          },
          ease: "none",
          onUpdate: () => {
            img.src = getImagePath(Math.round(frame.current));
          },
        });
      }, 0);
    });

    return () => {
      ctx.revert();
    };
  }, [imagesLoaded]);

  return (
    <div>
      <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center overflow-hidden -z-1">
        {imagesLoaded ? (
          <img
            ref={imgRef}
            className="
            h-screen 
            w-screen
            object-cover
          "
          />
        ) : (
          <div>
            <img src="/icons/Loading.gif" alt="Loading" />
            <p className="text-center">{loadProgress}%</p>
          </div>
        )}
      </div>
      <div className="h-[1500vh]" ref={containerRef} />
    </div>
  );
};

export default VideoGalaxy;
