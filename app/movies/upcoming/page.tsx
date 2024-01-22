"use client";

import MovieCard from "@/app/components/UI/MovieCard";
import Paginations from "@/app/components/search/pagination";
import { MovieData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  const movies = async () => {
    const res = await axios.get(
      `${requests.fetchLatestMovies}&include_adult=false&language=en-US&page=${
        searchParams.page || 1
      }`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["upcoming", searchParams.page],
    queryFn: movies,
    staleTime: 5000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        Loading.....
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-10">
      <div className="grid items-center justify-center space-y-10">
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
          latest Movies
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-y-10 gap-x-5">
          {data?.results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Paginations total={data?.total_pages} link="/movies/upcoming?" />
      </div>
    </div>
  );
};

export default page;
