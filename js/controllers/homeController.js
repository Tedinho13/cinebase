import {
  APIKey,
  fetchData,
  getFeaturedMovieUrl,
  getPopularMoviesUrl,
  getGenresUrl,
  getSearchedMovieUrl,
} from "../api.js";
import { generatePoster, showInput, generatePagination } from "../ui/homeUI.js";

import {
  startLoader,
  hideLoader,
  renderAutocompletionData,
  generateMoviesList,
} from "../ui/sharedUI.js";

import { getGenres } from "../services/genres.js";

import { state } from "../state.js";

import { adjustImage, setAutocompletionVisible } from "../ui/sharedUI.js";

const pagination = document.querySelector(".pagination");

const paginationJumpTo = document.querySelector(".pagination__jump-to");
const jumpToInput = document.querySelector(".jump-to__input");
const hero = document.querySelector(".hero");
const moviesGrid = document.querySelector(".movies__grid");
const heroContent = document.querySelector(".hero__content");

const searchForm = document.querySelector(".nav__search");
const searchInput = document.querySelector(".nav__search-input");
const autocompletionList = document.querySelector(".autocompletion__list");

const searchMovie = () => {
  setAutocompletionVisible(false);
  location.href = `searched.html?query=${encodeURIComponent(searchInput.value)}`;

  searchInput.value = "";
};

const changeInputValue = (e) => {
  if (!e.target.classList.contains("autocompletion__item")) return;

  searchInput.value = e.target.dataset.title;

  setAutocompletionVisible(false);

  searchMovie();
};

const showAutocompletion = (e) => {
  e.preventDefault();

  const query = searchInput.value;
  if (query !== searchInput.value) return;

  if (!query) return setAutocompletionVisible(false);

  clearTimeout(state.timeoutID);

  state.timeoutID = setTimeout(async () => {
    const url = getSearchedMovieUrl(query);
    const data = await fetchData(url);
    renderAutocompletionData(data);
  }, 300);

  setAutocompletionVisible(true);
};

const displayMoviePage = (e) => {
  const card =
    e.target.closest(".movie__card") || e.target.closest(".hero__content");

  if (!card) return;
  const movieId = card.id;

  location.href = `movie.html?id=${movieId}`;
  state.latestLocation = location.href;
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
  console.log(pageID);

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

    const url = getFeaturedMovieUrl();
    const data = await fetchData(url);
    const loseIndex = drawNumber(data);
    state.featuredMovie = data.results[loseIndex];
    generatePoster(state.featuredMovie);
    hideLoader();

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
moviesGrid.addEventListener("click", displayMoviePage);
heroContent.addEventListener("click", displayMoviePage);
// EVENTY INPUTOWE
searchInput.addEventListener("input", showAutocompletion);
autocompletionList.addEventListener("click", changeInputValue);
searchForm.addEventListener("submit", function () {
  e.preventDefault();
  searchMovie();
});
