import { fetchData, getSearchedMovieUrl } from "../api.js";
import { generateMoviesList } from "../ui/sharedUI.js";

import { getGenres } from "../services/genres.js";

import { state } from "../state.js";

const getQueryFromAdress = () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");
  return query;
};

async function controlFunction() {
  const query = getQueryFromAdress();
  const url = getSearchedMovieUrl(query);
  const data = await fetchData(url);

  console.log(data);

  state.searchedMovies = data;

  await getGenres();

  generateMoviesList(state.searchedMovies, state.genres);
}

controlFunction();
