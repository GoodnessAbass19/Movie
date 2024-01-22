"use client";

import { MovieData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../UI/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

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
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        Loading.....
      </div>
    );
  }

  return (
    <>
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
        // grabCursor={true}
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
    </>
  );
};

export default Movies;
