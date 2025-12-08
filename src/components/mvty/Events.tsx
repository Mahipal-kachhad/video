"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import BlurPopup from "./BlurPopup";
import { Dialog } from "@headlessui/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { GoDash } from "react-icons/go";

type UpcomingItem = { image: string; title: string; date: string };
type PastItem = {
  image: string;
  title: string;
  date: string;
  images: { url: string }[];
};

const toSrc = (img: any) => (typeof img === "string" ? img : img?.src ?? null);

const Events = () => {
  const t = useTranslations();
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  const path =
    lang === "hi" ? "title_hin" : lang === "gu" ? "title_guj" : "title";
  const accordionData = [
    { title: t("events.t1") },
    { title: t("events.t2") },
    { title: t("events.t3") },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const [selectedUpcoming, setSelectedUpcoming] = useState<number>(0);
  const [selectedPast, setSelectedPast] = useState<number>(0);

  const [data, setData] = useState<{
    url: string;
    img: string | null;
    upcoming: UpcomingItem[];
    past: PastItem[];
  }>({
    url: "",
    img: null,
    upcoming: [],
    past: [],
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImages, setPopupImages] = useState<{ url: string }[]>([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleResize = () => {
      if (!mediaQuery.matches && openIndex === null) setOpenIndex(0);
    };
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [openIndex]);

  const handleToggle = (index: number) => {
    if (openIndex === index) setOpenIndex((index + 1) % accordionData.length);
    else setOpenIndex(index);
  };

  useEffect(() => {
    axios
      .get(
        "https://dhamadmin.cesihpl.com/edit_event_participant_link.php?action=list"
      )
      .then((res: any) => {
        if (res.data.items?.[0]?.is_active) {
          setData((prev) => ({
            ...prev,
            url: res.data.items[0].link_url,
            img: `https://dhamadmin.cesihpl.com/${res.data.items[0].image_path}`,
          }));
        }
      })
      .catch(() => {});

    axios
      .get(
        "https://dhamadmin.cesihpl.com/edit_upcoming_event_details.php?action=list"
      )
      .then((res: any) => {
        const upcoming =
          (res.data.images || [])
            .filter((val: any) => val.is_active)
            .map((val: any) => ({
              image: `https://dhamadmin.cesihpl.com/${val.image_path}`,
              title: val[path],
              date: val.event_date,
            })) || [];
        setData((prev) => ({ ...prev, upcoming }));
        setSelectedUpcoming((s) =>
          upcoming.length ? Math.min(s, upcoming.length - 1) : 0
        );
      })
      .catch(() => {});

    axios
      .get("https://dhamadmin.cesihpl.com/edit_event_details.php?action=list")
      .then((res: any) => {
        const past =
          (res.data.images || [])
            .filter((val: any) => val.is_active)
            .map((val: any) => ({
              image: `https://dhamadmin.cesihpl.com/${val.image_path}`,
              title: val[path],
              date: val.event_date,
              images:
                (val.sub_images || [])
                  .filter((v: any) => v.status)
                  .map((v: any) => ({
                    url: `https://dhamadmin.cesihpl.com${v.url}`,
                  })) || [],
            })) || [];
        setData((prev) => ({ ...prev, past }));
        setSelectedPast((s) =>
          past.length ? Math.min(s, past.length - 1) : 0
        );
      })
      .catch(() => {});
  }, []);

  const rightImageSrc =
    openIndex === 0
      ? toSrc(data.img)
      : openIndex === 1
      ? data.upcoming[selectedUpcoming]?.image
      : data.past[selectedPast]?.image;

  const openPastPopup = (index: number) => {
    const images = data.past[index]?.images || [];
    setPopupImages(images);
    setIsPopupOpen(true);
    setViewerIndex(0);
  };

  const nextImage = () =>
    setViewerIndex((p) =>
      popupImages.length ? (p + 1) % popupImages.length : 0
    );
  const prevImage = () =>
    setViewerIndex((p) =>
      popupImages.length ? (p === 0 ? popupImages.length - 1 : p - 1) : 0
    );

  useEffect(() => {
    if (!isViewerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setIsViewerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isViewerOpen, popupImages]);

  return (
    <div className="bg-black">
      <div className="h-fit w-full flex items-center justify-center sm:py-15 rounded-t-4xl bg-[#1D1D1F]">
        <div className="flex mx-auto px-8 w-full xl:w-[85vw] max-w-6xl p-6 sm:p-15 xl:p-10 sm:rounded-4xl bg-black justify-between gap-10 items-center ">
          <div className="w-full h-full xl:w-md rounded-lg text-white flex flex-col justify-between">
            {accordionData.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-neutral-800 last:border-b-0"
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="flex justify-between items-center w-full py-2 sm:py-5 xl:py-4 text-left font-semibold"
                  >
                    <span className="text-[1.5rem] sm:text-lg">
                      <span className="pe-10 hidden sm:inline xl:hidden">
                        -
                      </span>
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
                        key={`content-${idx}`}
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
                        {idx === 0 && (
                          <div className="pb-2 lg:pb-4 text-neutral-300">
                            <p className="text-[#FF8127] text-justify w-9/10 xl:text-lg sm:text-center mx-auto xl:mx-0 xl:w-full xl:text-left text-[1.1rem]">
                              {t("events.p1")}
                            </p>
                            <p className="text-center xl:text-left py-3 sm:py-2 lg:py-3 text-[1.1rem] sm:text-[0.9rem]">
                              {t("events.p2")}
                            </p>
                            <a
                              href={data.url}
                              target="_blank"
                              className="px-7 w-fit py-2 mx-auto xl:mx-0 block text-[0.8rem] text-[#FF8127] font-bold rounded-full bg-[#ff8127]/10 hover:bg-[#ff8127]/20 active:bg-[#ff8127]/5 transition ease-in cursor-pointer border-t border-t-white/20 border-l border-l-white/20"
                            >
                              {t("events.button")}
                            </a>
                            <div className="flex xl:block gap-3 items-center py-3 xl:py-0 mx-auto xl:mx-0 w-fit event">
                              <p className="py-2 sm:text-sm text-neutral-500">
                                {t("events.live")}
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
                                    src="/icons/instagram.svg"
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
                              src={toSrc(data.img)}
                              className="xl:hidden my-7 rounded-4xl"
                              alt="event"
                            />
                          </div>
                        )}

                        {idx === 1 && (
                          <div>
                            <ol
                              className="h-[220px] list-decimal list-inside pl-2 pb-4\
                             text-neutral-400 space-y-1 overflow-y-scroll  [&::-webkit-scrollbar]:block! [&::-webkit-scrollbar]:w-1!
                             [&::-webkit-scrollbar-thumb]:bg-gray-600!
                               [&::-webkit-scrollbar-thumb]:rounded-full!
                               [&::-webkit-scrollbar-track]:bg-transparent!"
                            >
                              {data.upcoming.length === 0 ? (
                                <li className="text-neutral-500">
                                  No upcoming events.
                                </li>
                              ) : (
                                data.upcoming.map((event, i) => (
                                  <li
                                    key={i}
                                    onClick={() => setSelectedUpcoming(i)}
                                    className={`text-[#FF8127] cursor-pointer py-1 xl:py-0 ps-0 sm:ps-20 xl:ps-0 ${
                                      selectedUpcoming === i
                                        ? "opacity-100"
                                        : "opacity-80"
                                    }`}
                                  >
                                    {event.title} ({event.date})
                                  </li>
                                ))
                              )}
                            </ol>

                            <div className="xl:hidden my-7">
                              {data.upcoming[selectedUpcoming]?.image ? (
                                <img
                                  src={data.upcoming[selectedUpcoming].image}
                                  alt="upcoming mobile"
                                  className="w-full rounded-4xl object-cover"
                                />
                              ) : (
                                <img
                                  src={toSrc(data.img)}
                                  alt="upcoming placeholder"
                                  className="w-full rounded-4xl object-cover"
                                />
                              )}
                            </div>
                          </div>
                        )}

                        {idx === 2 && (
                          <div>
                            <ol
                              className="h-[220px] list-decimal list-inside pl-2 pb-4 text-neutral-400 space-y-1 overflow-y-scroll [&::-webkit-scrollbar]:block! [&::-webkit-scrollbar]:w-1!
                             [&::-webkit-scrollbar-thumb]:bg-gray-600!
                               [&::-webkit-scrollbar-thumb]:rounded-full!
                               [&::-webkit-scrollbar-track]:bg-transparent!"
                            >
                              {data.past.length === 0 ? (
                                <li className="text-neutral-500">
                                  No past events.
                                </li>
                              ) : (
                                data.past.map((event, i) => (
                                  <li
                                    key={i}
                                    onClick={() => {
                                      setSelectedPast(i);
                                      openPastPopup(i);
                                    }}
                                    className={`text-[#FF8127] py-1 xl:py-0 cursor-pointer ps-0 sm:ps-20 xl:ps-0 ${
                                      selectedPast === i
                                        ? "opacity-100"
                                        : "opacity-100"
                                    }`}
                                  >
                                    {event.title} ({event.date})
                                  </li>
                                ))
                              )}
                            </ol>

                            <div className="xl:hidden my-7">
                              {data.past[selectedPast]?.image ? (
                                <img
                                  src={data.past[selectedPast].image}
                                  alt="past mobile"
                                  className="w-full rounded-4xl object-cover cursor-pointer"
                                  onClick={() => {
                                    openPastPopup(selectedPast);
                                  }}
                                />
                              ) : (
                                <img
                                  src={toSrc(data.img)}
                                  alt="past placeholder"
                                  className="w-full rounded-4xl object-cover"
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="hidden xl:block w-full h-fit object-cover">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${openIndex ?? 0}-${selectedUpcoming}-${selectedPast}`}
                src={rightImageSrc}
                alt="dham events images"
                className="rounded-2xl w-full object-cover h-[400px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
        </div>

        <BlurPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {popupImages.length === 0 ? (
              <p className="text-center text-neutral-400 col-span-full">
                No images available
              </p>
            ) : (
              popupImages.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  className="w-full h-full object-cover rounded-xl cursor-pointer"
                  alt={`gallery ${i}`}
                  onClick={() => {
                    setViewerIndex(i);
                    setIsViewerOpen(true);
                  }}
                />
              ))
            )}
          </div>
        </BlurPopup>

        <AnimatePresence>
          {isViewerOpen && (
            <Dialog
              as="div"
              open={isViewerOpen}
              onClose={() => setIsViewerOpen(false)}
              className="fixed inset-0 z-100 flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              <motion.img
                key={viewerIndex}
                src={popupImages[viewerIndex]?.url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative z-120 max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
              />
              <button
                onClick={prevImage}
                className="absolute left-5 top-1/2 -translate-y-1/2 z-130 cursor-pointer hover:text-gray-300 text-white p-2 rounded-full text-3xl"
              >
                <FaCaretLeft />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 -translate-y-1/2 z-130 cursor-pointer hover:text-gray-300 text-white p-2 rounded-full text-3xl"
              >
                <FaCaretRight />
              </button>

              <button
                onClick={() => setIsViewerOpen(false)}
                className="absolute top-5 right-5 z-130 bg-white text-black p-2 rounded-full text-2xl"
              >
                <IoClose />
              </button>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Events;
