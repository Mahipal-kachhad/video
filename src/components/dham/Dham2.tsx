"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import fadeUp from "../function";
import { HiArrowLongRight } from "react-icons/hi2";
import BlurPopup from "../BlurPopup";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import moreDetails from "./moreDetails";
import axios from "axios";

const Dham2 = () => {
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa10.jpg" },
    
  ]);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_dham_image.php?action=list")
      .then((data: any) => {
        setImages(
          data.data.images[0].sub_images.map((val: any) => {
            return {
              url: `https://dhamadmin.cesihpl.com/${val.url}`,
            };
          })
        );
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="bg-black pb-25 pt-10 hidden sm:block 2xl:hidden rounded-b-3xl">
      <div className="w-[90vw] mx-auto">
        <motion.h2
          {...fadeUp()}
          className="text-3xl leading-11 lg:text-[2.5rem] xl:text-[3.4rem] font-bold w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127]"
        >
          Maa Vishvambhari TirthYatra Dham
        </motion.h2>

        <div className="flex gap-6 h-[55vw] items-center pt-20">
          <motion.div {...fadeUp()} className="h-fit ">
            <p className="font-bold text-[#86868b] indent-23 sm:indent-50 text-justify leading-7 lg:leading-8 line-clamp-15 overflow-hidden">
              On the western coast of India, in south of Gujarat state, to the
              east of Valsad district there are lust green hill ranges of
              Sahyadri and on West side howling Arabian Sea. There is green belt
              of flower saplings and innumerable trees of Mango, Teak, banyan,
              Kher etc. spreads over the fertile{" "}
              <span className="text-white font-extrabold">land of Valsad</span>.
              In south of Valsad,{" "}
              <span className="text-white font-extrabold">'Par' river</span>{" "}
              flows throughout the year, on its coast very beautiful villages
              are situated. This land is{" "}
              <span className="text-white font-extrabold">
                Karmabhoomi (workplace) of Parshuram
              </span>{" "}
              - one of the ten incarnations of Lord Vishnu. This area possesses
              incomparable charm of nature's beauty over the year. A wonder and{" "}
              <span className="text-white font-extrabold">
                divine Maa Vishvambhari TirthYatra Dham
              </span>{" "}
              is developed in{" "}
              <span className="text-white font-extrabold">Rabda town</span>{" "}
              which is located within heart soothing splendour of nature. This
              world class and stupendous dham is constructed in{" "}
              <span className="text-white font-extrabold">only 90 days</span>{" "}
              and it is going to become center of ideological and spiritual
              revolution for distributing them to entire world in near future.
            </p>

            <p
              className="text-end text-[#FF8127] flex w-fit ms-auto gap-3 items-center pe-4 pt-5 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              More details{" "}
              <span className="inline text-2xl">
                <HiArrowLongRight />
              </span>
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="">
            <div>
              <Swiper
                ref={swiperRef}
                direction="vertical"
                slidesPerView={2}
                spaceBetween={18}
                speed={700}
                className="h-[50vw]"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx} className="w-[35vw]! overflow-hidden rounded-2xl">
                    <img
                      src={img.url}
                      alt={`Gallery image ${idx + 1}`}
                      className=" object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex items-center justify-center gap-5 mt-5">
              <button
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="bg-neutral-900 hover:bg-neutral-800 p-2 rounded-full transition-colors"
                aria-label="Previous slide"
              >
                <FiChevronUp className="w-6 h-6" />
              </button>
              <button
                onClick={() => swiperRef.current?.swiper.slideNext()}
                className="bg-neutral-900 hover:bg-neutral-800 p-2 rounded-full transition-colors"
                aria-label="Next slide"
              >
                <FiChevronDown className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        <BlurPopup isOpen={isOpen} setIsOpen={setIsOpen}>
          <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 uppercase">
            Maa Vishvambhari TirthYatra Dham
          </h2>
          {moreDetails.map((val, idx) => (
            <p
              key={idx}
              className="pb-3 text-justify leading-7 lg:leading-8 indent-25"
            >
              {val}
            </p>
          ))}
        </BlurPopup>
      </div>
    </div>
  );
};

export default Dham2;
