"use client";
import { usePathname } from "next/navigation";

const SreeVitthalbhai = () => {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <div className="bg-black ">
      <div className="w-5/6 sm:w-2/5 mx-auto pb-10">
        <img src={`/vitthalbhai/Shree_Vitthalbhai_${currentLocale}.png`} alt="Shree Vitthalbhai" />
      </div>
      <div className="w-[90vw] 2xl:w-[60vw] mx-auto -mt-7 sm:-mt-15 -mb-10 sm:-mb-30 -z-10">
        <img src="/vitthalbhai/vitthalbhai.png" className="w-full" alt="" />
      </div>
    </div>
  );
};

export default SreeVitthalbhai;
