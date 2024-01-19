import { Movie, TVShow } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TvShowCard = ({ movie }: { movie: TVShow }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div key={movie.id}>
      <Link
        href={`/movies/${movie.id}-${movie.name}`}
        className="brightness-90 hover:brightness-105"
      >
        <Image
          src={imagePath + movie.poster_path}
          alt={movie.name}
          width={500}
          height={300}
          className="w-full h-full rounded-md"
          priority
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