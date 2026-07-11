import {
  APIKey,
  fetchData,
  getFeaturedMovieUrl,
  getPopularMoviesUrl,
  getGenresUrl,
  getSearchedMovieUrl,
} from "../services/api.js";
import { generatePoster, showInput, generatePagination } from "../ui/homeUI.js";

import {
  startLoader,
  hideLoader,
  generateMoviesList,
  adjustImage,
  setAutocompletionVisible,
  initVideoModal
} from "../ui/sharedUI.js";

import { getGenres } from "../services/genres.js";

import { state } from "../state.js";

import { initSearch } from "../features/search.js";
import { initProfile } from "../features/profile.js";
import { addToCollection } from "../features/addToCollection.js";
import { listentoMovieCard } from "../features/displayMoviePage.js";

import { displayMovieTrailer } from "../features/displayMovieTrailer.js";

const pagination = document.querySelector(".pagination");

const paginationJumpTo = document.querySelector(".pagination__jump-to");
const jumpToInput = document.querySelector(".jump-to__input");
const hero = document.querySelector(".hero");
const btnAddTolist = document.querySelector(".btn--addToList");

const btnPlay = document.querySelector(".btn--play");

const heroLoader = document.querySelector(".hero .loader-overlay");
const moviesLoader = document.querySelector(".movies__grid .loader-overlay");
const videoLoader = document.querySelector(".video__overlay .loader-overlay");

const goToMovieVideo = () => {
  startLoader(videoLoader);
  displayMovieTrailer(state.featuredMovie.id);
};

const addToList = () => {
  addToCollection(state.featuredMovie, state.actualPage);
};

const getPopularMovies = async () => {
  try {
    const url = getPopularMoviesUrl(state.page);
    const data = await fetchData(url);
    generatePagination(state.page, data);

    state.popularMovies = data;

    generateMoviesList(state.popularMovies, state.genres);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const setPage = (e) => {
  const pageValue = Number(e.target.value);
  const maxValue = Number(jumpToInput.max);
  const minValue = Number(jumpToInput.min);

  if (pageValue >= maxValue) jumpToInput.value = maxValue;
  if (pageValue <= minValue) jumpToInput.value = minValue;

  state.page = pageValue;

  getPopularMovies();

  jumpToInput.value = "";
  jumpToInput.classList.remove("visible");
  paginationJumpTo.classList.remove("hidden");
};

const changePage = (e) => {
  // e.preventDefault();
  if (!e.target.classList.contains("pagination__item")) return;
  const pageID = Number(e.target.dataset.page);

  state.page = pageID;

  getPopularMovies();
};

const drawNumber = (data) => {
  const drawedNumber = Math.floor(Math.random() * data.results.length);
  return drawedNumber;
};

async function controlFunction() {
  try {
    await getGenres();

    hideLoader(videoLoader);

    const url = getFeaturedMovieUrl();
    const data = await fetchData(url);
    const loseIndex = drawNumber(data);
    state.featuredMovie = data.results[loseIndex];
    state.actualPage = "index";
    generatePoster(state.featuredMovie);
    hideLoader(heroLoader);
    hideLoader(moviesLoader);

    getPopularMovies();
  } catch (err) {
    console.error(err);
  }
}

controlFunction();

window.addEventListener("resize", () => adjustImage(hero, state.featuredMovie));
pagination.addEventListener("click", changePage);
paginationJumpTo.addEventListener("click", showInput);
jumpToInput.addEventListener("change", setPage);
btnAddTolist.addEventListener("click", addToList);
btnPlay.addEventListener("click", goToMovieVideo);

initSearch();
listentoMovieCard();
initProfile();
initVideoModal();
