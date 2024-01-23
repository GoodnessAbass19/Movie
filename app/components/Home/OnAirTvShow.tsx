"use client";

import { MovieData, TVShowData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TvShowCard from "../UI/TvShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import Link from "next/link";
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

const OnAirTvShow = () => {
  const movies = async () => {
    const res = await axios.get(
      `${requests.fetchOnAirTv}&include_adult=false&language=en-US&page=1`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<TVShowData>({
    queryKey: ["onAir-tv"],
    queryFn: movies,
    staleTime: 5000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-y-10 gap-x-5 max-w-screen-2xl mx-auto">
        {Array(7)
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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-2 capitalize">
          Currently Airing TV Shows
        </h2>

        <Link
          href={"/tv"}
          className="text-lg md:text-xl font-medium capitalize gap-x-1"
        >
          view more
          <ArrowRightIcon className="w-5 h-5 inline-block pl-1" />
        </Link>
      </div>

      <Swiper
        scrollbar={{
          hide: true,
          draggable: true,
          snapOnRelease: true,
          dragSize: 100,
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
            <TvShowCard movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-y-10 gap-x-5">
  {data?.results.map((item) => (
    <TvShowCard key={item.id} movie={item} />
  ))}
</div> */}
    </div>
  );
};

export default OnAirTvShow;
