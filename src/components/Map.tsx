"use client";
import axios from "axios";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";

const Map = () => {
  const t = useTranslations();
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
    <div className="w-full  bg-black flex items-center justify-center py-10 rounded-t-4xl sm:rounded-t-none">
      <div className="w-[85vw] max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-7 rounded-xl lg:rounded-3xl">
        <div className=" text-white sm:w-sm lg:w-lg rounded-3xl bg-[#1c1c1c]">
          <h2 className="text-xl lg:text-3xl font-bold text-white p-4 lg:p-7 text-center">
            {t("contact.title")}
          </h2>

          <div className="text-neutral-100 rounded-3xl  bg-[#282828] px-2 lg:px-7 py-2 lg:py-5">
            <div className="flex gap-2 py-2 sm:py-1 lg:py-3">
              <div className="p-2">
                <BsTelephoneFill className="text-md" />
              </div>
              <div>
                <h4 className="font-bold text-[1.1rem] sm:text-[0.75rem] lg:text-lg">
                  {t("contact.t1")}
                </h4>
                <p className="text-[0.9rem] sm:text-[0.7rem] lg:text-sm text-[#686868]">
                  {data.office_hours}
                </p>
                <p className="font-bold text-[1.1rem] sm:text-[0.75rem] lg:text-lg">
                  {data.mobile}
                </p>
              </div>
            </div>
            <div className="flex gap-2 py-2 sm:py-1 lg:py-3">
              <div className="p-1">
                <HiMail className="text-xl lg:text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-[1.1rem] sm:text-[0.75rem] lg:text-lg">
                  {t("contact.t2")}
                </h4>
                <p className="text-[0.9rem] sm:text-[0.7rem] lg:text-sm text-[#686868]">
                  {t("contact.d2")}
                </p>
                <p className="font-bold text-[1.1rem] sm:text-[0.75rem] lg:text-lg">
                  {data.email}
                </p>
              </div>
            </div>
            <div className="flex gap-2 py-2 sm:py-1 lg:py-3">
              <div className="p-1">
                <MdLocationPin className="text-xl lg:text-2xl" />
              </div>
              <div className="w-fit">
                <h4 className="font-bold text-[1.1rem] sm:text-[0.75rem] lg:text-lg">
                  {t("contact.t3")}
                </h4>
                <p className="text-[0.9rem] sm:text-[0.7rem] lg:text-sm text-[#686868] w-fit">
                  {t("contact.d3")}
                </p>
                <p className="font-bold text-[1.1rem] sm:text-[0.75rem] lg:text-lg w-fit">
                  {t("contact.d4")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white w-full">
          <iframe
            className="w-full h-[300px] sm:h-full rounded-xl lg:rounded-2xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1877.954545429003!2d73.00636279815053!3d20.528825607828026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0c14daf058fdb%3A0xd9d1686647a88e64!2sMaa%20Vishvambhari%20TirthYatra%20Dham!5e1!3m2!1sen!2sin!4v1759840700122!5m2!1sen!2sin"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Map;
