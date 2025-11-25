"use client";

import { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-20 right-5 
            bg-gray-700/90 text-white 
            w-12 h-12 
            flex items-center justify-center 
            rounded-full shadow-lg 
            hover:bg-gray-700/90
            transition-all 
            active:scale-95 backdrop-blur z-100
          "
          aria-label="Scroll to top"
        >
          <FaArrowUpLong size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
