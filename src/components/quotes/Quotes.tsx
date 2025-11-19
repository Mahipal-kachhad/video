"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import fadeUp from "../function";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Quotes = () => {
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const content =
    lang === "hi" ? "content_hin" : lang === "gu" ? "content_guj" : "content";
  const t = useTranslations();
  const swiperRef = useRef<SwiperRef>(null);

  const [items, setItems] = useState<{ content: string; image_path: string }[]>(
    []
  );

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_quotes.php?action=list")
      .then((data: any) => {
        setItems(
          data.data.quotes
            .filter((val: any) => val.status === "1")
            .map((val: any) => {
              return {
                content: val[content],
                image_path: `https://dhamadmin.cesihpl.com/${val.image_path}`,
              };
            })
        );
      });
  }, []);

  return (
    <div className="w-full py-5 xl:py-10 relative bg-black rounded-b-3xl sm:rounded-b-none sm:rounded-t-3xl">
      <motion.h2
        className="text-2xl sm:text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127] mt-3 lg:mt-15"
        {...fadeUp()}
      >
        {t("titles.quotes")}
      </motion.h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        speed={700}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        ref={swiperRef}
        className="pt-15! pb-20! sm:pb-5! xl:py-20!"
      >
        {items.map((card, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[300px]! lg:w-[400px]! rounded-lg cursor-grab active:cursor-grabbing"
          >
            {({ isActive }) => (
              <div className="relative w-full h-full">
                <div
                  className={`w-full h-full bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ${
                    isActive ? "" : "scale-[0.85] blur-[15px]"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={card.image_path}
                      alt={`Card image ${idx + 1}`}
                      className="w-full h-auto object-cover rounded-md"
                    />
                    <img
                      src="/favicon.png"
                      alt="Logo"
                      className="absolute top-2 right-2 w-10 h-10"
                    />
                  </div>
                  <div className="pt-4 text-center">
                    <p className="text-gray-700">
                      <span className="font-semibold">{idx + 1}.</span>{" "}
                      {card.content}
                    </p>
                    <p className="text-right text-sm text-gray-500 mt-2">
                      {t("mahapatra")}
                    </p>
                  </div>
                </div>
                {!isActive && (
                  <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none"></div>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute inset-y-0 left-0 right-0 flex items-end pb-7 sm:pb-0 sm:items-center justify-center gap-5 sm:justify-between px-4 z-10 pointer-events-none">
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="pointer-events-auto w-10 h-10 rounded-full border-2 border-neutral-400 bg-neutral-900 text-white shadow-md flex items-center justify-center  transition-colors"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="pointer-events-auto w-10 h-10 rounded-full border-2 border-neutral-400 bg-neutral-900 text-white shadow-md flex items-center justify-center  transition-colors"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Quotes;
