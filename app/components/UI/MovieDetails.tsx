"use client";

import { SingleMovieData } from "@/types";
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

const MovieDetails = ({ slug }: { slug: string }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const movies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}?api_key=${API_KEY}&append_to_response=images`
    );
    return res.data;
  };
  const { data, error, isFetching } = useQuery<SingleMovieData>({
    queryKey: ["one-movie", slug],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }
  const inputDates = data?.release_date || "";
  const year = inputDates.split("-")[0];
  const inputDate = data?.release_date || "";
  const parts = inputDate?.split("-"); // Split the input date by hyphens

  // Rearrange the parts in the desired format
  const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

  let number = data?.vote_average || 50;
  let maximumValue = 10;
  let percentage = (number / maximumValue) * 100;
  percentage = Math.max(1, Math.min(percentage, 100));
  let result = percentage.toFixed(0) + "%";
  const values = data?.genres;
  const concatenatedGenres = values
    ?.map((genre) => (
      <Link key={genre.id} href={`/movies/filter?genre=${genre.id}`}>
        {genre.name}
      </Link>
    ))
    .reduce((prev: React.ReactNode, curr: React.ReactNode) => (
      <>
        {prev}
        {","}
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

  return (
    <div>
      {" "}
      <div
        style={{ backgroundImage: `url(${imagePath + data?.backdrop_path})` }}
        className="bg-cover bg-right-top bg-no-repeat flex flex-col w-full min-h-[70vh] justify-center items-center"
      >
        <div className=" bg-black/30 w-full min-h-[70vh]"></div>
        <div className="max-w-screen-2xl mx-auto absolute grid grid-rows-3 grid-flow-col gap-5 justify-between items-center mt-20 px-5">
          <div className="row-span-3 relative rounded-md mb-8">
            <div>{/* <Images pics={data?.images.posters} /> */}</div>
            <Image
              src={imagePath + data?.poster_path}
              width={1000}
              height={1000}
              alt={data?.title || "movie"}
              priority
              className="rounded-md max-w-xs object-cover 2xl:min-h-[550px] xl:min-h-[450px] "
            />
          </div>

          <div className="col-span-2 gap-2.5 grid">
            <h2 className="text-3xl font-extrabold font-sans">
              {data?.title}
              <span className="inline-block text-xl px-1 font-normal">
                ({year})
              </span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <h4 className="text-base font-medium">
                {formattedDate}
                <span>({data?.production_countries[0].iso_3166_1})</span>{" "}
                {"  :"}
              </h4>
              <h4 className="text-lg font-semibold flex">
                {/* {data?.genres.slice(0, 3).map((item, i) => (
                  <div key={i}>
                    <h4 className="after:content-[',']">{item.name}</h4>
                  </div>
                ))}
                {/* {data?.genres[2].name} */}

                {concatenatedGenres}
                {" :"}
              </h4>
              <h4 className="text-lg font-semibold">
                {toHoursAndMinutes(data?.runtime || 60)}
              </h4>
            </div>
            <p className="text-xl font-normal font-montserrat text-white">
              {data?.tagline}{" "}
            </p>

            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-1">
                <div className="bg-black/70 rounded-full w-16 h-16 flex items-center justify-center">
                  <div
                    style={{
                      background: `conic-gradient(#eab308 ${result},#a3a3a3 ${result})`,
                    }}
                    className="w-14 h-14 flex items-center justify-center rounded-full"
                  >
                    <div className="text-xl  w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center group-hover:text-cyan-600">
                      <span className="inline-block text-lg text-white">
                        {result}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="inline-block text-lg capitalize font-semibold">
                  user's rating
                </span>
              </div>
              <div>
                {result || number > 6.0 ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">
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
                        <Button variant="outline">
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
              {/* <Video movies={films} /> */}
              <h3 className="bg-green-500 font-semibold text-white rounded-md p-1.5">
                {data?.status}
              </h3>
              <button className="text-xl font-semibold capitalize bg-green-500 p-2 text-white rounded-md">
                <Link href={`https://www.imdb.com/title/${data?.imdb_id}`}>
                  check on imdb
                </Link>
              </button>
            </div>
          </div>
          <div className="row-span-2 col-span-2 xl:space-y-5 pb-10">
            <div className="xl:gap-2.5 gap-1.5 grid">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-base font-semibold">{data?.overview}</p>
            </div>
            {/* <div className="flex justify-between items-center flex-wrap">
              {req.cast.slice(0, 3).map((item) => (
                <div key={item.id}>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg font-normal font-montserrat text-gray-400">
                    character
                  </p>
                </div>
              ))}
            </div> */}
            {/* <div className="flex justify-between items-center flex-wrap">
              {req.crew.slice(0, 3).map((item) => (
                <div key={item.id}>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg font-normal font-montserrat text-gray-400">
                    {item.job}
                  </p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
