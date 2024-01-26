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
  const { data, error, isFetching } = useQuery<SingleMovieData>({
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

  return (
    <div>
      TvDetails Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
      tenetur voluptate dolorem ullam distinctio repellendus numquam suscipit!
      Quo quibusdam perferendis molestias doloribus esse saepe culpa itaque
      reiciendis tempore, consequatur quae?
    </div>
  );
};

export default TvDetails;
