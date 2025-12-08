import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Pagination } from "swiper/modules";
import Particles from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";

const SymbolsMB = ({
  cards,
  particleOptions,
}: {
  cards: { id: number; title: string; textm: string; image: string }[];
  particleOptions?: ISourceOptions;
}) => {
  return (
    <div className="sm:hidden ">
      <div className="">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={"auto"}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          className="pb-6!"
        >
          {cards.map((card) => (
            <SwiperSlide
              key={card.id}
              className="h-auto max-w-[350px] overflow-hidden"
            >
              <div className="relative w-full aspect-9/17 rounded-4xl bg-linear-to-b from-[#7A3E09] to-black overflow-hidden px-5">
                {particleOptions && (
                  <Particles
                    id={`mobile-particles-${card.id}`}
                    options={particleOptions}
                    className="absolute inset-0 z-0 pointer-events-none"
                  />
                )}

                <div className="absolute z-10 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none mix-blend-overlay opacity-60">
                  <motion.img
                    src="/images/rays.png"
                    alt="rays"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear",
                    }}
                    className="w-full h-full object-contain mix-blend-overlay"
                  />
                </div>
                <div className="relative z-20 w-full flex items-center justify-center py-7">
                  <div className="w-75 h-75">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    />
                    
                  </div>
                </div>

                <div className="relative z-20 w-full text-center mt-auto">
                  <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest">
                    {card.title}
                  </h3>
                  <p className="text-white/60 font-extralight text-lg text-justify px-2 hyphens-auto">
                    {card.textm}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: #555;
            opacity: 1;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            width: 90px;
            border-radius: 4px;
            background: #ff8127;
          }
          .swiper-pagination {
            bottom: 0px !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SymbolsMB;
