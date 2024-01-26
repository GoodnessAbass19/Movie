"use client";
import Image from "next/image";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import { credits } from "@/types";

const Cast = ({ cast }: { cast: credits }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
      ? `http://image.tmdb.org/t/p/${
          fullSize ? "original" : "w500"
        }/${imagePath}`
      : "https://links.papareact.com/o8z";
  };

  return (
    <div className="w-full mt-20 max-w-screen-2xl md:mx-auto px-5">
      <h2 className="text-2xl capitalize font-semibold">Top billed cast</h2>
      <Swiper
        scrollbar={{ draggable: true, snapOnRelease: true }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          1024: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          912: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        freeMode={true}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        modules={[Scrollbar, FreeMode]}
        className="max-w-screen-2xl mx-auto md:py-10 py-5 mySwiper mt-5"
      >
        {cast.cast.slice(0, 14).map((item) => (
          <SwiperSlide
            key={item.id}
            className="rounded-md dark:bg-white bg-black items-center dark:text-black text-white mb-5 max-h-[300px]"
          >
            <div>
              <Image
                src={getImagePath(item?.profile_path || "")}
                width={500}
                height={500}
                priority
                alt={item.name}
                className="w-full h-[200px] object-cover"
              />
              <div className="text-start h-[100px] p-2">
                <h4 className="text-base font-semibold">{item.name}</h4>
                <p className="text-sm p-1.5 inline-block font-semibold">
                  {item.character}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cast;
