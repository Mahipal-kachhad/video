import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoModel = () => {
  const divRef = useRef<HTMLDivElement>(null!);
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1536px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#trigger-video",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      gsap.set(divRef.current, {
        scale: 1.9,
        transformOrigin: "center center",
      });
      tl.to(divRef.current, {
        scale: 1,
        duration: 2,
        ease: "power1.inOut",
      });
      return () => {
        tl.kill();
      };
    });
    mm.add("(max-width:1535px) and (min-width:436px)", () => {
      gsap.set(divRef.current, {
        scale: 1.2,
        transformOrigin: "center center",
      });
    });
    mm.add("(max-width:435px)", () => {
      gsap.set(divRef.current, {
        scale: 1,
        transformOrigin: "center center",
      });
    });
   
  }, []);

  return (
    <div className="h-fit 2xl:h-[2000px] flex items-end z-0 pb-7 sm:pb-0 2xl:pb-0 bg-black" id="trigger-video">
      <div className="w-full h-fit sm:h-[370px] lg:h-[450px] xl:h-[580px] 2xl:h-screen sticky bottom-0 flex items-center justify-center overflow-hidden">
        <div className="w-9/10 sm:w-7/10 h-fit relative" ref={divRef}>
          <div className="w-full p-1">
            <img src="/dham/dhamVideo.jpg" className="rounded-[6vw] w-full" />
          </div>
          <div className=" w-full absolute left-0 top-0">
            <img src="/icons/phone.png" alt="phone image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModel;
