"use client";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
}

const BlurPopup = ({ isOpen, setIsOpen, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          className="relative z-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-white/10 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <div className="fixed inset-0 flex w-full items-center justify-center p-4">
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-[90vw] xl:w-[60vw] h-full bg-black px-5 sm:px-10 pt-11 pb-7 sm:py-8 lg:px-15 lg:py-15 rounded-4xl relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black cursor-pointer absolute lg:text-2xl top-3.5 right-3.5 sm:-top-5 sm:-right-5 lg:top-5 lg:right-5 bg-white p-1 rounded-full"
                >
                  <IoClose />
                </button>
                <div className="h-[78vh] sm:h-[63vh] text-[#86868b] font-semibold overflow-y-scroll text-sm lg:text-lg  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default BlurPopup;
