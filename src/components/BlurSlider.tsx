"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

const BlurSlider = () => {
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/dham/patr15.jpg" },
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/patr8.jpg" },
    { url: "/dham/patr9.jpg" },
    { url: "/dham/patr10.jpg" },
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/patr8.jpg" },
    { url: "/dham/patr9.jpg" },
    { url: "/dham/patr10.jpg" },
    { url: "/dham/patr1.jpg" },
  ]);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_gaushla_image.php?action=list")
      .then((data: any) => {
        setImages(
          data.data.images[0].sub_images.map((val: any) => {
            return {
              url: `https://dhamadmin.cesihpl.com${val.url}`,
            };
          })
        );
      });
  }, []);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="w-full bg-black pb-10 pt-4 sm:pt-20 sm:rounded-b-3xl relative rounded-t-4xl overflow-hidden">
      <Swiper
        ref={swiperRef}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={-20}
        loop
        speed={1300}
        breakpoints={{
          0: {
            spaceBetween: 15,
          },
          436: { spaceBetween: -20 },
        }}
        className="max-w-full"
      >
        {images.map((img, idx) => (
          <SwiperSlide
            key={idx}
            className="w-[95vw]! h-[60vw]! sm:w-[50vw]! sm:h-[30vw]! overflow-hidden transition-all duration-500"
          >
            {({ isActive }) => (
              <div
                className={`w-full h-full relative transition-all duration-300 ${
                  !isActive ? "sm:scale-[0.8]" : ""
                }`}
              >
                <img
                  src={img.url}
                  alt={`Gallery image ${idx + 1}`}
                  className={`w-full h-full object-cover rounded-3xl ${
                    !isActive ? "" : ""
                  } `}
                />
                {!isActive && (
                  <div className="absolute inset-0 sm:backdrop-blur-sm rounded-3xl bg-black/30"></div>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center gap-4 pt-10">
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
      <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-black to-transparent z-10"></div>
      <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-black to-transparent z-10"></div>
    </div>
  );
};

export default BlurSlider;
