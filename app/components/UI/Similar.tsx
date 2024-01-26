"use client";

import { API_KEY } from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MovieData } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import MovieCard from "./MovieCard";

const Similar = ({ slug }: { slug: string }) => {
  const movies = async () => {
    const res = await axios.get(`${slug}/similar?api_key=${API_KEY}`);
    return res.data;
  };
  const { data, error, isFetching } = useQuery<MovieData>({
    queryKey: ["similar", slug],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return null;
  }

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5 max-w-screen-2xl mx-auto">
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
    <div className="my-20 space-y-4 max-w-screen-2xl mx-auto">
      <h2 className="capitalize text-2xl font-semibold">you may also like</h2>
      <Swiper
        scrollbar={{
          draggable: true,
          snapOnRelease: true,
          dragSize: 100,
          hide: false,
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

      {/* <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-y-10 gap-x-4">
        {data?.results.slice(0, 14).map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div> */}
    </div>
  );
};

export default Similar;
