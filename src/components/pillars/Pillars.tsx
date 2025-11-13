"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import fadeUp from "../function";
import BlurPopup from "../BlurPopup";
import { BsPatchPlusFill } from "react-icons/bs";
import DetailedSlider from "./DetailedSlider";

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  detailedDescription: string;
  images: { url: string }[];
}

const Pillars = () => {
  const pillarsContent: Pillar[] = [
    {
      id: "pathshala",
      title: "Pathshala",
      description:
        "Under The Guidance Of The Founder Of The Dham, Shri Mahapatra, Here One Can Learn The Vedic Ideology... ",
      icon: "/icons/pathshala-icon.png",
      detailedDescription:
        "Under the guidance of the founder of the Dham, Shri Mahapatra, here one can learn the Vedic ideology of Maa Vishvambhari, divine messages, and the art of living. This spiritual school, known as Pathshala, offers profound teachings that connect devotees with ancient wisdom and divine consciousness. Within the sacred walls of Pathshala, one experiences visions of the three realms - heavens, earth, and netherworld, witnessing the divine form of Maa Vishwambhari in her sacred chariot, accompanied by celestial beings and the eternal swing of divine love.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
    {
      id: "himalayas",
      title: "Himalayas",
      description:
        "In A 200-Foot-Long Himalayan Cave Above The School, One Can See The Sheshnag And The Original Shivling...",
      icon: "/icons/himalayas-icon.png",
      detailedDescription:
        "In a 200-foot-long Himalayan cave above the school, one can see the Sheshnag and the original Shivling moving slowly, creating an atmosphere of divine mysticism. This sacred space represents the eternal connection between earth and heaven, where devotees experience the presence of Lord Shiva in his most powerful form. The cave's natural formations and spiritual energy create an environment perfect for meditation and spiritual awakening.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
    {
      id: "gokuldham",
      title: "Gokuldham",
      description:
        "In Gokuldham, The Captivating View Of Goverdhan Mountain Lifted By Shri Krishna And The Meadow Of...",
      icon: "/icons/gokuldham-icon.png",
      detailedDescription:
        "In Gokuldham, the captivating view of Goverdhan Mountain lifted by Shri Krishna and the meadow of Jashoda-Nand Baba reveals the divine play of Lord Krishna. This sacred space recreates the eternal Vrindavan, where devotees can witness the divine pastimes of Krishna and experience the love between mother and child. The spiritual atmosphere transports visitors to the golden age of divine love and devotion.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
    {
      id: "yajna-shala",
      title: "Yajna Shala",
      description:
        "Yajna Is A Symbol Of Indian Culture. Yajna Is Not Just A Religious Ritual, But A Vedic Way Of Living...",
      icon: "/icons/yajna-icon.png",
      detailedDescription:
        "Yajna is a symbol of Indian culture. Yajna is not just a religious ritual, but a Vedic way of living. The wonderful Yajnashala located here provides a sacred space for performing ancient fire ceremonies that connect the material world with the spiritual realm. These rituals purify the environment and elevate consciousness, creating harmony between nature and divinity.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
    {
      id: "Vaikunthdham",
      title: "Vaikunthdham",
      description:
        "Yajna is a symbol of Indian culture. Yajna is not just a religious ritual, but a Vedic way of living...",
      icon: "/icons/Vaikunthdham.png",
      detailedDescription:
        "Vaikunthdham represents the eternal abode of Lord Vishnu, where devotees experience divine bliss and eternal peace. This sacred space embodies the concept of Vaikuntha - the spiritual realm beyond material existence. Here, one can connect with the divine energy of Lord Vishnu and experience the ultimate goal of spiritual life.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
    {
      id: "Panchvati",
      title: "Panchvati",
      description:
        "Yajna Is A Symbol Of Indian Culture. Yajna Is Not Just A Religious Ritual, But A Vedic Way Of Living...",
      icon: "/icons/Panchvati.png",
      detailedDescription:
        "Panchvati, the sacred grove of five trees, represents the divine forest where Lord Rama spent his exile period. This spiritual space recreates the atmosphere of ancient India, where sages and devotees lived in harmony with nature. The five sacred trees symbolize the five elements and the balance of cosmic energies.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
    {
      id: "Prakruti-Van",
      title: "Prakruti Van",
      description:
        "Yajna Is A Symbol Of Indian Culture. Yajna Is Not Just A Religious Ritual, But A Vedic Way Of Living...",
      icon: "/icons/Prakruti_Van.png",
      detailedDescription:
        "Prakruti Van represents the natural forest environment where devotees can connect with Mother Nature and experience the divine presence in all living beings. This sacred grove teaches the importance of environmental consciousness and the interconnectedness of all life forms. It serves as a reminder of our duty to protect and preserve nature.",
      images: [
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
        { url: "/dham/maa11.jpg" },
        { url: "/dham/patr1.jpg" },
        { url: "/dham/maa15.jpg" },
        { url: "/dham/maa10.jpg" },
      ],
    },
  ];

  const swiperRef = useRef<SwiperRef>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);

  return (
    <div className="w-full py-10">
      <div className="flex justify-between items-center w-[85vw] max-w-6xl mx-auto lg:pt-9">
        <motion.h2
          className="text-3xl lg:text-[2.5rem] xl:text-[3.2rem] font-bold  uppercase text-[#ff8127]"
          {...fadeUp()}
        >
          explore our pillars
        </motion.h2>
        <BlurPopup isOpen={isOpen} setIsOpen={setIsOpen}>
          <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 lg:mb-10 uppercase">
            Explore our pillars
          </h2>
          <p className="pb-3 text-justify leading-7 lg:leading-8.5 indent-25">
            The pillars of the Dham capture its living spirit—learning,
            devotion, service and harmony with nature.
          </p>
          <p className="pb-3 text-justify leading-7 lg:leading-8.5 indent-25">
            Pathshala shares Vedic wisdom in a contemporary voice. Himalayas
            offers a space for silence and inner ascent. Gokuldham brings the
            joy of Krishna's leelas alive. Yajna Shala revives the discipline of
            sacred action.
          </p>
          <p className="pb-3 text-justify leading-7 lg:leading-8.5 indent-25">
            Together they invite every visitor to experience Maa's presence in
            daily life—at home, at work and within the heart.
          </p>
          <ul style={{ margin: "4px 0 0", paddingLeft: 22 }}>
            <li>
              <span className="text-white">Pathshala</span> - learn,
              contemplate, transform
            </li>
            <li>
              <span className="text-white">Himalayas</span> - silence, tapas,
              inner strength
            </li>
            <li>
              <span className="text-white">Gokuldham</span> - joy, play,
              devotion
            </li>
            <li>
              <span className="text-white">Yajna Shala</span> - discipline of
              karma and offering
            </li>
          </ul>
        </BlurPopup>
      </div>
      <Swiper
        ref={swiperRef}
        spaceBetween={24}
        centeredSlides
        initialSlide={1}
        speed={1300}
        slidesPerView={"auto"}
        slidesPerGroup={1}
        breakpoints={{
          0: {
            initialSlide: 0,
          },
          436: {
            initialSlide: 1,
          },
        }}
        className="pt-14! pb-7! lg:pt-22! lg:pb-10!"
      >
        {pillarsContent.map((val) => (
          <SwiperSlide
            key={val.id}
            className="w-[320px]! lg:w-[350px]! rounded-3xl aspect-70/44 lg:aspect-70/47 bg-black relative"
          >
            <div className="p-6 lg:p-7">
              <img
                src={val.icon}
                alt={`${val.title} icon`}
                className="block h-[35px] lg:h-10"
              />
              <h3 className="font-bold text-xl lg:text-2xl mt-3 lg:mt-5 mb-1">
                {val.title}
              </h3>
              <p className="text-[0.75rem] leading-6 lg:text-sm lg:leading-7 line-clamp-3 tracking-wide text-justify [word-spacing:2px]">
                {val.description}
              </p>

              <BsPatchPlusFill
                className="absolute right-3 bottom-3 lg:right-5 lg:bottom-4 text-3xl lg:text-3xl cursor-pointer"
                onClick={() => setSelectedPillar(val)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        className="flex justify-center xl:justify-end items-center gap-4 pe-5 w-[85vw] max-w-6xl mx-auto"
        {...fadeUp()}
      >
        <button
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="w-9 h-9 rounded-full border-2 border-neutral-400 bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="w-9 h-9 rounded-full border-2 border-neutral-400 bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </motion.div>

      {selectedPillar && (
        <BlurPopup
          isOpen={!!selectedPillar}
          setIsOpen={() => setSelectedPillar(null)}
        >
          <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 lg:mb-10 uppercase">
            {selectedPillar.title}
          </h2>
          <p className="pb-3 text-justify leading-7 lg:leading-8.5 indent-25">
            {selectedPillar.detailedDescription}
          </p>
          <DetailedSlider images={selectedPillar.images} />
        </BlurPopup>
      )}
    </div>
  );
};

export default Pillars;
