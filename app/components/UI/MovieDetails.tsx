"use client";

import { SingleMovieData } from "@/types";
import requests, { API_KEY } from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const MovieDetails = ({ slug }: { slug: string }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const movies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}?api_key=${API_KEY}&append_to_response=images`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<SingleMovieData>({
    queryKey: ["one-movie", slug],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });
  console.log(data);

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  let number = data?.vote_average || 50;
  let maximumValue = 10;
  let percentage = (number / maximumValue) * 100;
  percentage = Math.max(1, Math.min(percentage, 100));
  let result = percentage.toFixed(0) + "%";

  return (
    <div>
      {" "}
      <div
        style={{ backgroundImage: `url(${imagePath + data?.backdrop_path})` }}
        className="bg-cover bg-right-top bg-no-repeat flex flex-col w-full min-h-[70vh] space-y-20 justify-center items-center"
      >
        <div className=" bg-black/30 w-full min-h-[70vh]"></div>
        <Image
          src={imagePath + data?.poster_path}
          width={300}
          height={450}
          alt={data?.title || "movie"}
          priority
          className="rounded-md max-w-xs object-cover 2xl:min-h-[550px] xl:min-h-[450px] "
        />

        <div
          style={{
            background: `conic-gradient(#f59e0b ${result},#030712 ${result})`,
          }}
          className="w-16 h-16 flex items-center justify-center rounded-full"
        >
          <div className="text-xl  w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center group-hover:text-cyan-600">
            <span className="inline-block text-lg">{result}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
