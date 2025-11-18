"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import fadeUp from "../function";
import { HiArrowLongRight } from "react-icons/hi2";
import BlurPopup from "../BlurPopup";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";

const Dham2 = () => {
  const t = useTranslations();
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa10.jpg" },
  ]);
  const [data, setData] = useState([""]);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_dham_image.php?action=list")
      .then((data: any) => {
        setImages(
          data.data.images
            .filter((val: any) => val.status)
            .map((val: any) => {
              return {
                url: `https://dhamadmin.cesihpl.com/${val.url}`,
              };
            })
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_dhamcontent.php?action=list")
      .then((res: any) => {
        const text = res.data.items[0].paragraphs[0] || "";
        const lines = text
          .split(/\r?\n/)
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0);

        setData(lines);
      })
      .then(() => {
        ScrollTrigger.refresh();
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
          {t("titles.dham")}
        </motion.h2>

        <div className="flex gap-6 h-[55vw] items-center pt-20">
          <motion.div {...fadeUp()} className="h-fit ">
            <div className="space-y-5 line-clamp-15">
              {data.map((val, idx) => (
                <p
                  className="font-bold text-[#86868b] indent-23 sm:indent-50 text-justify leading-7 lg:leading-8.5"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: val }}
                />
              ))}
            </div>

            <p
              className="text-end text-[#FF8127] flex w-fit ms-auto gap-3 items-center pe-4 pt-5 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {t("viewMore")}{" "}
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
                  <SwiperSlide
                    key={idx}
                    className="w-[35vw]! overflow-hidden rounded-2xl"
                  >
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
            {t("titles.dham")}
          </h2>
          {data.map((val, idx) => (
            <p
              className="font-bold text-[#86868b] indent-23 sm:indent-50 pb-5 text-justify leading-7 lg:leading-8"
              key={idx}
              dangerouslySetInnerHTML={{ __html: val }}
            />
          ))}
        </BlurPopup>
      </div>
    </div>
  );
};

export default Dham2;
