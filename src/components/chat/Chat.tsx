"use client";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import {
  chatFlow,
  chatFlowGujarati,
  chatFlowHindi,
  ChatNode,
  labels,
} from "./chatData";
import { useTranslations } from "next-intl";

type Message = {
  text?: string;
  user: boolean;
  isList?: boolean;
  listOptions?: { label: string; node: ChatNode; isMainMenu?: boolean }[];
  action?: "reset" | "feedback_yes" | "feedback_no";
};

const TypingBubble = () => (
  <div className="flex w-full justify-start animate-fade-in">
    <div className="bg-[#FF8127]/25 p-3 rounded-2xl rounded-bl-none relative w-fit">
      <style>{`
        @keyframes bounce-deep {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-deep {
          animation: bounce-deep 0.8s infinite ease-in-out;
        }
      `}</style>

      <div className="flex space-x-1 h-3 items-center px-1">
        <div
          className="w-1.5 h-1.5 bg-white/90 rounded-full animate-bounce-deep"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-1.5 h-1.5 bg-white/90 rounded-full animate-bounce-deep"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-1.5 h-1.5 bg-white/90 rounded-full animate-bounce-deep"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
      <div className="absolute right-full bottom-0 w-0 h-0 border-t-13 border-t-transparent border-r-8 border-r-[#FF8127]/25 border-b-0 border-b-transparent" />
    </div>
  </div>
);

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const path = usePathname();
  const ta = useTranslations();
  const chatDiv = useRef<HTMLDivElement>(null!);

  const [messages, setMessages] = useState<Message[]>([]);
  const [queue, setQueue] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [activeOptions, setActiveOptions] = useState<
    { label: string; node: ChatNode; isMainMenu?: boolean }[]
  >([]);

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

  const scrollBottom = () => {
    setTimeout(() => {
      if (chatDiv.current) {
        chatDiv.current.scrollTo({
          top: chatDiv.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  useEffect(() => {
    if (queue.length === 0 || isTyping) return;

    const nextMsg = queue[0];

    const processMessage = async () => {
      if (!nextMsg.user) {
        setIsTyping(true);
        scrollBottom();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setMessages((prev) => [...prev, nextMsg]);
      setQueue((prev) => prev.slice(1));
      setIsTyping(false);

      if (nextMsg.listOptions && nextMsg.listOptions.length > 0) {
        setActiveOptions(nextMsg.listOptions);
      } else if (nextMsg.user) {
        setActiveOptions([]);
      }

      scrollBottom();
    };

    processMessage();
  }, [queue, isTyping]);

  const addToQueue = (msgs: Message | Message[]) => {
    const newMsgs = Array.isArray(msgs) ? msgs : [msgs];
    setQueue((prev) => [...prev, ...newMsgs]);
  };

  const showMainMenu = () => {
    const options = currentFlow.map((node) => ({
      label: node.label,
      node: node,
      isMainMenu: false,
    }));

    addToQueue([
      { text: t.mainMenu, user: false },
      { user: false, isList: true, listOptions: options },
    ]);
  };

  const startChat = () => {
    setMessages([]);
    setQueue([]);
    setIsTyping(false);

    const options = currentFlow.map((node) => ({
      label: node.label,
      node: node,
      isMainMenu: false,
    }));

    addToQueue([
      { text: t.greeting, user: false },
      { user: false, isList: true, listOptions: options },
    ]);
  };

  const handleFeedback = (type: "yes" | "no") => {
    addToQueue({ text: type === "yes" ? t.yes : t.no, user: true });
    setActiveOptions([]);

    const returnToMenuOption = [
      {
        label: t.mainMenu,
        node: { label: t.mainMenu },
        isMainMenu: true,
      },
    ];

    if (type === "yes") {
      addToQueue({ text: t.thanks, user: false });
      addToQueue({
        user: false,
        isList: true,
        listOptions: returnToMenuOption,
      });
    } else {
      addToQueue([
        { text: t.contactIntro, user: false },
        { text: t.contactDetails, user: false },
      ]);
      addToQueue({
        user: false,
        isList: true,
        listOptions: returnToMenuOption,
      });
    }
  };

  const handleOptionClick = (
    node: ChatNode,
    displayText?: string,
    isMainMenu?: boolean
  ) => {
    if (isMainMenu) {
      addToQueue({ text: displayText || t.mainMenu, user: true });
      showMainMenu();
      return;
    }

    addToQueue({ text: displayText || node.label, user: true });
    setActiveOptions([]);

    if (node.answer) {
      addToQueue({ text: node.answer!, user: false });

      const feedbackOptions = [
        { label: t.yes, node: { label: t.yes } },
        { label: t.no, node: { label: t.no } },
      ];

      addToQueue({
        text: t.helpful,
        user: false,
        isList: true,
        listOptions: feedbackOptions,
        action: "feedback_yes",
      });
    }

    if (node.options && node.options.length > 0) {
      const subOptions = node.options!.map((subNode) => ({
        label: subNode.label,
        node: subNode,
        isMainMenu: false,
      }));

      subOptions.push({
        label: t.mainMenu,
        node: { label: t.mainMenu },
        isMainMenu: true,
      });

      addToQueue({
        user: false,
        isList: true,
        listOptions: subOptions,
      });
    }
  };

  const handleListClick = (
    item: { label: string; node: ChatNode; isMainMenu?: boolean },
    index: number,
    msgAction?: string
  ) => {
    if (isTyping || queue.length > 0) return;

    if (msgAction === "feedback_yes") {
      handleFeedback(index === 0 ? "yes" : "no");
      return;
    }
    handleOptionClick(
      item.node,
      `${index + 1}. ${item.label}`,
      item.isMainMenu
    );
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    if (isTyping || queue.length > 0) return;

    const num = parseInt(inputText.trim());

    if (!isNaN(num) && num > 0 && num <= activeOptions.length) {
      const selected = activeOptions[num - 1];

      if (selected.label === t.yes) handleFeedback("yes");
      else if (selected.label === t.no) handleFeedback("no");
      else
        handleOptionClick(
          selected.node,
          `${num}. ${selected.label}`,
          selected.isMainMenu
        );
    } else {
      addToQueue({ text: inputText, user: true });
    }
    setInputText("");
  };

  useEffect(() => {
    if (open && messages.length === 0 && queue.length === 0) startChat();
  }, [open, lang]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 text-white flex items-center justify-center rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all z-50"
      >
        {<img src="/icons/chat.svg" width={35} />}
      </button>

      {open && (
        <div className="fixed bottom-5 right-17 sm:right-20 w-80 md:w-[400px] h-[600px] bg-black rounded-3xl shadow-2xl border-2 border-[#ff8127] overflow-hidden z-9000 flex flex-col animate-fade-in-up font-sans">
          <div className="bg-[#ff8127] text-black py-2 font-bold text-sm sm:text-lg flex justify-center items-center relative shadow-md">
            <span className="tracking-wide">{ta("chatTitle")}</span>
          </div>

          <div
            ref={chatDiv}
            className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide text-sm bg-black"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex w-full animate-fade-in ${
                  m.user ? "justify-end" : "justify-start"
                }`}
              >
                {m.isList ? (
                  <div className=" bg-[#FF8127]/25 text-white relative rounded-2xl rounded-bl-none px-4 py-4 max-w-[90%]">
                    {m.text && (
                      <div className="mb-3 font-medium whitespace-pre-line border-b border-white/20 pb-2">
                        {m.text}
                      </div>
                    )}

                    <div className="flex flex-col space-y-1">
                      {m.listOptions?.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleListClick(opt, idx, m.action)}
                          disabled={isTyping || queue.length > 0}
                          className={`text-left transition-colors font-medium leading-relaxed cursor-pointer ${
                            isTyping || queue.length > 0
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:text-[#ff8127]"
                          }`}
                        >
                          <span className="font-bold mr-1">{idx + 1}.</span>{" "}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <div className="absolute right-full bottom-0 w-0 h-0 border-t-13 border-t-transparent border-r-8 border-r-[#FF8127]/25 border-b-0 border-b-transparent" />
                  </div>
                ) : (
                  <div
                    className={`
                      px-3 py-3 text-sm font-medium relative rounded-2xl max-w-[85%] leading-relaxed
                      ${
                        m.user
                          ? "bg-[#112804] text-white rounded-br-none shadow-sm"
                          : "bg-[#FF8127]/25 text-white rounded-bl-none"
                      }
                    `}
                  >
                    <span className="whitespace-pre-line">{m.text}</span>
                    <div
                      className={`absolute ${
                        m.user
                          ? "left-full border-l-[#112804] border-l-8"
                          : "right-full border-r-[#FF8127]/25 border-r-8"
                      } bottom-0 w-0 h-0 border-t-13 border-t-transparent 
                     border-b-0 border-b-transparent`}
                    />
                  </div>
                )}
              </div>
            ))}

            {isTyping && <TypingBubble />}
          </div>

          <div className="p-4 bg-black">
            <form
              onSubmit={handleInputSubmit}
              className={`flex items-center gap-2 bg-[#29150a] rounded-full px-2 py-1.5 border border-[#ff8127]/30 shadow-inner ${
                isTyping || queue.length > 0 ? "opacity-50" : "opacity-100"
              }`}
            >
              <input
                type="number"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isTyping ? "Please wait..." : t.input}
                disabled={isTyping || queue.length > 0}
                className="flex-1 bg-transparent text-white/90 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text-sm px-4 py-2 focus:outline-none placeholder-[#ffffff]/40 font-medium disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isTyping || queue.length > 0}
                className="bg-[#29150a] text-[#ff8127] p-2 rounded-full cursor-pointer transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoSend size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
