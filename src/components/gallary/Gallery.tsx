"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Audio from "./Audio";
import Photos from "./Photos";
import Video from "./Video";

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

const VIDEO_MENU = [["Youtube"], ["यूट्यूब"], ["યૂટ્યુબ"]];

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
            className={`uppercase font-bold transition text-xl sm:text-3xl flex-1 rounded-t-2xl ${
              activeMenu === val ? "bg-black text-[#FF8D28]" : "text-[#8C8C8C]"
            }`}
          >
            <span
              className={`
                        relative py-3 sm:py-4 px-3 block w-fit mx-auto
                           ${
                             activeMenu === val
                               ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-white after:rounded-full"
                               : ""
                           }
                       `}
            >
              {val}
            </span>
          </button>
        ))}
      </div>
      <div className="bg-black overflow-x-auto">
        <div className="flex gap-10 sm:gap-20 h-18 sm:h-20 px-5 sm:px-10 mx-auto w-fit items-center">
          {activeMenu === MENU_ITEMS[menuLang][0] &&
            pillarsContent.map((val, idx) => (
              <button
                onClick={() => setActivePillar(idx)}
                key={idx}
                className={`text-xl sm:text-2xl whitespace-nowrap transition ${
                  idx === activePillar ? "text-[#FF8D28]" : "text-[#464646]"
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
                  idx === activeVideoMenu ? "text-[#FF8D28]" : "text-[#464646]"
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
                  idx === activeAudioMenu ? "text-[#FF8D28]" : "text-[#464646]"
                }`}
              >
                {val}
              </button>
            ))}
        </div>
      </div>
      <div className="pb-3 bg-black overflow-x-auto ">
        {activeMenu === MENU_ITEMS[menuLang][0] && (
          <Photos images={pillarsContent[activePillar]?.sub_images || []} />
        )}
        {activeMenu === MENU_ITEMS[menuLang][1] && (
          <Video activeMenu={activeVideoMenu} />
        )}
        {activeMenu === MENU_ITEMS[menuLang][2] && (
          <Audio activeMenu={activeAudioMenu} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
