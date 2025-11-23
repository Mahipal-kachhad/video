import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const Hotspot = ({
  x,
  y,
  z,
  img,
  label,
  onClick,
  onZoom,
}: any) => {
  const [hovered, setHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const thumbnailImage = img ? img : null;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onZoom) onZoom(e);
    };
    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [onZoom]);

  return (
    <group position={[x, y, z]}>
      <Html center zIndexRange={[100, 0]}>
        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-center cursor-pointer select-none"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onDragStart={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-200 z-20">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
            <img
              src="/icons/map.svg"
              alt="Pin"
              draggable={false}
              width={25}
              className="relative object-contain z-10 drop-shadow-md"
            />
          </div>
          <div
            className={`
              absolute top-10 flex flex-col items-center transition-all duration-300 ease-out origin-top z-10
              ${
                hovered
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95 pointer-events-none"
              }
            `}
          >
            <div className="bg-gray-600 text-white text-sm font-bold px-5 py-1.5 rounded-t-2xl shadow-sm relative z-10 translate-y-2">
              {label}
            </div>

            <div className="bg-gray-600 p-2 rounded-2xl shadow-2xl relative z-0">
              <div className="w-48 h-32 bg-gray-800 rounded-xl overflow-hidden relative">
                <img
                  src={thumbnailImage}
                  alt={label}
                  draggable={false}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default Hotspot;
