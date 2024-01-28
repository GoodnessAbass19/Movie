"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MobileNav = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  return (
    <motion.nav
      className="fixed inset-0 z-40 !min-h-full flex flex-col justify-between bg-white md:hidden"
      variants={navVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.ul
        className="container flex flex-col gap-6  px-6 mt-20 pt-16 border-t text-lg font-medium capitalize tracking-widest text-gray-500"
        variants={ulVariants}
      >
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            className="list-none text-center text-black"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            custom={index}
            onClick={() => {
              onClose();
              router.push(`/${item.link}`);
            }}
          >
            <Link
              href={`/${item.link}`}
              className="inline-block "
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {item.name}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
      {/* <motion.div
        className="flex justify-center gap-4 px-6 pb-4"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        custom={3}
      >
        <Link
          href={"#contact"}
          onClick={(e) => {
            e.preventDefault();
            onClose;
          }}
          className="text-white bg-black lg:capitalize rounded-xl  py-2 px-4 text-xl font-semibold"
        >
          Instant quote
        </Link>
      </motion.div> */}
    </motion.nav>
  );
};

// framer motion animation variants
const navVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {},
  },
};
const ulVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};
const listVariants = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.1,
    },
  }),
  exit: (index: number) => ({
    y: -10,
    opacity: 0,
    transition: {
      delay: index * 0.1,
    },
  }),
};

const navItems = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "about",
    link: "about",
  },
  {
    name: "courses",
    link: "courses",
  },
  {
    name: "buy/sell",
    link: "buy-a-computer",
  },
  {
    name: "repair/maintenance",
    link: "repair",
  },

  // {
  //   name: "store",
  //   link: "store",
  // },
  // {
  //   name: "contact",
  //   link: "contact",
  // },
];

export default MobileNav;
