"use client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import { FaPause, FaPlay } from "react-icons/fa";
import fadeUp from "./function";
import axios from "axios";
import { useTranslations } from "next-intl";
import { ScrollTrigger } from "gsap/all";

const AboutMVTY = () => {
  const t = useTranslations("titles");
  const [images, setImages] = useState([
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
  ]);

  const [imagesMobile, setImagesMobile] = useState([
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
  ]);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_home.php?action=list")
      .then((data: any) => {
        setImages(
          data.data.images
            .filter((val: any) => val.status)
            .map((val: any) => ({
              url: `https://dhamadmin.cesihpl.com/${val.url}`,
            }))
        );
      }).then(() => {
        ScrollTrigger.refresh();
      });;

    axios
      .get(
        "https://dhamadmin.cesihpl.com/edit_home_slider_mobile.php?action=list"
      )
      .then((data: any) => {
        setImagesMobile(
          data.data.images
            .filter((val: any) => val.status)
            .map((val: any) => ({
              url: `https://dhamadmin.cesihpl.com/${val.url}`,
            }))
        );
      }).then(() => {
        ScrollTrigger.refresh();
      });;
  }, []);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setImages(imagesMobile);
    }
  }, [imagesMobile]);

  const swiperRef = useRef<SwiperRef>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, []);

  const handlePlayPause = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAutoplayProgress = (s: any, time: number, progress: number) => {
    const currentProgress = (1 - progress) * 100;
    paginationRef.current?.style.setProperty(
      "--progress-width",
      `${currentProgress}%`
    );
  };

  return (
    <div className="sm:pt-15 pb-5 bg-black">
      <motion.h1
        className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold sm:w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127]"
        {...fadeUp()}
      >
        {t("mvtyDham")}
      </motion.h1>

      <div>
        <Swiper
          ref={swiperRef}
          className="mt-9 sm:mt-15"
          modules={[Pagination, Autoplay]}
          speed={1100}
          spaceBetween={20}
          slidesPerView={"auto"}
          centeredSlides
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              spaceBetween: 15,
            },
            436: {
              spaceBetween: 20,
            },
          }}
          pagination={{ clickable: true, el: ".about-mvty-pagination" }}
          onAutoplayTimeLeft={handleAutoplayProgress}
        >
          {images.map((val, idx) => (
            <SwiperSlide
              key={idx}
              className="w-[80vw]! h-[130vw]! bg-black sm:w-[65vw]! sm:h-[39vw]! flex items-center justify-center rounded-3xl sm:rounded-4xl lg:rounded-[3.3rem] overflow-hidden object-cover object-center"
            >
              <img
                src={val.url}
                alt="sliderImage"
                className="object-cover h-full sm:w-full sm:h-fit"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="sticky bottom-0 z-10 py-10">
          <div className="flex items-center justify-center mt-5 gap-4">
            <button
              onClick={handlePlayPause}
              className="p-5 rounded-full backdrop-blur-md bg-[rgba(42,42,45,0.72)] text-[#ffffff] font-medium transition"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div
              className="p-6 rounded-full gap-4 about-mvty-pagination flex items-center bg-[rgba(42,42,45,0.72)] backdrop-blur-md text-[#b3b3b3] font-medium  transition w-fit!"
              ref={paginationRef}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #fff;
          opacity: 0.8;
          border-radius: 50%;
          transition: width 0.3s ease-in-out, border-radius 0.3s ease-in-out;
        }
        .swiper-pagination-bullet-active {
          width: 55px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.3);
          opacity: 1; /* Reset opacity to 1 since we handle it in the background-color */
          position: relative;
          overflow: hidden;
        }
        .swiper-pagination-bullet-active::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: var(--progress-width, 0%);
          height: 100%;
          background-color: #fff;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AboutMVTY;
