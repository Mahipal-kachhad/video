"use client";
import { HiArrowLongRight } from "react-icons/hi2";
import BlurPopup from "../BlurPopup";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fadeUp from "../function";
import Slider from "../Slider";
import axios from "axios";
import { ScrollTrigger } from "gsap/all";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const VitthalbhaiBio = () => {
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const path = lang === "hi" ? "_hin" : lang === "gu" ? "_guj" : "";
  const t = useTranslations();
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
    { url: "/dham/patr1.jpg" },
    { url: "/dham/patr15.jpg" },
  ]);
  const [data, setData] = useState([""]);

  useEffect(() => {
    axios
      .get(
        "https://dhamadmin.cesihpl.com/edit_shree_mahapatra_image.php?action=list"
      )
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
      .get(
        `https://dhamadmin.cesihpl.com/edit_mahaptarcontent${path}.php?action=list`
      )
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

  return (
    <div className="bg-black sm:pt-10 py-10">
      <motion.h2
        className="text-[1.8rem] leading-11 lg:text-[2.5rem] xl:text-[3.2rem] font-bold w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127]"
        {...fadeUp()}
      >
        {t("titles.mahapatra.title")}
      </motion.h2>
      <motion.div
        className="mt-10 w-[90vw] sm:w-[85vw] max-w-6xl mx-auto text-sm lg:text-lg "
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
      <BlurPopup isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 lg:mb-10 uppercase">
          {t("titles.mahapatra.popup")}
        </h2>
        {data.map((val, idx) => (
          <p
            key={idx}
            className="pb-3 text-justify leading-7 lg:leading-8 indent-25"
            dangerouslySetInnerHTML={{ __html: val }}
          />
        ))}
      </BlurPopup>
      <div className="pt-10">
        <Slider images={images} />
      </div>
    </div>
  );
};

export default VitthalbhaiBio;
