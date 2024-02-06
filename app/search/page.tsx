"use client";

import { useState } from "react";
import MovieSearch from "../components/search/MovieSearch";
import TvSearch from "../components/search/TvSearch";
import Paginations from "../components/search/pagination";
import requests from "@/utils/Request";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MovieData } from "@/types";

const page = ({
  searchParams,
}: {
  searchParams: { search: string; page: string };
}) => {
  const movies = async () => {
    const res = await axios.get(
      `${requests.searchMulti}&query=${
        searchParams.search
      }&include_adult=false&language=en-US&page=${searchParams.page || "1"}`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["search-movies", searchParams.search, searchParams.page],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  // if (isFetching) {
  //   return <div>Loading.....</div>;
  // }

  return (
    <div className="max-w-screen-2xl mx-auto space-y-5 px-5 py-10">
      {data?.results.length ? (
        <div className="grid items-center justify-center space-y-5">
          <h1 className="text-2xl md:text-4xl font-bold capitalize">
            Results for {searchParams.search}
          </h1>

          <MovieSearch />

          <TvSearch />

          <Paginations
            link={`/search?search=${searchParams.search}&`}
            total={data?.total_pages}
          />
        </div>
      ) : (
        <div className="text-3xl font-semibold text-center uppercase">
          not found
        </div>
      )}
    </div>
  );
};

export default page;
