import SimilarTvShow from "@/app/components/UI/SimilarTvShows";
import TvDetails from "@/app/components/UI/TvDetails";

type Props = {
  params: {
    tv: string;
  };
};

const page = ({ params }: Props) => {
  const slug = params.tv;

  return (
    <div>
      <TvDetails slug={slug} />
      <SimilarTvShow slug={`https://api.themoviedb.org/3/tv/${slug}`} />
    </div>
  );
};

export default page;
