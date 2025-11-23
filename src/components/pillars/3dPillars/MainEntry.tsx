"use client";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Suspense, useEffect, useRef, useState } from "react";
import fadeUp from "@/components/mvty/function";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const MainEntry = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const t = useTranslations();

  const toggleFullscreen = () => {
    console.log("ff request");
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch((err: any) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      }
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center pt-15">
        <motion.h2
          className="text-3xl lg:text-[2.5rem] xl:text-[3.2rem] font-bold  uppercase text-[#ff8127]"
          {...fadeUp()}
        >
          {t("titles.pillars")}
        </motion.h2>
      </div>
      <div
        className={`flex justify-center items-center`}
      >
        <div
          className="h-[80vh] w-[90vw] xl:h-[80vh] xl:w-[80vw] relative my-15"
          ref={containerRef}
        >
          <div className="absolute left-0 top-0 w-full h-full z-10 pointer-events-none">
            <div className="justify-end flex p-5">
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-[#464646]/80 rounded-full transition-all active:scale-95 flex items-center justify-center pointer-events-auto"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? (
                  <img
                    src="/icons/pa-small.svg"
                    alt="small screen"
                    width={18}
                  />
                ) : (
                  <img src="/icons/pa-full.svg" alt="small screen" width={18} />
                )}
              </button>
            </div>
          </div>
          <div
            className={`h-full w-full bg-black overflow-hidden ${
              isFullscreen ? "" : "rounded-4xl"
            }`}
          >
            <Canvas>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEntry;
