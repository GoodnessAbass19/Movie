import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  const dateString = movie.release_date;
  const dateObject = new Date(dateString);

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
        href={`/movies/${movie.id}-${movie.title}`}
        className="brightness-90 hover:brightness-105"
      >
        <Image
          src={getImagePath(movie.poster_path)}
          alt={movie.title}
          width={500}
          height={500}
          className="w-full h-full rounded-md"
          priority
          blurDataURL={getImagePath(movie.poster_path)}
        />
        <h2
          className="text-sm font-medium capitalize 
        line-clamp-1"
        >
          {movie.title}
        </h2>
        {/* <span className="text-sm">{year}</span> */}
      </Link>
    </div>
  );
};

export default MovieCard;
