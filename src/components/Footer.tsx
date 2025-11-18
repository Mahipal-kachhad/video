"use client";
import axios from "axios";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";

const Footer = () => {
  const t = useTranslations("footer");
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const path = lang === "hi" ? "_hin" : lang === "gu" ? "_guj" : "";
  const [data, setData] = useState({
    mobile: "",
    office_hours: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(
        `https://dhamadmin.cesihpl.com/edit_contact_info${path}.php?action=list`
      )
      .then((data: any) => {
        setData(data.data.items[0]);
      });
  }, []);
  return (
    <footer className="bg-black border-t border-t-white/10">
      <div className="flex flex-col sm:flex-row gap-7 w-[90vw] lg:items-center xl:items-start max-w-7xl mx-auto mt-10 pb-5 sm:pb-15 border-b border-b-white/10 ">
        <div className="hidden sm:block w-full lg:w-9/10 pt-5">
          <div className="flex gap-5 items-center lg:w-full lg:items-end -mb-1 -mt-5">
            <img
              src="/icons/logo.png"
              alt="Logo"
              className="h-[90px] lg:h-[125px] 2xl:h-[90px] hidden lg:block"
            />
            <h2 className="block lg:hidden font-bold text-[#FF8127] uppercase text-xl">
              {t("titleMobile")}
            </h2>
            <h2 className="hidden lg:block lg:text-2xl 2xl:text-[1.7rem] font-bold text-[#FF8127] uppercase leading-10">
              {t("t1")} <br />
              {t("t2")}
            </h2>
          </div>
          <p className="py-5 text-[#cbcbcb] text-sm lg:text-md xl:text-[1rem] lg:w-9/10 text-justify leading-6 lg:leading-8">
            {t("p1")}
            <span className="hidden lg:inline">{t("p2")}</span>
          </p>
          <div className="flex gap-3 items-center">
            <span>Follow us :</span>
            <div className="flex gap-5 text-[#FF8127] items-end">
              <a
                href="https://www.youtube.com/@MVTYDham/streams"
                target="_blank"
              >
                <img src="/icons/tv.svg" alt="social media" />
              </a>
              <a href="https://www.youtube.com/@MVTYDham" target="_blank">
                <img src="/icons/youtube.svg" alt="social media" />
              </a>
              <a href="https://www.instagram.com/mvtydham/" target="_blank">
                <img src="/icons/instagram2.svg" alt="social media" />
              </a>
              <a href="https://www.facebook.com/MVTYDham/" target="_blank">
                <img src="/icons/face.svg" alt="social media" />
              </a>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex flex-col gap-3 lg:gap-5 sm:w-md text-sm lg:text-lg xl:text-[1rem]">
          <h3 className="text-lg xl:text-xl font-bold mb-1 lg:mb-3 text-[#ff8127] uppercase">
            {t("links")}
          </h3>
          <a
            href="#"
            className="text-[#cbcbcb] hover:text-[#ff8127] transition ease-in-out"
          >
            {t("l1")}
          </a>
          <a
            href="#"
            className="text-[#cbcbcb] hover:text-[#ff8127] transition ease-in-out"
          >
            {t("l2")}
          </a>
          <a
            href="#"
            className="text-[#cbcbcb] hover:text-[#ff8127] transition ease-in-out"
          >
            {t("l3")}
          </a>
          <a
            href="#"
            className="text-[#cbcbcb] hover:text-[#ff8127] transition ease-in-out"
          >
            {t("l4")}
          </a>
          <a
            href="#"
            className="text-[#cbcbcb] hover:text-[#ff8127] transition ease-in-out"
          >
            {t("l5")}
          </a>
        </div>
        <div className="w-full sm:w-md ps-10 sm:p-0!">
          <h3 className="text-xl font-bold mb-3 text-md lg:text-lg xl:text-xl text-[#ff8127] uppercase">
            {t("contact")}
          </h3>
          <div className="flex gap-2 py-1 lg:py-3">
            <div className="p-2">
              <BsTelephoneFill className="text-sm text-[#FF8127]" />
            </div>
            <div>
              <p className="font-bold text-sm lg:text-lg xl:text-[1rem] text-[#cbcbcb]">
                {data.mobile}
              </p>
              <p className="text-[0.7rem] lg:text-sm text-[#686868]">
                {data.office_hours}
              </p>
            </div>
          </div>
          <div className="flex gap-2 py-1 lg:py-3 items-center -ms-0.5">
            <div className="p-1">
              <HiMail className="text-xl lg:text-2xl text-[#FF8127]" />
            </div>
            <div>
              <p className="font-bold text-sm lg:text-lg xl:text-[1rem] text-[#cbcbcb] m-0 p-0">
                {data.email}
              </p>
            </div>
          </div>
          <div className="flex gap-2 py-1 lg:py-3">
            <div className="p-1">
              <MdLocationPin className="text-xl lg:text-2xl text-[#FF8127]" />
            </div>
            <div>
              <p className="font-bold text-sm lg:text-lg xl:text-[1rem] text-[#cbcbcb]">
                {t("add1")}
              </p>
              <p className=" text-[0.7rem] lg:text-sm text-[#686868]">
                {t("add2")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 justify-between items-center w-[90vw] max-w-7xl mx-auto py-10 text-sm lg:text-lg xl:text-[1rem]">
        <p className="text-center sm:text-left">
          © 2025 {t("copy1")} <br className="sm:hidden" /> {t("copy2")}
        </p>
        <div className="flex gap-7 text-[#898989]">
          <a href="#" className="hover:text-[#ff8127] transition ease-in-out">
            {t("policy")}
          </a>
          <a href="#" className="hover:text-[#ff8127] transition ease-in-out">
            {t("terms")}
          </a>
          <a href="#" className="hover:text-[#ff8127] transition ease-in-out">
            {t("disc")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
