"use client";

import { MovieData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import MovieCard from "../UI/MovieCard";
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const PopularMovies = () => {
  const movies = async () => {
    const res = await axios.get(
      `${requests.fetchPopularMovies}&include_adult=false&language=en-US&page=1`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["popular-movies"],
    queryFn: movies,
    staleTime: 5000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return null;
  }
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-2 capitalize">popular Movies</h2>

        <Link
          href={"/movies"}
          className="text-lg md:text-xl font-medium capitalize gap-x-1"
        >
          view more
          <ArrowRightIcon className="w-5 h-5 inline-block pl-1" />{" "}
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

export default PopularMovies;
