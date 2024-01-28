import React from "react";
import ThemeButton from "./ThemeButton";
import Link from "next/link";
import SearchInput from "./Search";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ChevronDownIcon from "../UI/ChevronDownIcon";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <div className="bg-black  w-full py-3 px-1.5 mx-auto">
      <div className="mx-auto flex md:flex-row flex-col justify-between md:items-center max-w-screen-2xl space-y-2.5">
        <Link
          href={"/"}
          className="lg:text-4xl inline-block text-2xl font-semibold text-transparent bg-gradient-to-r from-[#ef4444] to-[#4715df] bg-clip-text lowercase first-letter:uppercase italic text-center"
        >
          Movie-Zone
        </Link>

        <div className="md:block hidden">
          <Menubar className="outline-none border-none flex justify-between items-center md:gap-x-2 lg:gap-x-4 bg-black text-white">
            <MenubarMenu>
              <Link
                href={"/home"}
                className="lg:text-lg text-base font-semibold capitalize"
              >
                Home
              </Link>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <h3 className="lg:text-lg text-base font-semibold capitalize">
                  movies
                  <ChevronDownIcon className="w-4 h-4 inline-block" />
                </h3>
              </MenubarTrigger>
              <MenubarContent>
                <Link
                  href={"/movies"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>popular</MenubarItem>
                </Link>
                <Link
                  href={"/movies/top-rated"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>top rated</MenubarItem>
                </Link>
                <Link
                  href={"/movies/now-playing"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>now-playing</MenubarItem>
                </Link>
                <Link
                  href={"/movies/upcoming"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>upcoming</MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <h3 className="lg:text-lg text-base font-semibold capitalize">
                  tv show
                  <ChevronDownIcon className="w-4 h-4 inline-block" />
                </h3>
              </MenubarTrigger>
              <MenubarContent>
                <Link
                  href={"/tv"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>popular</MenubarItem>
                </Link>
                <Link
                  href={"/tv/top-rated"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>top rated</MenubarItem>
                </Link>
                <Link
                  href={"/tv/airing-today"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>airing today</MenubarItem>
                </Link>
                <Link
                  href={"/tv/on-air"}
                  className="lg:text-lg text-base font-semibold capitalize"
                >
                  <MenubarItem>on tv</MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="md:hidden block">
          <div className="grid-cols-12 grid md:flex space-x-2 gap-2 w-full">
            <div className="col-span-10">
              <SearchInput />
            </div>
            <div className="flex justify-between items-center col-span-2">
              <ThemeButton />
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="flex space-x-2">
            <SearchInput />
            <ThemeButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
