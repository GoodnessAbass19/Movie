"use client";

import { MovieData, genres } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import MovieCard from "./MovieCard";
import Paginations from "../search/pagination";
import { CheckboxReactHookFormMultiple } from "../layouts/Filter";

const MovieFilter = () => {
  const page = useSearchParams();
  const note = page.get("page");
  const genre = page.get("genre");
  const movies = async () => {
    const res = await axios.get(
      `${requests.fetchFilterMovies}&include_adult=false&language=en-US&page=${
        note || "1"
      }&with_genres=${genre}`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["movies-filter", note, genre],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5 max-w-screen-2xl mx-auto">
        {Array(20)
          .fill(1)
          .map((item, idx) => (
            <div
              key={idx}
              className="animate-pulse lg:h-[300px] h-[300px] col-span-1 sm:col-span-1 lg:col-span-1 bg-[#312e81]"
            />
          ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid items-center justify-center space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold capitalize">
            Filter result
          </h1>
          <CheckboxReactHookFormMultiple genres={genres} link="/movies" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5">
          {data?.results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Paginations
          total={data?.total_pages}
          link={`/movies?genre=${genre}&`}
        />
      </div>
    </div>
  );
};

export default MovieFilter;
