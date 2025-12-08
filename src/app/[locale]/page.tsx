import { setRequestLocale } from "next-intl/server";
import AboutMVTY from "@/components/mvty/AboutMVTY";
import Contact from "@/components/mvty/Contact";
import Darshan from "@/components/mvty/Darshan";
import Dham2 from "@/components/dham/Dham2";
import DhamInfo from "@/components/dham/DhamInfo";
import VideoModel from "@/components/dham/VideoModel";
import Events from "@/components/mvty/Events";
import Footer from "@/components/mvty/Footer";
import GlimpsOfMaa from "@/components/maaVishvambhari/GlimpsOfMaa";
import MaaVishvambhari from "@/components/maaVishvambhari/MaaVishvambhari";
import Map from "@/components/mvty/Map";
import Quotes from "@/components/quotes/Quotes";
import SreeVitthalbhai from "@/components/sreeVitthalbhai/SreeVitthalbhai";
import VitthalbhaiBio from "@/components/sreeVitthalbhai/VitthalbhaiBio";
import VideoGalaxy from "@/components/videoAnimation/VideoGalaxy";
import { Toaster } from "react-hot-toast";
import MainEntry from "@/components/pillars/3dPillars/MainEntry";
import ScrollToTop from "@/components/mvty/ScrollToTop";
import Gallery from "@/components/gallary/Gallery";
import Chat from "@/components/chat/Chat";
import Symbols from "@/components/symbols/Symbols";

export default async function HomePage({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  setRequestLocale(locale);
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
        <MainEntry />
        <Gallery />
        <Symbols />
        <Events />
        <Quotes />
        <Darshan />
        <Map />
        <Contact />
        <Footer />
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <Chat />
      </div>
    </>
  );
}
