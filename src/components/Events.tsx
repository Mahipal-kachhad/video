"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const accordionData = [
  {
    title: "Live Satsang & Events",
    content: [
      "Join Maa's divine presence right now. The live broadcast is happening as we speak.",
    ],
  },
  {
    title: "Upcoming Events",
    content: [
      "Akhatrij (30-4-2026)",
      "Vaishakh Sud Punam (12-5-2026)",
      "Jeth Sud Punam (11-6-2026)",
      "Rathyatra Ashadhi Bij (27-6-2026)",
      "Guru Purnima (10-7-2026)",
    ],
  },
  {
    title: "List Of Celebrated Events",
    content: [
      "Akhatrij Event 2019",
      "Chaitra Navaratri Event 2021",
      "Akhatrij Event 2022",
      "Chaitra Navaratri Event 2022",
      "Utrayan Event 2023",
      "Vaishakh Sud Punam (12-5-2025)",
      "Jeth Sud Punam (11-6-2025)",
    ],
  },
];

const imageArray = [
  { url: "/dham/event1.jpg" },
  { url: "/dham/event2.jpg" },
  { url: "/dham/event2.jpg" },
];

const Events = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches && openIndex === null) {
        setOpenIndex(0);
      }
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [openIndex]);

  const handleToggle = (index: number) => {
    if (isMobile) {
      if (openIndex === index) {
        const nextIndex = (index + 1) % accordionData.length;
        setOpenIndex(nextIndex);
      } else {
        setOpenIndex(index);
      }
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="h-fit w-full flex items-center justify-center sm:py-15 ">
      <div className="flex mx-auto px-8 w-full xl:w-[85vw] max-w-6xl p-6 lg:p-10 xl:rounded-4xl bg-black justify-between gap-10 items-center ">
        <div className="w-full xl:w-md rounded-lg text-white 2xl:h-[400px] overflow-y-auto flex flex-col justify-between [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {accordionData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.title}
                className="border-b border-neutral-800 last:border-b-0"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="flex justify-between items-center w-full py-2 lg:py-4 text-left font-semibold"
                >
                  <span className="text-[1.5rem] sm:text-[0.9rem] lg:text-lg">
                    {item.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[1.5rem] sm:text-[0.9rem] lg:text-lg"
                  >
                    <FiChevronDown />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {idx === 0 ? (
                        <div className="pb-2 lg:pb-4 text-neutral-300">
                          <p className="text-[#FF8127] text-justify w-9/10 sm:text-center mx-auto xl:mx-0 xl:w-full xl:text-left text-[1.1rem] xl:text-sm">
                            Join Maa's divine presence right now. The live
                            broadcast is happening as we speak.
                          </p>
                          <p className="text-center xl:text-left py-3 sm:py-2 lg:py-3 text-[1.1rem] sm:text-[0.8rem]">
                            "Click below to join the event."
                          </p>
                          <button className="px-7 py-2 mx-auto xl:mx-0 block text-[0.8rem] text-[#FF8127] font-bold rounded-full bg-[#ff8127]/10 hover:bg-[#ff8127]/20 active:bg-[#ff8127]/5 transition ease-in cursor-pointer border-t border-t-white/20 border-l border-l-white/20">
                            Participate
                          </button>
                          <div className="flex xl:block gap-3 items-center py-3 xl:py-0 mx-auto xl:mx-0 w-fit event">
                            <p className="py-2 sm:text-sm text-neutral-500">
                              Join us live on:
                            </p>
                            <div className="flex gap-3 lg:gap-5 text-[#FF8127] items-end">
                              <a
                                href="https://www.youtube.com/@MVTYDham/streams"
                                target="_blank"
                              >
                                <img src="/icons/tv.svg" alt="social media" />
                              </a>
                              <a
                                href="https://www.youtube.com/@MVTYDham"
                                target="_blank"
                              >
                                <img
                                  src="/icons/youtube.svg"
                                  alt="social media"
                                />
                              </a>
                              <a
                                href="https://www.instagram.com/mvtydham/"
                                target="_blank"
                              >
                                <img
                                  src="/icons/instagram2.svg"
                                  alt="social media"
                                />
                              </a>
                              <a
                                href="https://www.facebook.com/MVTYDham/"
                                target="_blank"
                              >
                                <img
                                  src="/icons/face.svg"
                                  alt="social media"
                                />
                              </a>
                            </div>
                          </div>
                          <img
                            src="/dham/event1.jpg"
                            className="xl:hidden my-7 rounded-xl"
                            alt="event"
                          />
                        </div>
                      ) : (
                        <ol className="list-decimal list-inside pl-2 pb-4 text-neutral-400 space-y-1">
                          {item.content.map((event) => (
                            <li
                              className="text-[#FF8127] xl:text-lg"
                              key={event}
                            >
                              {event}
                            </li>
                          ))}
                          <img
                            src="/dham/event2.jpg"
                            className="xl:hidden my-7 rounded-xl"
                            alt="event"
                          />
                        </ol>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="hidden xl:block w-full h-fit object-cover">
          {openIndex !== null && (
            <AnimatePresence mode="wait">
              <motion.img
                key={openIndex}
                src={imageArray[openIndex].url}
                alt="dham events images"
                className="rounded-2xl w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
