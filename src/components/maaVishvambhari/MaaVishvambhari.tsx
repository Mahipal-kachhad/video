"use client";
import { Suspense } from "react";

const MaaVishvambhari = () => {
  return (
    <div className="pt-8 sm:pt-20 bg-black">
      <div className="w-5/6 sm:w-1/2 lg:w-2/5 mx-auto">
        <img
          src="/maa/Maa_Vishvambhari.png"
          alt="maa vishvambhari"
          className="hidden sm:block"
        />
        <img
          src="/maa/MaaVishvambhari.png"
          alt="maa vishvambhari"
          className="sm:hidden"
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
