import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaCaretRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

interface Snippet {
  title: string;
  thumbnails: {
    medium: { url: string };
    high: { url: string };
  };
  resourceId?: { videoId: string };
}

interface PlaylistItem {
  id: string;
  snippet: Snippet;
}

interface PlaylistRowData {
  id: string;
  title: string;
  thumbnail: string;
  videos: PlaylistItem[];
}

const PLAYLIST_IDS = [
  "PLzgKDwsTl8Kg1Un4h5XkjRmt10A6MjMMw",
  "PLzgKDwsTl8Kigad0VaUXB9VwnRttaHZzo",
  "PLzgKDwsTl8KgNK5zdq9CfC_k3mat3AEzT",
];

const API_KEY = "AIzaSyB90DzEHkzIdvZG5Maans_ZCiENi6wdXj4";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export default function Video({ activeMenu }: { activeMenu: number }) {
  if (activeMenu !== 0) return null;

  const [data, setData] = useState<PlaylistRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controllers = useRef<{ [key: number]: (amount: number) => void }>({});

  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        const promises = PLAYLIST_IDS.map(async (playlistId) => {
          const playlistDetailsRes = await axios.get(`${BASE_URL}/playlists`, {
            params: { part: "snippet", id: playlistId, key: API_KEY },
          });
          const playlistInfo = playlistDetailsRes.data.items[0]?.snippet;

          const videosRes = await axios.get(`${BASE_URL}/playlistItems`, {
            params: {
              part: "snippet",
              playlistId,
              maxResults: 30,
              key: API_KEY,
            },
          });

          return {
            id: playlistId,
            title: playlistInfo?.title || "Playlist",
            thumbnail: playlistInfo?.thumbnails?.medium?.url || "",
            videos: videosRes.data.items.filter(
              (item: any) => item.snippet.title !== "Private video"
            ),
          };
        });

        const results = await Promise.all(promises);
        setData(results);
      } catch (error) {
        console.error("Error fetching YouTube playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaylists();
  }, []);

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    rowRefs.current.forEach((el, index) => {
      if (!el) return;
      let targetScroll = el.scrollLeft;
      let isAnimating = false;
      let rafId: number | null = null;

      const clamp = (v: number) =>
        Math.max(0, Math.min(v, el.scrollWidth - el.clientWidth));

      const smoothStep = () => {
        const diff = targetScroll - el.scrollLeft;

        if (Math.abs(diff) < 1) {
          el.scrollLeft = targetScroll;
          isAnimating = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          return;
        }

        el.scrollLeft += diff * 0.2;
        rafId = requestAnimationFrame(smoothStep);
      };

      const moveScroll = (delta: number) => {
        targetScroll = clamp(targetScroll + delta);
        if (!isAnimating) {
          isAnimating = true;
          smoothStep();
        }
      };

      const wheelHandler = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        moveScroll(e.deltaY * 2.5);
      };

      el.addEventListener("wheel", wheelHandler, { passive: false });

      controllers.current[index] = (amount: number) => {
        if (!isAnimating) targetScroll = el.scrollLeft;
        moveScroll(amount);
      };

      cleanups.push(() => {
        el.removeEventListener("wheel", wheelHandler);
        if (rafId) cancelAnimationFrame(rafId);
        delete controllers.current[index];
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [data]);

  const handleNextClick = (index: number) => {
    if (controllers.current[index]) {
      controllers.current[index](600);
    }
  };

  if (loading) return <div className="p-20 text-white">Loading videos...</div>;

  return (
    <>
      <div className="flex flex-col gap-5 pb-4 w-full">
        {data.map((playlist, i) => (
          <div key={playlist.id} className="relative group">
            <button
              onClick={() => handleNextClick(i)}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/80 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition cursor-pointer active:scale-90"
            >
              <FaCaretRight size={22} />
            </button>

            <div
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="flex gap-4 overflow-x-auto no-scrollbar px-2 py-1"
            >
              <div className="relative shrink-0 w-[280px] h-40 rounded-2xl overflow-hidden cursor-default border border-white/10">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 text-center">
                  <span className="text-white font-bold tracking-wider text-lg leading-tight uppercase">
                    {playlist.title}
                  </span>
                </div>
              </div>

              {playlist.videos.map((video) => {
                const videoId = video.snippet.resourceId?.videoId;
                const thumb =
                  video.snippet.thumbnails.high?.url ||
                  video.snippet.thumbnails.medium.url;

                return (
                  <div
                    key={video.snippet.resourceId?.videoId}
                    onClick={() => videoId && setSelectedVideo(videoId)}
                    className="relative shrink-0 w-[280px] h-40 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 border border-white/5 bg-[#121212]"
                  >
                    <img
                      src={thumb}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black via-black/90 to-transparent p-4 pt-8">
                      <p className="text-white text-sm font-medium leading-snug line-clamp-2 drop-shadow-md">
                        {video.snippet.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <Dialog
            as="div"
            open={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            className="fixed inset-0 z-200 flex items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            />

            <button
              onClick={() => setSelectedVideo(null)}
              className="fixed top-6 right-6 z-300 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 p-3 rounded-full transition backdrop-blur-sm"
            >
              <IoClose size={32} />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-220 w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mx-4 border border-white/10"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
