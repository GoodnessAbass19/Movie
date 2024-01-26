// @ts-nocheck
"use client";

import { SingleTVShow } from "@/types";
import requests, { API_KEY } from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StarIcon from "./StarIcon";
import Videos from "./Videos";
import Images from "./Images";
import Cast from "./Cast";

const TvDetails = ({ slug }: { slug: string }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const movies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${slug}?api_key=${API_KEY}&append_to_response=images,credits`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<SingleTVShow>({
    queryKey: ["one-tvshow", slug],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return (
      <div className="text-center min-h-screen flex flex-col w-full h-full justify-center items-center">
        there was an error
      </div>
    );
  }
  if (isFetching) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center h-full">
        <span className="capitalize font-semibold text-center">loading...</span>
      </div>
    );
  }

  const inputDates = data?.first_air_date || "";
  const year = inputDates.split("-")[0];
  const inputDate = data?.last_air_date || "";
  const parts = inputDate?.split("-"); // Split the input date by hyphens

  // Rearrange the parts in the desired format
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

  let number = data?.vote_average || 5.0;
  let maximumValue = 10;
  let percentage = (number / maximumValue) * 100;
  percentage = Math.max(1, Math.min(percentage, 100));
  let result = percentage.toFixed(0) + "%";
  const values = data?.genres;
  const concatenatedGenres = values
    ?.map((genre) => (
      <Link
        key={genre.id}
        href={`/movies/filter?genre=${genre.id}`}
        className="text-base font-medium hover:text-white/75"
      >
        {genre.name}
      </Link>
    ))
    .reduce((prev: React.ReactNode, curr: React.ReactNode) => (
      <>
        {prev}
        {"."}
        {curr}
      </>
    ));

  function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${padToTwoDigits(hours)}h ${padToTwoDigits(minutes)}m`;
  }

  function padToTwoDigits(num: number) {
    return num.toString().padStart(2);
  }

  const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
      ? `http://image.tmdb.org/t/p/${
          fullSize ? "original" : "w500"
        }/${imagePath}`
      : "https://links.papareact.com/o8z";
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${imagePath + data?.backdrop_path})` }}
        className="bg-cover bg-right-top bg-no-repeat flex flex-col w-full min-h-[70vh] justify-center items-center text-white"
      >
        <div className=" bg-black/60 w-full min-h-[70vh]"></div>
        <div className="max-w-screen-2xl mx-auto absolute grid grid-rows-3 grid-flow-col gap-5 justify-between items-center mt-20 px-5">
          <div className="row-span-3 relative rounded-md mb-8">
            <div>
              <Images pics={data?.images.posters} />
            </div>
            <Image
              src={imagePath + data?.poster_path}
              width={1000}
              height={1000}
              alt={data?.name || "movie"}
              priority
              className="rounded-md max-w-xs object-cover 2xl:min-h-[550px] xl:min-h-[450px] "
            />
          </div>

          <div className="col-span-2 gap-2.5 grid">
            <h2 className="text-3xl font-extrabold font-sans">
              {data?.name}
              <span className="inline-block text-xl px-1 font-normal">
                ({year})
              </span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <h4 className="text-base font-medium">
                {formattedDate}
                <span>({data?.production_countries[0]?.iso_3166_1})</span>{" "}
                {"  :"}
              </h4>
              <h4 className="text-lg font-semibold flex">
                {concatenatedGenres}
                {"  :"}
              </h4>
              <h4 className="text-xl font-semibold">
                {toHoursAndMinutes(data?.next_episode_to_air?.runtime || 60)}
              </h4>
            </div>

            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-1">
                <div className="bg-black/70 rounded-full w-16 h-16 flex items-center justify-center">
                  <div
                    style={{
                      background: `conic-gradient(#eab308 ${result},rgb(234 179 8 / 0.5) ${result})`,
                    }}
                    className={`w-14 h-14 flex items-center justify-center rounded-full`}
                  >
                    <div className="text-xl  w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:text-cyan-600">
                      <span className="inline-block text-lg text-white">
                        {result}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="inline-block text-lg capitalize font-semibold">
                  viewer's rating
                </span>
              </div>
              <div>
                {result || number > 6.0 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-black outline-black"
                        >
                          <StarIcon className="text-yellow-500 w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rated 5.0</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-black outline-black"
                        >
                          <StarIcon className="text-yellow-500 w-5 h-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rate it</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <Videos slug={`https://api.themoviedb.org/3/tv/${slug}`} />
            </div>

            <p className="text-lg font-normal font-montserrat text-white/80">
              {data?.tagline}{" "}
            </p>
          </div>
          <div className="row-span-2 col-span-2 xl:space-y-5 pb-10">
            <div className="xl:gap-2.5 gap-1.5 grid">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-base font-semibold">{data?.overview}</p>
            </div>

            <div className="flex justify-between items-center flex-wrap">
              {data?.credits.crew.slice(0, 3).map((item) => (
                <div key={item.id} className="text-start">
                  <h3 className="text-base font-semibold">{item.name}</h3>
                  <p className="text-sm font-normal font-montserrat text-white">
                    {item.job}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Cast cast={data?.credits} />

      <div className="bg-white w-full mt-10">
        <h3 className="text-3xl font-semibold text-black text-center">
          <span className="border-b-4 border-blue-800">Production</span>
        </h3>
        <div className="flex flex-wrap justify-center items-center py-5 gap-10">
          {data?.production_companies.map((item) => (
            <div key={item.id}>
              <Image
                src={getImagePath(item.logo_path)}
                alt={item.id}
                width={600}
                height={600}
                className="max-w-[200px] object-contain"
              />
              <p className="text-center p-3 text-black text-xl font-semibold">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
