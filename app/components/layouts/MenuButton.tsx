"use client";

import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
};

const MenuButton = ({
  isOpen,
  onClick,
  ...props
}: {
  isOpen: boolean;
  onClick: () => void;
  props?: any;
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isOpen ? (
        // {/*------------------*/}
        // {/*---- menu icon----*/}
        <motion.button
          className=""
          aria-label="open menu"
          variants={variants}
          key="open"
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.05 }}
          onClick={onClick}
        >
          <Bars3BottomLeftIcon className="h-6 w-6 text-white" />
        </motion.button>
      ) : (
        // {/*-------------------*/}
        // {/*---- close icon----*/}
        <motion.button
          aria-label="close menu"
          variants={variants}
          key="close"
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.05 }}
          onClick={onClick}
          className=""
        >
          <XMarkIcon className="h-6 w-6 text-black" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MenuButton;
