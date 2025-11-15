import { HiArrowLongRight } from "react-icons/hi2";
import BlurPopup from "../BlurPopup";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fadeUp from "../function";
import Slider from "../Slider";
import axios from "axios";
import { ScrollTrigger } from "gsap/all";

const GlimpsOfMaa = () => {
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa10.jpg" },
  ]);
  const [data, setData] = useState([""]);

  useEffect(() => {
    axios
      .get(
        "https://dhamadmin.cesihpl.com/edit_maa_vishavambhari_image.php?action=list"
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
      .get("https://dhamadmin.cesihpl.com/edit_maacontent.php?action=list")
      .then((res: any) => {
        const text = res.data.items[0].paragraphs[0] || "";
        const lines = text
          .split(/\r?\n/)
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0);
        setData(lines);
      }).then(() => {
        ScrollTrigger.refresh();
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-black py-10">
      <motion.h2
        className="text-3xl leading-11 lg:text-[2.5rem] xl:text-[3.4rem] font-bold w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127]"
        {...fadeUp()}
      >
        Glimpse of Mother Vishvambhari
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
          More details{" "}
          <span className="inline text-2xl">
            <HiArrowLongRight />
          </span>
        </p>
      </motion.div>
      <BlurPopup isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 uppercase">
          Maa Vishvambhari
        </h2>
        {data.map((val, idx) => (
          <p
            className="font-bold text-[#86868b] indent-23 sm:indent-50 pb-5 text-justify leading-7 lg:leading-8.5"
            key={idx}
            dangerouslySetInnerHTML={{ __html: val }}
          />
        ))}
      </BlurPopup>
      <div className="py-10">
        <Slider images={images} />
      </div>
    </div>
  );
};

export default GlimpsOfMaa;
