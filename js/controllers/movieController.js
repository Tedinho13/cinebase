import { fetchData, getMovieUrl } from "../services/api.js";
import { renderMovieDetails } from "../ui/movieUI.js";
import { startLoader, hideLoader } from "../ui/sharedUI.js";
import { state } from "../state.js";

import { initSearch } from "../features/search.js";
import { initProfile } from "../features/profile.js";

import { addToCollection } from "../features/addToCollection.js";

const btnAddTolist = document.querySelector(".btn--addToList");

const addToList = () => {
  addToCollection(state.actualMovie, state.actualPage);
};

const getMovieID = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
};

async function controlFunction() {
  startLoader();
  const id = getMovieID();
  const url = getMovieUrl(id);

  const data = await fetchData(url);
  state.actualMovie = data;
  state.actualPage = "movie";
  hideLoader();
  renderMovieDetails(state.actualMovie);

  console.log(state);
}

controlFunction();

window.addEventListener("resize", () => renderMovieDetails(state.actualMovie));
btnAddTolist.addEventListener("click", addToList);

initSearch();
initProfile();
