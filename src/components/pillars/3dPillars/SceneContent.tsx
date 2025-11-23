import { Html, OrbitControls } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Texture,
  TextureLoader,
} from "three";
import SphereModel from "./SphereModel";
import Hotspot from "./Hotspot";

export interface HotspotData {
  x: number;
  y: number;
  z: number;
  target: string;
  label: string;
  content: string;
  img: string | null;
}
export interface SceneNode {
  id: string;
  texture: string;
  content: string;
  title: string;
  hotspots: HotspotData[];
}
export interface SceneDataMap {
  [key: string]: SceneNode;
}

const iconStyle =
  "w-10 h-10 bg-[#464646]/80 rounded-full transition-all active:scale-95 flex items-center justify-center";
const iconWidth = 18;

const SceneContent = ({ data }: { data: SceneDataMap }) => {
  const { camera, gl } = useThree();

  const sceneKeys = Object.keys(data);
  const [currentSceneId, setCurrentSceneId] = useState(sceneKeys[0]);
  const [history, setHistory] = useState<string[]>([]);

  // State for Sidebars
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [isAutoRotating, setIsAutoRotating] = useState(false);

  const targetFov = useRef(60);
  const fadeOpacity = useRef(0);
  const prevSphereRef = useRef<Mesh>(null);

  const initialTexture = useLoader(TextureLoader, data[sceneKeys[0]].texture);
  const [mainTexture, setMainTexture] = useState<Texture>(initialTexture);
  const [prevTexture, setPrevTexture] = useState<Texture | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScene = data[currentSceneId];

  const transitionToScene = (
    targetId: string,
    addToHistory: boolean = true
  ) => {
    if (isTransitioning) return;
    const targetScene = data[targetId];
    if (!targetScene) return;

    if (addToHistory) {
      setHistory((prev) => [...prev, currentSceneId]);
    }

    setIsTransitioning(true);
    setPrevTexture(mainTexture);
    fadeOpacity.current = 1;

    new TextureLoader().load(
      targetScene.texture,
      (loadedTexture) => {
        setMainTexture(loadedTexture);
        setCurrentSceneId(targetId);
      },
      undefined,
      (err) => {
        console.error("Error Loading Texture", err);
        setIsTransitioning(false);
      }
    );
  };

  const handleHotspotClick = (targetId: string) => {
    transitionToScene(targetId, true);
  };

  const handleNext = () => {
    const currentIndex = sceneKeys.indexOf(currentSceneId);
    if (currentIndex < sceneKeys.length - 1) {
      transitionToScene(sceneKeys[currentIndex + 1], true);
    }
  };

  const handlePrev = () => {
    const currentIndex = sceneKeys.indexOf(currentSceneId);
    if (currentIndex > 0) {
      transitionToScene(sceneKeys[currentIndex - 1], true);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const lastSceneId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      transitionToScene(lastSceneId, false);
    }
  };

  const handleZoom = useCallback((event: WheelEvent) => {
    const zoomSpeed = 0.1;
    const minFov = 30;
    const maxFov = 70;
    targetFov.current += event.deltaY * zoomSpeed;
    targetFov.current = MathUtils.clamp(targetFov.current, minFov, maxFov);
  }, []);

  const handleZoomIn = () => {
    const minFov = 30;
    targetFov.current = Math.max(targetFov.current - 10, minFov);
  };

  const handleZoomOut = () => {
    const maxFov = 90;
    targetFov.current = Math.min(targetFov.current + 10, maxFov);
  };

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.1);

    if (prevTexture && fadeOpacity.current > 0) {
      fadeOpacity.current -= 1.0 * clampedDelta;
      if (prevSphereRef.current) {
        const material = prevSphereRef.current.material as MeshBasicMaterial;
        if (material) material.opacity = fadeOpacity.current;
      }
      if (fadeOpacity.current <= 0) {
        fadeOpacity.current = 0;
        setPrevTexture(null);
        setIsTransitioning(false);
      }
    }

    const cam = camera as PerspectiveCamera;
    cam.fov = MathUtils.lerp(cam.fov, targetFov.current, 0.15);
    cam.updateProjectionMatrix();
  });

  useEffect(() => {
    const handleCanvasWheel = (event: WheelEvent) => {
      event.preventDefault();
      handleZoom(event);
    };

    const canvasElement = gl.domElement;
    canvasElement.addEventListener("wheel", handleCanvasWheel, {
      passive: false,
    });
    return () => canvasElement.removeEventListener("wheel", handleCanvasWheel);
  }, [gl, handleZoom]);

  const currentIndex = sceneKeys.indexOf(currentSceneId);
  const isBackDisabled = history.length === 0;
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === sceneKeys.length - 1;

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={-0.2}
        dampingFactor={0.15}
        enableDamping
        autoRotate={isAutoRotating}
        autoRotateSpeed={0.5}
      />
      <SphereModel texture={mainTexture} opacity={1} renderOrder={0} />

      {prevTexture && (
        <SphereModel
          ref={prevSphereRef}
          texture={prevTexture}
          opacity={1}
          renderOrder={1}
        />
      )}

      {/* --- UI LAYER --- */}
      <Html fullscreen style={{ pointerEvents: "none" }} zIndexRange={[100, 0]}>
        {/* --- LEFT SIDEBAR TOGGLE --- */}
        <div
          className={`
            absolute top-5 left-5 pointer-events-auto z-50 transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-50" : "translate-x-0"}
          `}
        >
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={iconStyle}
            title={isSidebarOpen ? "Close Menu" : "Open Menu"}
          >
            {isSidebarOpen ? (
              <img
                src="/icons/pa-open.svg"
                alt="open"
                className="rotate-180"
                width={iconWidth}
              />
            ) : (
              <img
                src="/icons/pa-open.svg"
                alt="open"
                className=""
                width={iconWidth}
              />
            )}
          </button>
        </div>

        {/* --- LEFT SIDEBAR CONTENT --- */}
        <div
          className={`
            absolute top-0 left-0 h-full w-50 transition-transform duration-300 ease-in-out pointer-events-auto flex flex-col z-40
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex-1 overflow-y-auto ps-4 pt-4 space-y-2">
            {sceneKeys.map((key) => (
              <button
                key={key}
                onClick={() => {
                  transitionToScene(key, true);
                  setIsSidebarOpen(false);
                }}
                className={` 
                   w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-white font-bold
                   ${
                     currentSceneId === key
                       ? "bg-[#464646] "
                       : "bg-[#464646]/70"
                   }
                 `}
              >
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- RIGHT INFO BUTTON --- */}
        {/* FIX: Added transition-transform and conditional translation based on isInfoOpen */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 right-5 pointer-events-auto z-50 transition-transform duration-300 ease-in-out
            ${
              isInfoOpen
                ? "-translate-x-70 sm:-translate-x-120"
                : "translate-x-0"
            }
          `}
        >
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className={iconStyle}
            title="Toggle Info"
          >
            {isInfoOpen ? (
              <img src="/icons/pa-open.svg" alt="next" width={iconWidth} />
            ) : (
              <img src="/icons/pa-info.svg" alt="next" width={iconWidth} />
            )}
          </button>
        </div>

        {/* --- RIGHT INFO SIDEBAR --- */}
        <div
          className={`
            absolute top-0 right-0 h-full w-70 sm:w-120 bg-[black]/90 rounded-2xl transition-transform duration-300 ease-in-out pointer-events-auto flex flex-col z-40
            ${isInfoOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-6 mt-16 border-b border-white/10">
            <h2 className="text-white text-xl font-bold tracking-wide">
              {currentScene.title}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 text-gray-300 leading-relaxed space-y-4">
            {currentScene.content}
          </div>
        </div>

        <div className="absolute bottom-30 left-10 sm:left-30 -translate-x-1/2 pointer-events-auto z-10">
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={iconStyle}
            title="Previous Scene"
          >
            <img src="/icons/pa-prev.svg" alt="prev" width={iconWidth} />
          </button>
        </div>
        <div className="absolute bottom-30 right-10 sm:right-30 translate-x-1/2 flex justify-between pointer-events-auto z-10">
          <button
            onClick={handleNext}
            disabled={isNextDisabled}
            className={iconStyle}
            title="Next Scene"
          >
            <img src="/icons/pa-next.svg" alt="next" width={iconWidth} />
          </button>
        </div>

        <div className="absolute bottom-5 left-1/2 w-fit transform -translate-x-1/2 flex gap-3 justify-between pointer-events-auto z-10">
          <button
            onClick={handleBack}
            disabled={isBackDisabled}
            className={iconStyle}
            title="Go Back (History)"
          >
            <img src="/icons/pa-back.svg" alt="back" width={iconWidth} />
          </button>

          <button onClick={handleZoomIn} className={iconStyle} title="Zoom In">
            <img src="/icons/pa-zoomin.svg" alt="zoom in" width={iconWidth} />
          </button>
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={iconStyle}
            title={isAutoRotating ? "Pause Rotation" : "Auto Rotate"}
          >
            {isAutoRotating ? (
              <img src="/icons/pa-pose.svg" alt="pose" width={iconWidth} />
            ) : (
              <img src="/icons/pa-play.svg" alt="play" width={iconWidth} />
            )}
          </button>
          <button
            onClick={handleZoomOut}
            className={iconStyle}
            title="Zoom Out"
          >
            <img src="/icons/pa-zoomout.svg" alt="zoom out" width={iconWidth} />
          </button>
        </div>
      </Html>

      {!isTransitioning &&
        currentScene.hotspots.map((spot, index) => (
          <Hotspot
            key={index}
            x={spot.x}
            y={spot.y}
            z={spot.z}
            label={spot.label}
            img={spot.img}
            onClick={() => handleHotspotClick(spot.target)}
            onZoom={handleZoom}
            sceneData={data}
          />
        ))}
    </>
  );
};

export default SceneContent;
