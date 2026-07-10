import { fetchData, getMovieUrl } from "../services/api.js";
import { renderMovieDetails } from "../ui/movieUI.js";
import { startLoader, hideLoader } from "../ui/sharedUI.js";
import { state } from "../state.js";

import { initSearch } from "../features/search.js";
import { initProfile } from "../features/profile.js";

import { addToCollection } from "../features/addToCollection.js";

import { displayMovieTrailer } from "../features/displayMovieTrailer.js";

const btnAddTolist = document.querySelector(".btn--addToList");
const btnPlay = document.querySelector(".btn--play");
const movieLoader = document.querySelector(".movie-details .loader-overlay");
const videoLoader = document.querySelector(".video__overlay .loader-overlay");

const goToMovieVideo = () => {
  startLoader(videoLoader);
  displayMovieTrailer(state.actualMovie.id);
};

const addToList = () => {
  addToCollection(state.actualMovie, state.actualPage);
};

const getMovieID = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
};

async function controlFunction() {
  const id = getMovieID();
  const url = getMovieUrl(id);

  const data = await fetchData(url);

  state.actualMovie = data;
  state.actualPage = "movie";
  hideLoader(movieLoader);

  renderMovieDetails(state.actualMovie);
}

controlFunction();

window.addEventListener("resize", () => renderMovieDetails(state.actualMovie));
btnAddTolist.addEventListener("click", addToList);
btnPlay.addEventListener("click", goToMovieVideo);

initSearch();
initProfile();
