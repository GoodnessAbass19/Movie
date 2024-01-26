"use client";

import { useState } from "react";
import { PlayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import requests, { API_KEY } from "@/utils/Request";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SingleMovieData, VideoData } from "@/types";

const Videos = ({ slug }: { slug: string }) => {
  const [trailer, setTrailer] = useState(false);

  const movies = async () => {
    const res = await axios.get(`${slug}/videos?api_key=${API_KEY}`);
    return res.data;
  };
  const { data, error, isFetching } = useQuery<VideoData>({
    queryKey: ["videos", slug],
    queryFn: movies,
    staleTime: 500000, // Keep cached data indefinitely
  });

  if (error) {
    console.log(error);
    return <div>there was an error</div>;
  }

  return (
    <div>
      <button
        onClick={() => setTrailer(!trailer)}
        className="text-lg font-semibold capitalize text-white hover:text-white/75 items-center justify-center flex"
      >
        <PlayIcon className="w-5 h-5 inline-block pr-1" />
        play Trailer
      </button>
      {trailer && (
        // <div className="fixed bg-gray-500/80 w-full min-h-screen top-0 left-0 z-[999]">
        //   <div className="relative justify-center items-center rounded-md p-5 border-md lg:max-w-screen-md md:max-w-screen-lg xl:right-10 xl:max-w-screen-xl mx-auto w-full h-full inset-y-0 xl:top-20 lg:top-20 top-1/4">
        //     <div className="flex justify-between items-center bg-black hover:text-white/80 rounded-t-md xl:mx-[87px] md:mx-2 p-2">
        //       <h2 className="capitalize text-xl font-semibold">play Trailer</h2>
        //       <button onClick={() => setTrailer(false)}>
        //         {" "}
        //         <XMarkIcon className=" md:w-6 md:h-6 h-4 w-4" />{" "}
        //       </button>
        //     </div>
        //     <div className="flex justify-center items-center">
        //       {data?.results
        //         .filter((red) => red.type.includes("Trailer"))
        //         .slice(0, 1)
        //         .map((item) => (
        //           <div key={item.id}>
        //             <iframe
        //               src={`https://www.youtube.com/embed/${item.key}`}
        //               allowFullScreen
        //               //   frameborder="20"
        //               className="rounded-b-md xl:max-w-screen-xl xl:h-[600px] lg:max-w-screen-md lg:h-[400px] md:max-w-screen-md md:h-[400px] max-w-[320px] h-[300px] object-contain aspect-video mx-auto border-2 border-black shadow-lg shadow-black"
        //             />
        //           </div>
        //         ))}
        //     </div>
        //   </div>
        // </div>
        <div className="fixed bg-gray-500/80 w-full min-h-screen flex justify-center items-center h-full top-0 left-0 z-[999]">
          <div className="relative justify-center items-center rounded-md p-5  border-md lg:max-w-screen-md md:max-w-screen-lg xl:max-w-screen-xl max-w-[425px] mx-auto xl:right-10 w-full h-full inset-y-0 xl:top-20 lg:top-20 top-1/4">
            <div className="flex justify-between items-center bg-black hover:text-white/80 rounded-t-md xl:mx-[87px] md:mx-11 p-2">
              <h2 className="capitalize text-xl font-semibold">play Trailer</h2>
              <button onClick={() => setTrailer(false)}>
                {" "}
                <XMarkIcon className=" md:w-6 md:h-6 h-4 w-4" />{" "}
              </button>
            </div>
            <div className="flex justify-center items-center">
              {data?.results
                .filter((red) => red.type.includes("Trailer"))
                .slice(0, 1)
                .map((item) => (
                  <div key={item.id}>
                    <iframe
                      src={`https://www.youtube.com/embed/${item.key}`}
                      allowFullScreen
                      // frameborder="20"
                      className="rounded-b-md xl:max-w-screen-xl xl:h-[600px] lg:max-w-screen-md lg:h-[400px] md:max-w-screen-sm md:h-[400px] max-w-sm h-[300px] object-contain aspect-video mx-auto border-2 border-black shadow-lg shadow-black"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
