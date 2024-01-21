"use client";

import { useState } from "react";
import MovieSearch from "../components/search/MovieSearch";
import TvSearch from "../components/search/TvSearch";
import Paginations from "../components/search/pagination";

const page = ({ searchParams }: { searchParams: { search: string } }) => {
  return (
    <div className="max-w-screen-2xl mx-auto space-y-5 px-5 py-10">
      <div className="flex flex-col space-y-5">
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
          Results for {searchParams.search}
        </h1>

        <MovieSearch />
        <TvSearch />

        <Paginations />
      </div>
    </div>
  );
};

export default page;
