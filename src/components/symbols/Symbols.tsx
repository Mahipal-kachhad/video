"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import fadeUp from "../mvty/function";
import SymbolsMB from "./SymbolsMB";
import { usePathname } from "next/navigation";

// Particles Imports
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions } from "@tsparticles/engine";

export default function Symbols() {
  const t = useTranslations("symbols");
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const [activeId, setActiveId] = useState(1);
  const [init, setInit] = useState(false);

  // Initialize Particles Engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Snow Configuration
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60, // lowered; visually identical but half the CPU
      interactivity: {
        events: { onClick: { enable: false }, onHover: { enable: false } },
      },
      particles: {
        color: { value: "#ff8127" },
        move: {
          direction: "bottom",
          enable: true,
          outModes: "out",
          speed: 1.5,
        },
        number: {
          density: { enable: true, width: 500, height: 800 },
          value: 40, // reduced from 60, but looks the SAME because density handles scaling
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 0.5 }, // smoother + cheaper
        },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
      background: { color: "transparent" },
    }),
    []
  );

  const cards = [
    {
      id: 1,
      title: t("label1"),
      text: t("text1"),
      textm: t("text4"),
      image: "/images/kalash.png",
    },
    {
      id: 2,
      title: t("label2"),
      text: t("text2"),
      textm: t("text5"),
      image: "/images/mashal.png",
    },
    {
      id: 3,
      title: t("label3"),
      text: t("text3"),
      textm: t("text6"),
      image: "/images/earth.png",
    },
  ];

  return (
    <div className="bg-black pt-20 pb-20">
      <motion.h1
        className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold sm:w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127] mb-12"
        {...fadeUp()}
      >
        {t("title")}
      </motion.h1>

      <div className="hidden sm:flex items-center justify-center">
        <div className="flex w-[95vw] max-w-7xl h-[500px] gap-4">
          {cards.map((card) => {
            const isActive = card.id === activeId;

            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveId(card.id)}
                animate={{ flex: isActive ? 4 : 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 25 }}
                className={`
                  relative h-full rounded-3xl overflow-hidden cursor-pointer
                  bg-linear-to-b from-[#7A3E09] to-black
                `}
              >
                {init && (
                  <motion.div
                    layout
                    className="absolute top-0 bottom-0 left-0 z-0 pointer-events-none"
                    style={{ width: 1000 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Particles
                      id={`desktop-particles-${card.id}`}
                      options={options}
                      className="w-full h-full"
                    />
                  </motion.div>
                )}

                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute z-10 left-[6%] lg:left-[8%] xl:left-[6%] scale-300 xl:scale-200 top-1/2 -translate-y-1/2 w-[170px] xl:w-[320px] pointer-events-none mix-blend-overlay"
                      >
                        <motion.img
                          src="/images/rays.png"
                          alt="rays"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 50,
                            ease: "linear",
                          }}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute z-10 left-[6%] scale-170 lg:left-[8%] xl:left-[6%] top-1/2 -translate-y-1/2 w-[170px] xl:w-[320px] pointer-events-none mix-blend-overlay"
                      >
                        <motion.img
                          src="/images/circle.png"
                          alt="rays"
                          transition={{
                            repeat: Infinity,
                            duration: 25,
                            ease: "linear",
                          }}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute z-10 left-[6%] lg:left-[8%] xl:left-[6%] scale-130 top-1/2 -translate-y-1/2 w-[170px] xl:w-[320px] pointer-events-none mix-blend-overlay"
                      >
                        <motion.img
                          src="/images/circle.png"
                          alt="rays"
                          transition={{
                            repeat: Infinity,
                            duration: 25,
                            ease: "linear",
                          }}
                          className="w-full h-full object-contain"
                        />
                      </motion.div> 
                      
                      
                    </>
                  )}
                </AnimatePresence>
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  className={`absolute z-20 flex items-center justify-center
                    ${
                      isActive
                        ? "top-1/2 -translate-y-1/2 left-[3%] lg:left-[7%] xl:left-[12%] w-[200px] xl:w-[230px] "
                        : "top-1/2 left-1/2 -translate-1/2 w-30 lg:w-30  xl:w-45 "
                    }
                  `}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{ pointerEvents: "none" }}
                  />
                </motion.div>

                <div className="absolute inset-0 z-30">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="absolute right-0 top-0 bottom-0 w-[50%] flex flex-col justify-center pr-8 lg:pr-12 pl-4"
                    >
                      <h3
                        className={`${
                          lang !== "en"
                            ? "text-5xl xl:text-6xl"
                            : "text-3xl xl:text-4xl"
                        } font-bold text-white mb-6 uppercase tracking-wide`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm xl:text-lg text-white/52 leading-relaxed font-light wrap-break-word text-justify hyphens-auto">
                        {card.text}
                      </p>
                    </motion.div>
                  )}

                  {/* {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-12 left-13 -translate-x-1/2"
                    >
                      <h3
                        className={`bg-linear-to-b font-bold from-white to-white/20 bg-clip-text text-transparent uppercase ${
                          lang !== "en"
                            ? "text-5xl xl:text-6xl"
                            : "text-3xl xl:text-4xl"
                        } py-4`}
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {card.title}
                      </h3>
                    </motion.div>
                  )} */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <SymbolsMB cards={cards} particleOptions={options} />
    </div>
  );
}
