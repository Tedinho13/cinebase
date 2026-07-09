export const APIKey = "d9015825ca742861f8f4018f68052570";

export async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function getFeaturedMovieUrl() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKey}`;

  return url;
}

export function getPopularMoviesUrl(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=${page}`;
  return url;
}

export function getGenresUrl() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en-US`;
  return url;
}

export function getMovieUrl(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US`;
  return url;
}

export function getSearchedMovieUrl(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${query}&language=en-US`;
  return url;
}