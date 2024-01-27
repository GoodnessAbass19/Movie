"use client";

import { TVShowData, TvGenre } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Paginations from "../components/search/pagination";
import TvShowCard from "../components/UI/TvShowCard";
import { CheckboxReactHookFormMultiple } from "../components/layouts/Filter";

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  const movies = async () => {
    const res = await axios.get(
      `${requests.fetchPopularTv}&include_adult=false&language=en-US&page=${
        searchParams.page || 1
      }`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<TVShowData>({
    queryKey: ["popular-tv-shows", searchParams.page],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  if (isFetching) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5 max-w-screen-2xl mx-auto py-10 px-5">
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
    <div className="max-w-screen-2xl mx-auto px-5 py-10">
      <div className="grid items-center justify-center space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl font-bold capitalize">
            Popular TV shows
          </h1>
          <CheckboxReactHookFormMultiple genres={TvGenre} link="/tv" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-5">
          {data?.results.map((item) => (
            <TvShowCard key={item.id} movie={item} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Paginations total={data?.total_pages} link="/tv?" />
      </div>
    </div>
  );
};

export default page;
