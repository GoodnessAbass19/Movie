// @ts-nocheck
"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import requests from "@/utils/Request";
import { useEffect, useState } from "react";
import { TVShow } from "@/types";

const Hero = () => {
  const [movie, setMovie] = useState<TVShow>([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);
  console.log(movie);

  return (
    <div className="">
      <header
        className="h-[448px] relative text-white object-contain bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}
      >
        <div className="pt-36 h-48 max-w-screen-2xl mx-auto px-5">
          <h1 className="text-5xl font-bold pb-1.5">
            {movie?.title || movie?.name || movie?.original_name}{" "}
          </h1>

          <div>
            <Link
              href={`/tv/${movie?.id}-${movie?.original_name}`}
              className="cursor-pointer text-white outline-none border-none font-bold rounded px-8 mr-4 pt-2 
               pb-2 hover:text-black hover:bg-[#e6e6e6] transition-all duration-200"
              style={{
                backgroundColor: `rgba(51, 51, 51, 0.5)`,
              }}
            >
              Play
            </Link>
            <button
              className="cursor-pointer text-white outline-none border-none font-bold rounded px-8 mr-4 pt-2 
           pb-2 hover:text-black hover:bg-[#e6e6e6] transition-all duration-200"
              style={{
                backgroundColor: `rgba(51, 51, 51, 0.5)`,
              }}
            >
              My List
            </button>
          </div>

          <h1 className="w-[24rem] leading-snug pt-4 text-sm line-clamp-3">
            {" "}
            {movie?.overview}
          </h1>
        </div>

        <div
          className="h-64"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)",
          }}
        />
      </header>
    </div>
  );
};

export default Hero;
