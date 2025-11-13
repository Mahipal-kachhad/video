import { HiArrowLongRight } from "react-icons/hi2";
import BlurPopup from "../BlurPopup";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import fadeUp from "../function";
import Slider from "../Slider";
import axios from "axios";

const GlimpsOfMaa = () => {
  const [images, setImages] = useState<{ url: string }[]>([
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa10.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa15.jpg" },
    { url: "/dham/maa11.jpg" },
    { url: "/dham/maa10.jpg" },
  ]);

  useEffect(() => {
    axios
      .get(
        "https://dhamadmin.cesihpl.com/edit_maa_vishavambhari_image.php?action=list"
      )
      .then((data: any) => {
        setImages(
          data.data.images[0].sub_images.map((val: any) => {
            return {
              url: `https://dhamadmin.cesihpl.com/${val.url}`,
            };
          })
        );
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-black py-10">
      <motion.h2
        className="text-3xl leading-11 lg:text-[2.5rem] xl:text-[3.4rem] font-bold w-[85vw] max-w-6xl mx-auto uppercase text-center text-[#ff8127]"
        {...fadeUp()}
      >
        Glimpse of Mother Vishvambhari
      </motion.h2>
      <motion.div
        className="mt-10 w-[90vw] sm:w-[85vw] max-w-6xl mx-auto text-sm lg:text-lg"
        {...fadeUp()}
      >
        <p className="font-bold text-[#86868b] indent-23 sm:indent-50 pb-5 text-justify leading-7 lg:leading-8.5">
          For briefing{" "}
          <span className="text-white font-extrabold">Mother VISHVAMBHARI</span>
          , really entire intellectuality of this world, words of all the
          languages on this earth and collective emotions of all lives of this
          world are not enough to brief the Mother VISHVAMBHARI. Even though,
          one can't resist singing the laurels of{" "}
          <span className="text-white font-extrabold">
            Form, Quality and Deeds of Mother VISHVAMBHARI.
          </span>
        </p>
        <p className="font-bold text-[#86868b] indent-23 sm:indent-50 pb-5 text-justify leading-7 lg:leading-8.5">
          Mother VISHVAMBHARI is the creator of this endless{" "}
          <span className="text-white font-extrabold">
            Universe and entire world.
          </span>{" "}
          Mother created{" "}
          <span className="text-white font-extrabold">
            Brahma, Vishnu and Mahesh (three Lords)
          </span>{" "}
          and she is also the creator of minutest lifes to the gigantic animals;
          small mote to skyward ranges of Himalayas; small drop of water to
          seven seas; skies covering little cloud to stars, planets and nebulas.
          By arranging mysterious play of evolution,{" "}
          <span className="text-white font-extrabold">
            she has created special niche for humans and given the super most
            position to human beings in this world.{" "}
          </span>
          So that he/she can attain the self-emancipation by singing lyrics of
          her{" "}
          <span className="text-white font-extrabold">
            Extra-terrestrial power
          </span>
          . Mother VISHVAMBHARI is the mother of all Gods and Goddesses. She is
          omnipresent, almighty and omniscient.
        </p>
        <p className="hidden sm:block font-bold text-[#86868b] indent-23 sm:indent-50 pb-5 text-justify leading-7 lg:leading-8.5">
          Mother's existence was always there, even there were no before the
          presence of Sun and Moon, no gods and demons, no Saints-sages and
          friars, this world or any other creations.{" "}
          <span className="text-white font-extrabold">
            She is present today and will exist even after destruction of the
            world.
          </span>
        </p>
        <p
          className="text-end text-[#FF8127] flex w-fit ms-auto gap-3 items-center pe-4 pt-5 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          More details{" "}
          <span className="inline text-2xl">
            <HiArrowLongRight />
          </span>
        </p>
      </motion.div>
      <BlurPopup isOpen={isOpen} setIsOpen={setIsOpen}>
        <h2 className="text-3xl lg:text-[2.5rem] xl:text-[3.4rem] font-bold text-[#ff8127] text-center mb-5 uppercase">
          Maa Vishvambhari
        </h2>

        <p className="pb-3 text-justify leading-7 lg:leading-8 indent-25">
          For briefing Mother VISHVAMBHARI, really entire intellectuality of
          this world, words of all the languages on this earth and collective
          emotions of all lives of this world are not enough to brief the Mother
          VISHVAMBHARI. Even though, one can't resist singing the laurels of
          form, quality and deeds of Mother VISHVAMBHARI.
        </p>
        <p className="pb-3 text-justify leading-7 lg:leading-8 indent-25">
          Mother VISHVAMBHARI is the creator of this endless{" "}
          <span className="text-white font-extrabold">
            Universe and entire world.
          </span>{" "}
          Mother created{" "}
          <span className="text-white font-extrabold">
            Brahma, Vishnu and Mahesh (three Lords)
          </span>{" "}
          and she is also the creator of minutest lifes to the gigantic animals;
          small mote to skyward ranges of Himalayas; small drop of water to
          seven seas; skies covering little cloud to stars, planets and nebulas.
          The creation, breeding and destruction of all of them happen with a
          blink of her eye. By arranging mysterious play of evolution,{" "}
          <span className="text-white font-extrabold">
            she has created special niche for humans and given the super most
            position to human beings in this world.
          </span>{" "}
          So that he/she can attain the self-emancipation by singing lyrics of
          her{" "}
          <span className="text-white font-extrabold">
            extra-terrestrial power.
          </span>{" "}
          Mother VISHVAMBHARI is the mother of all Gods and Goddesses. She is
          omnipresent, almighty and omniscient.
        </p>
        <p className="pb-3 text-justify leading-7 lg:leading-8 indent-25">
          Mother's existence was always there, even there were no before the
          presence of Sun and Moon, no gods and demons, no Saints-sages and
          friars, this world or any other creations.{" "}
          <span className="text-white font-extrabold">
            She is present today and will exist even after destruction of the
            world.
          </span>
        </p>
        <p className="pb-3 text-justify leading-7 lg:leading-8 indent-25">
          Mother created whole three layers like (1) Upper most Layer:- sky
          including celestial objects (2) Middle Layer: earth and (3) Lower
          most:- abyss. For proper managing of the world, she created Brahma,
          Vishnu and Mahesh (three Lords) on the most auspicious day of Akshaya
          Tritya (Akhatrij). She created all those lives who are swimming in
          water (aquatic), roaming on land (terrestrial) and flying in sky
          (spatial). She entrusted responsibility of their creation to Brahma,
          their breeding and nourishment to Vishnu and their salvation to
          Mahesh. Since then, they are controlling this huge system as per the
          wish and order of Mother. It's quite natural that the supreme power
          that created universe is known as MOTHER!!
        </p>
      </BlurPopup>
      <div className="py-10">
        <Slider images={images} />
      </div>
    </div>
  );
};

export default GlimpsOfMaa;
