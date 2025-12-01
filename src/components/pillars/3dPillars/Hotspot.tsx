import { Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

// Added isMenuOpen prop
const Hotspot = ({ x, y, z, img, label, onClick, onZoom, isMenuOpen }: any) => {
  const [hovered, setHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<Group>(null);
  const htmlRef = useRef<HTMLDivElement>(null);

  const thumbnailImage = img ? img : null;

  // --- GHOSTING FIX ---
  useFrame((state) => {
    if (!groupRef.current || !htmlRef.current) return;
    // If menu is open, we rely on CSS opacity, but we can also force hide here if needed.
    // For smooth transitions, we prefer CSS opacity below, 
    // but we still need the angle check for when menu is closed.
    
    const camera = state.camera;
    const hotspotPos = new Vector3();
    groupRef.current.getWorldPosition(hotspotPos);

    const camPos = new Vector3();
    camera.getWorldPosition(camPos);

    const dirToHotspot = new Vector3();
    dirToHotspot.subVectors(hotspotPos, camPos).normalize();

    const camDir = new Vector3();
    camera.getWorldDirection(camDir);

    const dot = dirToHotspot.dot(camDir);

    if (dot < 0.1) {
      htmlRef.current.style.display = "none";
    } else {
      htmlRef.current.style.display = "block";
    }
  });

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
    <group ref={groupRef} position={[x, y, z]}>
      <Html center zIndexRange={[100, 0]}>
        <div ref={htmlRef}>
          <div
            ref={containerRef}
            // NEW: Apply transition class based on isMenuOpen
            // If menu is open: opacity-0 and ignore pointers. 
            // If closed: opacity-100 and visible.
            className={`
              relative flex flex-col items-center justify-center select-none 
              transition-all duration-300 ease-in-out
              ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-none"}
            `}
            onMouseLeave={() => setHover(false)}
          >
            {/* --- LAYER 1: RIPPLE (Bottom) --- */}
            <div className="absolute top-0 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-75 z-0"></div>

            {/* --- LAYER 2: LABEL & IMAGE (Middle) --- */}
            <div className="absolute top-5 flex flex-col items-center origin-top z-10">
              <div
                className={`bg-[#2c2c2c] text-white font-bold px-5 py-1.5 rounded-t-2xl duration-300 ${
                  hovered ? "" : "rounded-b-2xl"
                } shadow-sm relative translate-y-2 pointer-events-auto cursor-pointer`}
                onMouseEnter={() => setHover(true)}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                {label}
              </div>

              <div
                className={`
                  bg-[#2c2c2c] p-2 rounded-2xl shadow-2xl relative transition-opacity duration-300 ease-in-out
                  ${
                    hovered
                      ? "opacity-100 pointer-events-auto cursor-pointer"
                      : "opacity-0 pointer-events-none"
                  }
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
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

            {/* --- LAYER 3: PIN ICON (Top) --- */}
            <div
              className="relative w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-200 z-20 cursor-pointer pointer-events-auto"
              onMouseEnter={() => setHover(true)}
              onDragStart={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <img
                src="/icons/map.svg"
                alt="Pin"
                draggable={false}
                width={25}
                className="relative object-contain drop-shadow-md"
              />
            </div>
            
          </div>
        </div>
      </Html>
    </group>
  );
};

export default Hotspot;