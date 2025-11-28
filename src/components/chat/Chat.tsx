"use client";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { IoChatboxEllipses, IoClose, IoRefresh } from "react-icons/io5";
import {
  chatFlow,
  chatFlowGujarati,
  chatFlowHindi,
  ChatNode,
  labels,
} from "./chatData";
import { useTranslations } from "next-intl";

type Message = {
  text: string;
  user: boolean;
  isButton?: boolean;
  node?: ChatNode;
  action?: "reset" | "feedback_yes" | "feedback_no";
};

const Chat = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const ta = useTranslations();
  const chatDiv = useRef<HTMLDivElement>(null!);

  const lang = path.split("/")[1] || "en";

  const t =
    lang === "gu" || lang === "ju"
      ? labels.gu
      : lang === "hi"
      ? labels.hi
      : labels.en;
  const currentFlow =
    lang === "gu" || lang === "ju"
      ? chatFlowGujarati
      : lang === "hi"
      ? chatFlowHindi
      : chatFlow;
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollBottom = () => {
    setTimeout(() => {
      if (chatDiv.current) {
        chatDiv.current.scrollTo({
          top: chatDiv.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    scrollBottom();
  };

  const startChat = () => {
    setMessages([]);
    currentFlow.forEach((node) => {
      addMessage({ text: node.label, user: false, isButton: true, node });
    });
  };

  const handleFeedback = (type: "yes" | "no") => {
    addMessage({ text: type === "yes" ? t.yes : t.no, user: true });

    if (type === "yes") {
      setTimeout(() => {
        addMessage({ text: t.thanks, user: false });
        addMessage({
          text: t.mainMenu,
          user: false,
          isButton: true,
          action: "reset",
        });
      }, 400);
    } else {
      setTimeout(() => {
        addMessage({ text: t.contactIntro, user: false });
        addMessage({ text: t.contactDetails, user: false });
        addMessage({
          text: t.mainMenu,
          user: false,
          isButton: true,
          action: "reset",
        });
      }, 400);
    }
  };

  const handleOptionClick = (node: ChatNode) => {
    addMessage({ text: node.label, user: true });

    if (node.answer) {
      setTimeout(() => {
        addMessage({ text: node.answer!, user: false });

        setTimeout(() => {
          addMessage({ text: t.helpful, user: false });
          addMessage({
            text: t.yes,
            user: false,
            isButton: true,
            action: "feedback_yes",
          });
          addMessage({
            text: t.no,
            user: false,
            isButton: true,
            action: "feedback_no",
          });
        }, 500);
      }, 400);
    }

    if (node.options && node.options.length > 0) {
      setTimeout(() => {
        node.options!.forEach((subNode) => {
          addMessage({
            text: subNode.label,
            user: false,
            isButton: true,
            node: subNode,
          });
        });
      }, 400);
    }
  };

  const handleClick = (msg: Message) => {
    if (msg.action === "reset") return startChat();
    if (msg.action === "feedback_yes") return handleFeedback("yes");
    if (msg.action === "feedback_no") return handleFeedback("no");
    if (msg.node) handleOptionClick(msg.node);
  };

  useEffect(() => {
    if (open && messages.length === 0) startChat();
  }, [open, lang]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-gray-700/90 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all z-50"
      >
        {open ? <IoClose size={28} /> : <IoChatboxEllipses size={28} />}
      </button>

      {open && (
        <div className="fixed bottom-5 right-20 w-80 md:w-96 bg-[#ff8127] rounded-2xl shadow-2xl border border-[#ff8127] overflow-hidden z-9000 flex flex-col animate-fade-in-up">
          <div className="bg- text-white px-5 py-4 font-bold flex justify-between items-center">
            <span>{ta("chatTitle")}</span>
            <button onClick={startChat}>
              <IoRefresh size={20} />
            </button>
          </div>

          <div
            ref={chatDiv}
            className="h-[400px] overflow-y-auto p-4 space-y-3 scrollbar-hide bg-black"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                onClick={() => m.isButton && handleClick(m)}
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all duration-200 whitespace-pre-wrap
                  ${
                    m.user
                      ? "ml-auto bg-[#ff8127]/20 text-green-900 rounded-br-none"
                      : m.isButton
                      ? "mr-auto bg-[#ff8127]/20 text-[#ff8127] border hover:bg-[#ff8127] cursor-pointer font-medium active:scale-95"
                      : "mr-auto bg-[#ff8127]/20 text-gray-900 rounded-bl-none"
                  }
                `}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="bg-[#ff8127] p-2 text-xs text-center text-white border-t">
            MVTY Dham
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
