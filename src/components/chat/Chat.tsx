"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { chatFlow, chatFlowGujarati, chatFlowHindi } from "./chatData";
import { TiArrowRightOutline } from "react-icons/ti";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const flow =
    lang === "ju" ? chatFlowGujarati : lang === "hi" ? chatFlowHindi : chatFlow;
  const [selected, setSelected] = useState<number | null>(null);
  const chatDiv = useRef<HTMLDivElement>(null!);
  const [messages, setMessages] = useState<string[]>([]);

  const handleClick = (a: string) => {
    setMessages((prev) => [...prev, a]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className=" fixed bottom-5 right-5 
            bg-gray-700/90 text-white 
            w-12 h-12 
            flex items-center justify-center 
            rounded-full shadow-lg 
            hover:bg-gray-700/90 
            transition-all 
            active:scale-95 backdrop-blur z-100"
      >
        <IoChatboxEllipses size={24} />
      </button>

      {open && (
        <div className="fixed bottom-5 right-20 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-[fadeIn_0.25s_ease] z-500">
          <div className="bg-[#ff9900] text-white px-4 py-3 font-semibold">
            {t("chatTitle")}
          </div>

          <div
            className="p-4 h-94 overflow-y-auto text-sm text-gray-700"
            ref={chatDiv}
          >
            {flow.map((val, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className="w-50 bg-[#5243AA]/20 text-start px-2 py-1 mb-2 rounded flex justify-between"
              >
                <span>
                  {val.id}. {val.title}{" "}
                </span>
                <TiArrowRightOutline />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
