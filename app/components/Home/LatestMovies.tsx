"use client";

import { MovieData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import MovieCard from "../UI/MovieCard";
import Link from "next/link";
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

const LatestMovies = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const movies = async () => {
    const res = await axios.get(
      `${requests.fetchLatestMovies}&include_adult=false&language=en-US&page=${page}`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["latest-movies", page],
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
        {Array(7)
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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-2 capitalize">Upcoming Movies</h2>

        <Link
          href={"/movies/upcoming"}
          className="text-lg md:text-xl font-medium capitalize gap-x-1"
        >
          view more
          <ArrowRightIcon className="w-5 h-5 inline-block pl-1" />
        </Link>
      </div>
      <Swiper
        scrollbar={{
          draggable: true,
          snapOnRelease: true,
          dragSize: 100,
          hide: true,
        }}
        slidesPerView={2.5}
        spaceBetween={20}
        breakpoints={{
          1024: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          912: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        freeMode={true}
        keyboard={{
          enabled: true,
        }}
        grabCursor={true}
        modules={[Scrollbar, FreeMode]}
        className="mx-auto md:py-10 py-5 mySwiper"
      >
        {data?.results.map((item) => (
          <SwiperSlide key={item.id} className="mb-5">
            <MovieCard key={item.id} movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-y-10 gap-x-5">
        {data?.results.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div> */}
    </div>
  );
};

export default LatestMovies;
