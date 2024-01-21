"use client";

import { MovieData, TVShowData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TvShowCard from "../UI/TvShowCard";

const movies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3${requests.fetchTrendingTv}`
  );
  return res.data;
};
const TvShow = () => {
  const { data, error, isFetching } = useQuery<TVShowData>({
    queryKey: ["tv-show"],
    queryFn: movies,
    staleTime: 5000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-y-10 gap-x-5">
      {data?.results.map((item) => (
        <TvShowCard key={item.id} movie={item} />
      ))}
    </div>
  );
};

export default TvShow;
