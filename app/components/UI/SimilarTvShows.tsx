"use client";

import { API_KEY } from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TVShowData } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import TvShowCard from "./TvShowCard";

const SimilarTvShow = ({ slug }: { slug: string }) => {
  const movies = async () => {
    const res = await axios.get(`${slug}/similar?api_key=${API_KEY}`);
    return res.data;
  };
  const { data, error, isFetching } = useQuery<TVShowData>({
    queryKey: ["similar-movie", slug],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return null;
  }

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5 max-w-screen-2xl mx-auto px-5">
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
    <div className="my-20 space-y-4 max-w-screen-2xl mx-auto">
      {data?.results.length ? (
        <>
          <h2 className="capitalize text-2xl font-semibold">
            you may also like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-y-10 gap-x-4">
            {data?.results.slice(0, 16).map((item) => (
              <TvShowCard key={item.id} movie={item} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SimilarTvShow;
