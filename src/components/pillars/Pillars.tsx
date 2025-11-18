"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import fadeUp from "../function";
import BlurPopup from "../BlurPopup";
import { BsPatchPlusFill } from "react-icons/bs";
import DetailedSlider from "./DetailedSlider";
import axios from "axios";
import { useTranslations } from "next-intl";

interface Pillar {
  title: string;
  icon_path: string;
  content: string;
  sub_images: { url: string }[];
}

const Pillars = () => {
  const t = useTranslations()
  const [pillarsContent, setPillarContent] = useState<Pillar[]>([]);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_pillars.php?action=list")
      .then((data: any) => {
        setPillarContent(
          data.data.pillars.map((val: any) => {
            return {
              title: val.title,
              icon_path: `https://dhamadmin.cesihpl.com/${val.icon_path}`,
              content: val.content,
              sub_images: val.sub_images.map((v: any) => ({
                url: `https://dhamadmin.cesihpl.com/${v.url}`,
              })),
            };
          })
        );
      });
  }, []);

  const swiperRef = useRef<SwiperRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  return (
    <div className="w-full py-10">
      <div className="flex justify-between items-center w-[85vw] max-w-6xl mx-auto lg:pt-9">
        <motion.h2
          className="text-3xl lg:text-[2.5rem] xl:text-[3.2rem] font-bold  uppercase text-[#ff8127]"
          {...fadeUp()}
        >
          {t("titles.pillars")}
        </motion.h2>
      </div>
      <Swiper
        ref={swiperRef}
        spaceBetween={24}
        centeredSlides
        initialSlide={1}
        speed={1300}
        slidesPerView={"auto"}
        slidesPerGroup={1}
        breakpoints={{
          0: {
            initialSlide: 0,
          },
          436: {
            initialSlide: 1,
          },
        }}
        className="pt-14! pb-7! lg:pt-22! lg:pb-10!"
      >
        {pillarsContent.map((val, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[320px]! lg:w-[350px]! rounded-3xl aspect-70/44 lg:aspect-70/47 bg-black relative"
          >
            <div className="p-6 lg:p-7">
              <img
                src={val.icon_path}
                alt={`${val.title} icon`}
                className="block h-[35px] lg:h-10"
              />
              <h3 className="font-bold text-xl lg:text-2xl mt-3 lg:mt-5 mb-1">
                {val.title}
              </h3>
              <p className="text-[0.75rem] leading-6 lg:text-sm lg:leading-7 line-clamp-3 tracking-wide text-justify [word-spacing:2px]">
                {val.content}
              </p>

              <BsPatchPlusFill
                className="absolute right-3 top-3 lg:right-5 lg:top-4 text-3xl lg:text-3xl cursor-pointer"
                onClick={() => setSelectedPillar(val)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="flex justify-center xl:justify-end items-center gap-4 pe-5 w-[85vw] max-w-6xl mx-auto"
        {...fadeUp()}
      >
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="w-9 h-9 rounded-full border-2 border-neutral-400 bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="w-9 h-9 rounded-full border-2 border-neutral-400 bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </motion.div>

      {selectedPillar && (
        <BlurPopup
          isOpen={!!selectedPillar}
          setIsOpen={() => setSelectedPillar(null)}
        >
          <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 lg:mb-10 uppercase">
            {selectedPillar.title}
          </h2>
          <p className="pb-3 text-justify leading-7 lg:leading-8.5 indent-25">
            {selectedPillar.content}
          </p>
          <DetailedSlider images={selectedPillar.sub_images} />
        </BlurPopup>
      )}
    </div>
  );
};

export default Pillars;
