const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const GENRE_IDS = {
  Action: 28,
  Comedy: 35,
  Horror: 27,
  Animation: 16,
  Documentary: 99,
  Romance: 10749,
  SciFi: 878,
  Thriller: 53
};

export const fetchTMDB = async (endpoint: string, params: string = "") => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&${params}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
};

export const getTrendingMovies = async (page = 1) => {
  const data = await fetchTMDB("/trending/movie/day", `page=${page}`);
  return data?.results || [];
};

export const getPopularTVSeries = async (page = 1) => {
  const data = await fetchTMDB("/tv/popular", `page=${page}`);
  return data?.results || [];
};

export const getByGenre = async (genreId: number, page = 1) => {
  const data = await fetchTMDB("/discover/movie", `with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
  return data?.results || [];
};

export const getMovieDetails = async (id: string, type: "movie" | "tv") => {
  return await fetchTMDB(`/${type}/${id}`, "append_to_response=videos,credits,recommendations");
};

export const getTVShowEpisodes = async (id: string, season: number) => {
  return await fetchTMDB(`/tv/${id}/season/${season}`);
};

export const searchMovies = async (query: string) => {
  const data = await fetchTMDB("/search/multi", `query=${encodeURIComponent(query)}`);
  return data?.results || [];
};

export const getImageUrl = (path: string) => {
  return path ? `https://image.tmdb.org/t/p/original${path}` : "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2000";
};
