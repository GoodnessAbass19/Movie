"use client";

import { MovieData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../UI/MovieCard";

const movies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3${requests.fetchTrendingMovies}`
  );
  return res.data;
};
const Movies = () => {
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["movies"],
    queryFn: movies,
    staleTime: 50000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-y-10 gap-x-5">
      {data?.results.slice(0, 16).map((item) => (
        <MovieCard key={item.id} movie={item} />
      ))}
    </div>
  );
};

export default Movies;
