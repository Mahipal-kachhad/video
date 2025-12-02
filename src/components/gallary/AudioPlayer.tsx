import { useEffect, useRef, useState } from "react";
import { Audio } from "./Audio";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

const formatTime = (seconds: number) => {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ val, idx }: { val: Audio; idx: number }) => {
  const { path, image, title } = val;
  const waveFormRef = useRef<HTMLDivElement>(null!);
  const waveSurfer = useRef<WaveSurfer>(null!);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    if (!waveFormRef.current) return;
    setLoading(true);
    setIsPlaying(false);
    const options: WaveSurferOptions = {
      container: waveFormRef.current,
      waveColor: "#999",
      progressColor: "#ff9900",
      height: 50,
      cursorWidth: 1,
      barWidth: 2,
      barGap: 2,
    };

    const ws = WaveSurfer.create(options);
    waveSurfer.current = ws;

    ws.on("ready", (duration) => {
      setLoading(false);
      setTotalDuration(duration);
    });
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));
    ws.on("audioprocess", (time) => {
      setCurrentTime(time);
    });
    ws.on("interaction", (newTime) => {
      setCurrentTime(newTime);
    });

    ws.load(path).catch((err) => {
      if (
        err.name === "AbortError" ||
        err.message === "The user aborted a request."
      )
        return;
      console.error("Error loading waveSurfer:", err);
      setLoading(false);
    });

    return () => {
      ws.destroy();
    };
  }, [path]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: "Listen to this audio",
          url: path,
        });
      } else {
        await navigator.clipboard.writeText(path);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed: ", error);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = title.endsWith(".mp3") ? title : `${title}.mp3`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download audio.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-5 p-3 rounded-xl mb-4 bg-linear-0 from-transparent to-white/20 mx-3 sm:mx-5 xl:mx-0">
      <img
        src={image || "/fallback.jpg"}
        alt="thumbnail"
        className="w-33 h-33 rounded-lg object-center object-cover"
      />

      <div className="flex-1">
        <div className="flex justify-between mb-3 sm:mb-5 sm:mt-3">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => waveSurfer.current?.playPause()}
              className="w-8 h-8 bg-[#464646]/80 rounded-full active:scale-95 flex items-center justify-center"
            >
              <img
                src={isPlaying ? "/icons/pa-pose.svg" : "/icons/au-play.svg"}
                alt={isPlaying ? "pause" : "play"}
                width={12}
              />
            </button>

            <button
              onClick={handleShare}
              className="w-8 h-8 bg-[#464646]/80 rounded-full active:scale-95 flex items-center justify-center"
            >
              <img src="/icons/au-share.svg" alt="share" width={12} />
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-8 h-8 bg-[#464646]/80 rounded-full active:scale-95 flex items-center justify-center ${
                isDownloading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <img src="/icons/au-download.svg" alt="download" width={12} />
              )}
            </button>
            <p className="hidden sm:block ps-5">
              {idx < 10 ? `0${idx + 1}` : idx + 1} - {title}
            </p>
          </div>
          {!loading && (
            <p>
              <span className="text-[#FF8D28]">{formatTime(currentTime)}</span>{" "}
              / {formatTime(totalDuration)}
            </p>
          )}
        </div>

        <p className="sm:hidden pb-3">
          {idx < 10 ? `0${idx + 1}` : idx + 1} - {title}
        </p>

        <div className="relative h-[60px]">
          {loading && (
            <div className="absolute inset-0 flex items-center gap-2 text-white/60 text-sm">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Loading track...</span>
            </div>
          )}
          <div
            ref={waveFormRef}
            className={`transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
