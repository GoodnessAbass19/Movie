import React from "react";
import ThemeButton from "./ThemeButton";
import Link from "next/link";
import SearchInput from "./Search";

const Header = () => {
  return (
    <div className="bg-black  w-full py-3 px-3 md:px-5 mx-auto">
      <div className="mx-auto flex md:flex-row flex-col justify-between md:items-center max-w-screen-2xl space-y-2.5">
        <Link
          href={"/"}
          className="lg:text-4xl inline-block text-3xl font-semibold text-transparent bg-gradient-to-r from-[#ef4444] to-[#4715df] bg-clip-text lowercase first-letter:uppercase italic text-center"
        >
          Movie-Zone
        </Link>

        <div className="md:hidden block">
          <div className="grid-cols-12 grid md:flex space-x-2 gap-2 w-full">
            <div className="col-span-11">
              <SearchInput />
            </div>
            <div className="flex justify-between items-center col-span-1">
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
