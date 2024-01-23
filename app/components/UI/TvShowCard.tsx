import { Movie, TVShow } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TvShowCard = ({ movie }: { movie: TVShow }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";
  const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
      ? `http://image.tmdb.org/t/p/${
          fullSize ? "original" : "w500"
        }/${imagePath}`
      : "https://links.papareact.com/o8z";
  };

  return (
    <div key={movie.id}>
      <Link
        href={`/tv/${movie.id}-${movie.name}`}
        className="brightness-90 hover:brightness-105"
      >
        <Image
          src={getImagePath(movie.poster_path)}
          alt={movie.name}
          width={500}
          height={300}
          className="w-full h-full rounded-md"
          priority
          blurDataURL={getImagePath(movie.poster_path)}
        />
        <h2
          className="text-sm font-medium capitalize 
        line-clamp-1"
        >
          {movie.name}
        </h2>
      </Link>
    </div>
  );
};

export default TvShowCard;
