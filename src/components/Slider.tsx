"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Slider = ({ images }: { images: { url: string }[] }) => {
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <div className="w-full sm:py-10">
      <Swiper
        ref={swiperRef}
        spaceBetween={24}
        centeredSlides
        loop
        speed={600}
        initialSlide={1}
        slidesPerView={"auto"}
        slidesPerGroup={1}
        className="pb-7!"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[250px]! lg:w-[350px]! rounded-3xl p-px sm:p-[1.5px] bg-[linear-gradient(90deg,#fff_0%,#ff9000_24.47%,#fff_48.32%,#ff9000_72.17%,#fff_97.79%)] overflow-hidden aspect-square"
          >
            <img
              src={img.url}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-cover rounded-3xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center xl:justify-end items-center w-[85vw] max-w-6xl mx-auto gap-4 xl:pe-5">
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
      </div>
    </div>
  );
};

export default Slider;
