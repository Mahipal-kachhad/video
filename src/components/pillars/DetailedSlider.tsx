"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Navigation } from "swiper/modules";

const Slider = ({ images }: { images: { url: string }[] }) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <>
      <div className="w-full py-5 relative group">
        <Swiper
          ref={swiperRef}
          loop={true}
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={20}
          centeredSlides
        >
          {images.map((img, idx) => (
            <SwiperSlide
              key={idx}
              className="w-[300px]! lg:w-[500px]! h-fit! cursor-grab active:cursor-grabbing"
            >
              <div className="bg-black">
                <img
                  src={img.url}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r hidden sm:block from-black to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l hidden sm:block from-black to-transparent z-10"></div>
          <button
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="absolute top-1/2 -translate-y-1/2 left-4 z-10 w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center  transition-all opacity-0 group-hover:opacity-100"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="absolute top-1/2 -translate-y-1/2 right-4 z-10 w-10 h-10 rounded-full bg-white/80 text-black flex items-center justify-center  transition-all opacity-0 group-hover:opacity-100"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
