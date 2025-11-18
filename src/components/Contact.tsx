"use client";
import { useGSAP } from "@gsap/react";
import axios, { AxiosError } from "axios";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

gsap.registerPlugin(useGSAP);

const Contact = () => {
  const t = useTranslations("getInTouch");
  const divRef = useRef<HTMLDivElement>(null!);
  const rotationConfig = useRef({
    name: 50,
    email: -20,
    message: 45,
    submit: 0,
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { name, email, message } = data;
    if (!name && !email && !message) return;

    try {
      const response = await axios.post(
        `https://dhamadmin.cesihpl.com/api/inquiry_test.php`,
        { email, name, message }
      );

      if (response.data.success) {
        toast.success("Message submitted successfully");
      }

      setData({
        name: "",
        email: "",
        message: "",
      });
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<{ success: boolean; error: string }>;
      if (axios.isAxiosError(error) && error.response)
        toast.error(error.response.data.error);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 435px)", () => {
      gsap.set(divRef.current, { rotation: 0 });
      rotationConfig.current = {
        name: 25,
        email: 20,
        message: 19,
        submit: 0,
      };
    });

    mm.add("(min-width: 436px)", () => {
      gsap.set(divRef.current, { rotation: 0 });
      rotationConfig.current = {
        name: 50,
        email: -20,
        message: 45,
        submit: 0,
      };
    });

    return () => mm.revert();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    const baseRotation =
      rotationConfig.current[name as keyof typeof rotationConfig.current] || 0;
    const newRotation = baseRotation - value.length / 1.8;

    gsap.to(divRef.current, {
      rotation: newRotation,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleFocus = (field: "name" | "email" | "message" | "submit") => {
    const rotation = rotationConfig.current[field];
    const currentLength = data[field as keyof typeof data]?.length || 0;

    gsap.to(divRef.current, {
      rotation: rotation - currentLength / 1.6,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const handleBlur = () => {
    gsap.to(divRef.current, {
      rotation: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <div className="bg-black overflow-hidden">
      <div className="w-[85vw] mx-auto max-w-6xl h-[750px] sm:h-[720px] xl:h-[800px] relative bg-black ">
        <div className="h-full w-full pt-10 relative">
          <div ref={divRef} className="origin-[top_center] w-[300px] mx-auto">
            <img src="/icons/bulb.png" alt="rays" />
          </div>
          <div className="absolute -top-2 rounded-b-full w-[5px] h-[50px] border border-white/20 left-1/2 -translate-x-1/2 " />
        </div>

        <div className="w-full h-3/4 absolute bottom-0 left-1/2 -translate-x-1/2">
          <h3 className="text-4xl sm:text-6xl text-center pt-10 font-bold">
            {t("t1")}
          </h3>
          <p className="w-5/6 sm:w-1/2 text-center mx-auto py-6 sm:py-5 text-[#FF8127]">
            {t("p1")}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex-col space-y-5 sm:space-y-0 sm:flex-row flex gap-5">
              <input
                name="name"
                placeholder={t("name")}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                value={data.name}
                onChange={handleChange}
                className="border border-[#FF8127] bg-[#FF8127]/20 w-full outline-0 ps-5 sm:ps-20  py-3 rounded-2xl"
                type="text"
              />
              <input
                name="email"
                value={data.email}
                placeholder={t("email")}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                onChange={handleChange}
                className="border border-[#FF8127] bg-[#FF8127]/20 w-full outline-0 ps-5 sm:ps-20  py-3 rounded-2xl"
                type="text"
              />
            </div>

            <div className="pt-5 sm:pt-7">
              <textarea
                value={data.message}
                placeholder={t("message")}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                onChange={handleChange}
                name="message"
                rows={4}
                className="border border-[#FF8127] bg-[#FF8127]/20 w-full outline-0 ps-5 sm:ps-20 pe-3 py-3 rounded-2xl"
              ></textarea>

              <button
                onMouseEnter={() => handleFocus("submit")}
                onMouseLeave={handleBlur}
                type="submit"
                className="px-20 py-3 rounded-full cursor-pointer hover:bg-white/13 transition ease-in active:bg-white/5 bg-white/7 backdrop-blur-[5px] border-t-white/20 border-t border-l-white/20 border-l mx-auto block mt-5"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
