"use client";
import axios from "axios";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Darshan = () => {
  const t = useTranslations();
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const path = lang === "hi" ? "_hin" : lang === "gu" ? "_guj" : "";
  const [data, setData] = useState({
    schedule_line1: "",
    schedule_line2: "",
    himalaya_closing_time: "",
    aarti_time1: "",
    aarti_time2: "",
    aarti_time3: "",
  });
  const [lines, SetLines] = useState([""]);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_darshantime.php?action=list")
      .then((data: any) => {
        setData(data.data.items[0]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://dhamadmin.cesihpl.com/edit_darshan_rules${path}.php?action=list`
      )
      .then((res: any) => {
        const text = res.data.items[0].rules_text || "";
        const lines = text
          .split(/\r?\n/)
          .map((line: string) => line.trim())
          .filter((line: string) => line.length > 0);

        SetLines(lines);
      });
  }, []);

  return (
    <div className="w-full sm:bg-black flex items-center justify-center">
      <div className="w-[90vw] sm:w-[85vw] max-w-7xl mx-auto flex-col xl:flex-row flex  justify-between bg-[#1d1d1f] sm:p-3 lg:p-7 my-15 gap-5 rounded-4xl">
        <div className=" text-white px-3 sm:p-3 xl:py-7 xl:p-8 xl:w-md ">
          <h2 className="text-3xl text-center xl:text-left sm:text-2xl xl:text-3xl font-bold text-orange-500 mb-4 sm:mb-8 uppercase">
            {t("darshan.time")}
          </h2>

          <ul className="space-y-6 text-neutral-100 sm:hidden xl:block">
            <li className="border-b border-b-white/15 pb-4">
              <p className="font-semibold text-[1.1rem] sm:text-[0.8rem] lg:text-lg">
                {t("darshan.t1")}
              </p>
              <ul className="mt-2 text-neutral-400 space-y-1">
                <li className="ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                  {data.schedule_line1}
                </li>
                <li className="ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                  {data.schedule_line2}
                </li>
              </ul>
            </li>
            <li className="border-b border-b-white/15 pb-4">
              <p className="font-semibold text-[1.1rem] sm:text-[0.8rem] lg:text-lg">
                {t("darshan.t2")}
              </p>
              <p className="mt-2 text-neutral-400  ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                {data.himalaya_closing_time}
              </p>
            </li>
            <li>
              <p className="font-semibold text-[1.1rem] sm:text-[0.8rem] lg:text-lg">
                {t("darshan.t3")}
              </p>
              <ul className="mt-2 text-neutral-400 space-y-1">
                <li className="ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                  {data.aarti_time1}
                </li>
                <li className="ps-4 lg:ps-10 text-[1rem] sm:text-[0.65rem] lg:text-lg">
                  {data.aarti_time2}
                </li>
              </ul>
            </li>
          </ul>

          <ul className="text-neutral-100 hidden sm:flex flex-row xl:hidden">
            <li className="border-e border-e-white me-4 lg:me-10 flex-1 pe-1">
              <p className="font-semibold text-[1rem]">{t("darshan.t1")}</p>
              <ul className="mt-2 text-neutral-400 space-y-1">
                <li className="lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                  {data.schedule_line1}
                </li>
                <li className="lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                  {data.schedule_line2}
                </li>
              </ul>
            </li>
            <li className="border-e border-e-white me-4 lg:me-10 flex-1">
              <p className="font-semibold text-[1rem]">{t("darshan.t2")}</p>
              <p className="mt-2 text-neutral-400  lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                {data.himalaya_closing_time}
              </p>
            </li>
            <li className="">
              <p className="font-semibold text-[1rem]">{t("darshan.t3")}</p>
              <ul className="mt-2 text-neutral-400 space-y-1 pt-5">
                <li className="lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                  {data.aarti_time1}
                </li>
                <li className="lg:ps-10 text-[0.8rem] lg:text-[1rem]">
                  {data.aarti_time2}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="sm:bg-black text-white sm:p-8 lg:px-10 xl:p-7 pt-10 sm:pt-4 rounded-4xl w-full ">
          <h2 className="text-3xl text-center xl:text-left sm:text-2xl xl:text-3xl font-bold text-orange-500 mb-4 xl:mb-8 uppercase">
            {t("darshan.rules")}
          </h2>
          <p className="font-bold text-white mb-4 text-[1.1rem] sm:text-[1rem] lg:text-[1.3rem] xl:text-lg">
            {t("darshan.p1")}
          </p>

          <ul className="space-y-3 text-neutral-300 list-disc text-[1.1rem] sm:text-[0.9rem] lg:text-[1.1rem] xl:text-lg list-outside ps-9">
            {lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          <div className="w-9/10 sm:w-fit mt-4 sm:mt-3 xl:mt-4 bg-red-600 mx-auto px-5 py-2 lg:px-10 text-white text-[0.9rem] sm:text-[0.7rem] lg:text-sm font-semibold text-center p-1 lg:p-3 rounded-2xl uppercase sm:rounded-full">
            {t("darshan.warning")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Darshan;
