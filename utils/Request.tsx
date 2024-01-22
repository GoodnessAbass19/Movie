const API_KEY = "a6a239075f2d88a7adbd9adec3b60023";

const requests = {
  fetchLatestMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
  fetchPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  fetchTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  fetchUpcomingMovies: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`,
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTrendingMovies: `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
  searchMovies: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`,
  searchTvShow: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}`,
  fetchTrendingTv: `/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  fetchPopularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,

  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
