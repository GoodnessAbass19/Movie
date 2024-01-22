import { useEffect, useRef, useState } from "react";

export type MovieData = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
};

export type TVShowData = {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
};

export type TVShow = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export const useSwiperRef = <T extends HTMLElement>(): [
  T | null,
  React.Ref<T>
] => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);

  return [wrapper, ref];
};
