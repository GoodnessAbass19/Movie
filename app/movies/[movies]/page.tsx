import MovieDetails from "@/app/components/UI/MovieDetails";
import React from "react";

type Props = {
  params: {
    movies: string;
  };
};

const page = ({ params }: Props) => {
  const slug = params.movies;
  return (
    <div>
      <MovieDetails slug={slug} />
    </div>
  );
};

export default page;
