"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import fadeUp from "../function";
import { HiArrowLongRight } from "react-icons/hi2";
import BlurPopup from "../BlurPopup";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";
import Slider from "../Slider";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const DhamInfo = () => {
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const path = lang === "hi" ? "_hin" : lang === "gu" ? "_guj" : "";
  const t = useTranslations();
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
    { url: "/loading.jpg" },
  ]);
  const [data, setData] = useState([""]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(
          "https://dhamadmin.cesihpl.com/edit_dham_image.php?action=list"
        );

        const formattedImages = data.images
          .filter((val: any) => val.status)
          .map((val: any) => ({
            url: `https://dhamadmin.cesihpl.com/${val.url}`,
          }));

        setImages(formattedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://dhamadmin.cesihpl.com/edit_dhamcontent${path}.php?action=list`
      )
      .then((res: any) => {
        const text = res.data.items[0].paragraphs.join("\r\n") || "";
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
    <div className="bg-black pb-0 pt-10 2xl:pt-0 md:pb-10 rounded-b-4xl sm:hidden 2xl:block">
      <motion.h2
        className="text-3xl leading-11 lg:text-[2.5rem] xl:text-[3.4rem] font-bold w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127]"
        {...fadeUp()}
      >
        {t("titles.dham")}
      </motion.h2>

      <div className="sm:flex items-center w-[90vw] sm:w-[85vw] max-w-6xl mx-auto pb-10 sm:mt-10">
        <motion.div
          className="sm:flex-1 mt-4 sm:mt-0 max-w-6xl mx-auto text-[0.8rem] lg:text-lg overflow-auto"
          {...fadeUp()}
        >
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

        <motion.div
          className="hidden sm:flex flex-col items-center justify-center w-[400px] lg:w-[480px]"
          {...fadeUp(0.2)}
        >
          <div className="max-w-[480px] h-[420px] lg:h-[520px]">
            <Swiper
              ref={swiperRef}
              direction="vertical"
              spaceBetween={20}
              slidesPerView={2}
              speed={700}
              className="rounded-2xl h-full"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx} className="h-[200px]! lg:h-[250px]! ">
                  <img
                    src={img.url}
                    alt={`Gallery image ${idx + 1}`}
                    className="rounded-2xl object-cover w-full h-full"
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
      <div className="pb-10 sm:hidden">
        <Slider images={images} />
      </div>

      <BlurPopup isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold mt-1 text-[#ff8127] text-center mb-5 uppercase">
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
  );
};

export default DhamInfo;
