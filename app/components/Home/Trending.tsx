import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListBulletIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import Movies from "./Movies";
import TvShow from "./TvShow";
import LatestMovies from "./LatestMovies";
import PopularMovies from "./PopularMovies";
import TopRatedMovies from "./TopRatedMovies";
import UpcomingMovies from "./UpcomingMovies";
import PopularTvShow from "./PopularTvShow";
import LatestTvShow from "./LatestTvShow";
import TopRatedTv from "./TopRatedTv";
import OnAirTvShow from "./OnAirTvShow";

const Trending = () => {
  return (
    <Tabs
      defaultValue="movies"
      className="max-w-screen-2xl mx-auto space-y-10 px-5 pb-10"
    >
      <div className="flex gap-x-10 items-center">
        <span className="text-xl font-semibold capitalize">trending</span>
        <TabsList className="bg-black text-white dark:bg-white dark:text-black">
          <TabsTrigger value="movies">
            <PlayCircleIcon className="w-5 h-5 inline-block" />
            Movies
          </TabsTrigger>
          <TabsTrigger value="tv-show">
            <ListBulletIcon className="w-5 h-5 inline-block" />
            Tv show
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="movies" className="space-y-10">
        <Movies />
        <PopularMovies />
        <LatestMovies />
        <TopRatedMovies />
        <UpcomingMovies />
      </TabsContent>

      <TabsContent value="tv-show" className="space-y-10">
        <TvShow />
        <PopularTvShow />
        <LatestTvShow />
        <TopRatedTv />
        <OnAirTvShow />
      </TabsContent>
    </Tabs>
  );
};

export default Trending;
