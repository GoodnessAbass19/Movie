"use client";

import MovieCard from "@/app/components/UI/MovieCard";
import Paginations from "@/app/components/search/pagination";
import { MovieData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10);

  const movies = async () => {
    const res = await axios.get(
      `${
        requests.fetchUpcomingMovies
      }&include_adult=false&language=en-US&page=${
        searchParams.page || 1
      }&release_date.gte={2024-01-01}&release_date.lte=${formattedDate}`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["nowplaying-movies", searchParams.page],
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
              className="animate-pulse lg:h-[180px] h-[150px] col-span-1 sm:col-span-1 lg:col-span-1 bg-[#312e81]"
            />
          ))}
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-10">
      <div className="grid items-center justify-center space-y-10">
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
          Now Playing Movies
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5">
          {data?.results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Paginations total={data?.total_pages} link="/movies/now-playing?" />
      </div>
    </div>
  );
};

export default page;
