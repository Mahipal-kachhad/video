import { getTranslations } from "next-intl/server"; // Server Component hook
import AboutMVTY from "@/components/AboutMVTY";
import BlurSlider from "@/components/GallerySlider";
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

// These are client-side specific and should be placed on a separate file
import { Toaster } from "react-hot-toast"; 
import gsap, { ScrollTrigger } from "gsap/all";

// The following lines are not required in a page.tsx that is not a Client Component
// gsap.registerPlugin(ScrollTrigger); 

// The static params are defined in the layout.tsx in the updated setup for consistency
// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "hi" }, { locale: "gu" }];
// }

export default async function HomePage() {
  // Use the server hook and await the function call
  // This can be used to load translations for the main layout/structure
  const t = await getTranslations(); 

  return (
    <>
      <VideoGalaxy />
      <div className="bg-[#1D1D1F] min-h-screen">
        {/* Example of a translated component title */}
        <h1 className="text-3xl text-white p-4">{t('Index.WelcomeTitle')}</h1> 
        
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
        {/* Toaster is a Client Component, keep it here or move to a client wrapper */}
        <Toaster position="top-center" reverseOrder={false} /> 
      </div>
    </>
  );
}