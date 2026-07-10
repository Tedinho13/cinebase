import { fetchData, getSearchedMovieUrl } from "../services/api.js";
import {
  generateMoviesList,
  hideLoader,
  cleanGenres,
  highlightGenre,
  clearFilters,
  renderSearchHeader,
} from "../ui/sharedUI.js";
import { renderGenresList, setFiltersVisible } from "../ui/searchedUI.js";

import { getGenres } from "../services/genres.js";

import { state } from "../state.js";

import { initSearch } from "../features/search.js";
import { initProfile } from "../features/profile.js";

import { listentoMovieCard } from "../features/displayMoviePage.js";

const filtersRatingBox = document.querySelector(".filters__select--rating");
const filtersGenre = document.querySelector(".filters__select--genre");
const filterYearInput = document.querySelector(".year__input");
const filterYearSelected = document.querySelector(".year__selected");
const filterBtnReset = document.querySelector(".filters__reset-btn");

const moviesLoader = document.querySelector(".movies__grid .loader-overlay");

const getQueryFromAdress = () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");
  return query;
};

const resetFilters = () => {
  state.filters = {
    genre: null,
    year: null,
    rating: null,
  };

  applyFilters();
  callRenderFunctions(state);
  clearFilters();
};

const setFiltersVisibility = (hideFiltersSection, data) => {
  const basingData = data?.results || data;

  if (hideFiltersSection) {
    basingData.length >= 5 ? setFiltersVisible(true) : setFiltersVisible(false);
  }
};

const applyFilters = () => {
  let movies = [...state.searchedMovies.results];

  if (state.filters.genre !== null) {
    movies = movies.filter((movie) =>
      movie.genre_ids.includes(state.filters.genre),
    );
  }

  if (state.filters.year !== null) {
    movies = movies.filter(
      (movie) => Number(movie.release_date.slice(0, 4)) >= state.filters.year,
    );
  }

  if (state.filters.rating !== null) {
    movies = movies.filter(
      (movie) => movie.vote_average >= state.filters.rating,
    );
  }

  state.filteredMovies = movies;

  callRenderFunctions(state);
};

const callRenderFunctions = (state) => {
  setFiltersVisibility(state.filtersVisible, state.filteredMovies);

  renderSearchHeader(state);
  generateMoviesList(state.filteredMovies, state.genres);
};

const selectYear = (e) => {
  const year = Number(e.target.value);

  filterYearSelected.textContent = year;

  state.filters.year = year;
  state.filtersVisible = false;
  applyFilters();
};

const selectGenre = (e) => {
  if (!e.target.classList.contains("genre__item")) return;

  const genreID =
    e.target.classList.contains("active") ?
      null
    : Number(e.target.dataset.genreid);

  highlightGenre(e.target);

  state.filters.genre = genreID;
  state.filtersVisible = false;

  applyFilters();
};

const changeFilter = () => {
  const checked = document.querySelector('input[name="rating"]:checked');

  state.filters.rating = Number(checked.value);
  state.filtersVisible = false;
  applyFilters();
};

async function controlFunction() {
  const query = getQueryFromAdress();
  const url = getSearchedMovieUrl(query);
  const data = await fetchData(url);

  state.searchedMovies = data;
  state.filteredMovies = data;
  state.query = query;
  state.filtersVisible = true;
  state.showSearchHeader = true;
  state.page = "searched";

  await getGenres();

  hideLoader(moviesLoader);

  renderGenresList(state.genres);

  callRenderFunctions(state);
}

controlFunction();

initSearch();
listentoMovieCard();
initProfile();

filtersRatingBox.addEventListener("change", changeFilter);
filtersGenre.addEventListener("click", selectGenre);
filterYearInput.addEventListener("input", selectYear);
filterBtnReset.addEventListener("click", resetFilters);
