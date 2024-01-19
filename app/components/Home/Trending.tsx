import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListBulletIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import Movies from "./Movies";
import TvShow from "./TvShow";

const Trending = () => {
  return (
    <Tabs
      defaultValue="movies"
      className="max-w-screen-2xl mx-auto space-y-5 px-5"
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

      <TabsContent value="movies">
        <Movies />
      </TabsContent>
      <TabsContent value="tv-show">
        <TvShow />
      </TabsContent>
    </Tabs>
  );
};

export default Trending;
