import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  const dateString = movie.release_date;
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();

  return (
    <div key={movie.id}>
      <Link
        href={`/movies/${movie.id}-${movie.title}`}
        className="brightness-90 hover:brightness-105"
      >
        <Image
          src={
            imagePath + movie.poster_path || "https://via.placeholder.com/300"
          }
          alt={movie.title}
          width={500}
          height={500}
          className="w-full h-full rounded-md"
          priority
          blurDataURL={
            imagePath + movie.poster_path || "https://via.placeholder.com/300"
          }
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
