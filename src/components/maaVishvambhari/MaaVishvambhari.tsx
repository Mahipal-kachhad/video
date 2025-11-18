"use client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const MaaVishvambhari = () => {
  const pathName = usePathname();
  const lang = pathName.split("/")[1] || "en";
  return (
    <div className="pt-8 sm:pt-20 bg-black">
      <div className="w-5/6 sm:w-1/2 lg:w-2/5 mx-auto">
        <img
          src={`/maa/Maa_Vishvambhari_${lang}.png`}
          alt="maa vishvambhari"
          className="hidden sm:block mx-auto"
        />
        <img
          src={`/maa/MaaVishvambhari_${lang}.png`}
          alt="maa vishvambhari"
          className="sm:hidden mx-auto"
        />
      </div>
      <div className="w-full sm:w-2/3 2xl:w-2/5 mx-auto">
        <Suspense fallback={<img src={"/maa/fallback.png"} />}>
          <video src="/maa/Maa_Main.mp4" autoPlay muted loop />
        </Suspense>
      </div>
    </div>
  );
};

export default MaaVishvambhari;
