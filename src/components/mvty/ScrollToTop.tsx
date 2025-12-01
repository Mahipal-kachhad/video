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
            fixed bottom-17 right-6
            active:scale-95 z-10000
          "
          aria-label="Scroll to top"
        >
          <img src="/icons/top.svg" width={28} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
