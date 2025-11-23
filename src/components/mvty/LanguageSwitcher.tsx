"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "gu", label: "ગુજરાતી" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  const handleSwitch = (code: string) => {
    if (code === currentLocale) return setOpen(false);
    const newPath = pathname.replace(/^\/(en|hi|gu)/, `/${code}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div
      className="fixed top-3 right-3     z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-label="Change language"
        className="p-0 m-0 rounded-full flex items-center justify-center focus:outline-none"
        style={{ background: 'none', border: 'none', boxShadow: 'none' }}
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        <Image src="/icons/lang.svg" alt="Language" width={60} height={60} loading="eager"/>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 900, damping: 60 }}
            className="absolute right-0 mt-1 rounded-xl shadow-xl bg-black py-2 px-4 flex flex-col min-w-[90px]"
          >
            {LANGS.map((lang) => (
              <button
                key={lang.code}
                className={`py-1 px-2 text-right rounded transition font-medium ${
                  lang.code === currentLocale ? "text-[#ff8127] font-bold" : "text-white"
                }`}
                onClick={() => handleSwitch(lang.code)}
                disabled={lang.code === currentLocale}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
