import React from "react";
import ThemeButton from "./ThemeButton";
import Link from "next/link";
import SearchInput from "./Search";

const Header = () => {
  return (
    <div className="bg-black max-w-screen-2xl w-full py-3 px-5 mx-auto">
      <div className="mx-auto flex justify-between items-center">
        <Link
          href={"/"}
          className="lg:text-4xl inline-block text-3xl font-semibold text-transparent bg-gradient-to-r from-[#ef4444] to-[#4715df] bg-clip-text lowercase first-letter:uppercase italic text-center"
        >
          Movie-Zone
        </Link>

        <div className="flex gap-2">
          <SearchInput />
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
