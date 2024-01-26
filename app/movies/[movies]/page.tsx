import MovieDetails from "@/app/components/UI/MovieDetails";
import Similar from "@/app/components/UI/SimilarMovies";

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
      <Similar slug={`https://api.themoviedb.org/3/movie/${slug}`} />
    </div>
  );
};

export default page;
