"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Audio from "./Audio";
import Video from "./youtube";

interface Pillar {
  title: string;
  icon_path: string;
  content: string;
  sub_images: { url: string }[];
}

const MENU_ITEMS = [
  ["Photos", "Video", "Audio"],
  ["फोटो", "वीडियो", "ऑडियो"],
  ["ફોટા", "વિડિયો", "ઑડિયો"],
];

const AUDIO_MENU = [
  ["Aarti", "Satsang"],
  ["आरती", "सत्संग"],
  ["આરતી", "સત્સંગ"],
];

const VIDEO_MENU = [["youtube"], ["यूट्यूब"], ["યૂટ્યુબ"]];

const Gallery = () => {
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const menuLang = lang === "hi" ? 1 : lang === "gu" ? 2 : 0;
  const title =
    lang === "hi" ? "title_hin" : lang === "gu" ? "title" : "title_en";
  const content =
    lang === "hi" ? "content_hin" : lang === "gu" ? "content" : "content_en";
  const [pillarsContent, setPillarContent] = useState<Pillar[]>([]);
  const [activeMenu, setActiveMenu] = useState(MENU_ITEMS[menuLang][0]);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [activeAudioMenu, setActiveAudioMenu] = useState<number>(0);
  const [activeVideoMenu, setActiveVideoMenu] = useState<number>(0);

  useEffect(() => {
    axios
      .get("https://dhamadmin.cesihpl.com/edit_pillars_guj.php?action=list")
      .then((data: any) => {
        setPillarContent(
          data.data.pillars.map((val: any) => {
            return {
              title: val[title],
              sub_images: val.sub_images.map((v: any) => ({
                url: `https://dhamadmin.cesihpl.com/${v.url}`,
              })),
            };
          })
        );
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-around pt-10">
        {MENU_ITEMS[menuLang].map((val, idx) => (
          <button
            onClick={() => setActiveMenu(val)}
            key={idx}
            className={`uppercase font-bold transition text-xl sm:text-3xl px-5 py-3 sm:px-10 sm:py-4 rounded-t-2xl ${
              activeMenu === val ? "bg-black" : "text-[#8C8C8C]"
            }`}
          >
            {val}
          </button>
        ))}
      </div>
      <div className="bg-black overflow-x-auto">
        <div className="flex gap-10 sm:gap-20 h-18 sm:h-20 mx-10 w-fit items-center">
          {activeMenu === MENU_ITEMS[menuLang][0] &&
            pillarsContent.map((val, idx) => (
              <button
                onClick={() => setActivePillar(idx)}
                key={idx}
                className={`text-xl sm:text-2xl whitespace-nowrap transition ${
                  idx === activePillar ? "text-white" : "text-[#464646]"
                }`}
              >
                {val.title}
              </button>
            ))}
          {activeMenu === MENU_ITEMS[menuLang][1] &&
            VIDEO_MENU[menuLang].map((val, idx) => (
              <button
                onClick={() => setActiveVideoMenu(idx)}
                key={idx}
                className={`text-xl sm:text-2xl whitespace-nowrap transition ${
                  idx === activeVideoMenu ? "text-white" : "text-[#464646]"
                }`}
              >
                {val}
              </button>
            ))}
          {activeMenu === MENU_ITEMS[menuLang][2] &&
            AUDIO_MENU[menuLang].map((val, idx) => (
              <button
                onClick={() => setActiveAudioMenu(idx)}
                key={idx}
                className={`text-xl sm:text-2xl whitespace-nowrap transition ${
                  idx === activeAudioMenu ? "text-white" : "text-[#464646]"
                }`}
              >
                {val}
              </button>
            ))}
        </div>
      </div>
      <div className="p-4 xl:p-7 bg-black max-h-[600px] xl:h-[700px] overflow-y-auto">
        {activeMenu === MENU_ITEMS[menuLang][0] && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4">
            {pillarsContent[activePillar]?.sub_images.map((val, idx) => (
              <img
                key={idx}
                src={val.url}
                alt="pillar Photos"
                className="rounded-2xl object-center object-cover aspect-3/2"
              />
            ))}
          </div>
        )}
        {activeMenu === MENU_ITEMS[menuLang][1] && <Video activeMenu={activeVideoMenu}/>}
        {activeMenu === MENU_ITEMS[menuLang][2] && (
          <Audio activeMenu={activeAudioMenu} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
