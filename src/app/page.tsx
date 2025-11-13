"use client"

import AboutMVTY from "@/components/AboutMVTY";
import BlurSlider from "@/components/BlurSlider";
import Contact from "@/components/Contact";
import Darshan from "@/components/Darshan";
import Dham2 from "@/components/dham/Dham2";
import DhamInfo from "@/components/dham/DhamInfo";
import VideoModel from "@/components/dham/VideoModel";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import GlimpsOfMaa from "@/components/maaVishvambhari/GlimpsOfMaa";
import MaaVishvambhari from "@/components/maaVishvambhari/MaaVishvambhari";
import Map from "@/components/Map";
import Pillars from "@/components/pillars/Pillars";
import Quotes from "@/components/quotes/Quotes";
import SreeVitthalbhai from "@/components/sreeVitthalbhai/SreeVitthalbhai";
import VitthalbhaiBio from "@/components/sreeVitthalbhai/VitthalbhaiBio";
import VideoGalaxy from "@/components/VideoGalaxy";
import { Toaster } from "react-hot-toast";



export default function Home() {
  return (
    <>
      <VideoGalaxy />
      <div className="bg-[#1D1D1F] min-h-screen">
        <AboutMVTY />
        <MaaVishvambhari />
        <GlimpsOfMaa />
        <SreeVitthalbhai />
        <VitthalbhaiBio />
        <VideoModel />
        <DhamInfo />
        <Dham2 />
        <Pillars />
        <BlurSlider />
        <Events />
        <Quotes />
        <Darshan />
        <Map />
        <Contact />
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}
