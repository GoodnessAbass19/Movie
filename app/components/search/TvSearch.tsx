"use client";

import { MovieData, TVShowData } from "@/types";
import requests from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const TvSearch = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page") || "1";
  const movies = async () => {
    const res = await axios.get(
      `${requests.searchTvShow}&query=${search}&include_adult=false&language=en-US&page=${page}`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<TVShowData>({
    queryKey: ["search-tvshow", search, page],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  // if (isFetching) {
  //   return <div>Loading.....</div>;
  // }

  const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
      ? `http://image.tmdb.org/t/p/${
          fullSize ? "original" : "w500"
        }/${imagePath}`
      : "https://links.papareact.com/o8z";
  };

  return (
    <div className="grid gap-y-5">
      {/* <h2 className="text-xl font-bold py-2 capitalize">Tv shows</h2> */}

      <div className="grid gap-y-10 gap-x-5 ">
        {data?.results.map((item) => (
          <div key={item.id} className="flex items-center gap-x-5">
            <Link
              href={`/tv/${item.id}-${item.name}`}
              className="flex-shrink-0 relative cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-black/80 z-10" />

              <p className="absolute z-20 bottom-5 left-5">{item.name}</p>
              <Image
                className="w-fit min-w-[400px] lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
                src={getImagePath(item.backdrop_path || item.poster_path)}
                alt={item.name}
                width={1920}
                height={1080}
                key={item.id}
              />
            </Link>

            <div className="max-w-2xl hidden md:block">
              <p className="font-bold">
                {item.name} ({item.first_air_date?.split("-")[0]})
              </p>
              <hr className="mb-3" />
              <p className="line-clamp-4">{item.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvSearch;
