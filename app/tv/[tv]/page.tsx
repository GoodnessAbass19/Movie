import Details from "@/app/components/UI/MovieDetails";
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
    </div>
  );
};

export default page;
