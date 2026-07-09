export const setFiltersVisible = (show) => {
  const filters = document.querySelector(".filters");
  filters.classList.toggle("hidden", !show);
};

export const renderSearchHeader = (state) => {
  console.log(state);

  const { filteredMovies: data, query, filters } = state;

  const movieQuerySpan = document.querySelector(".movie__query");
  const matchedMovies = document.querySelector(".movies__search-matches");
  const moviesTitle = document.querySelector(".movies__title");

  const basingData = data?.results || data;

  matchedMovies.textContent = basingData.length;

  let searchDetails = "";

  if (filters.genre !== null) {
    searchDetails += `<span class="description-label"> genre</span> ${state.genres.get(filters.genre)}`;
  }
  if (filters.year !== null) {
    searchDetails += `<span class="description-label"> from year</span> ${filters.year}`;
  }
  if (filters.rating !== null) {
    searchDetails += `<span class="description-label"> rate from</span> ${filters.rating}`;
  }

  if (basingData.length === 0) {
    return (moviesTitle.innerHTML =
      'Nothing was founded <span class="movie__query"></span>');
  } else {
    moviesTitle.innerHTML = `Searched results for <span class="movie__query">"${query}" ${searchDetails}</span>`;
  }
};

export const renderGenresList = (genres) => {
  const filtersGenre = document.querySelector(".filters__select--genre");

  const genresArray = [...genres];
  console.log(genresArray);

  filtersGenre.innerHTML = genresArray
    .map(
      (genre) =>
        `<li data-genreid="${genre[0]}" class="genre__item">${genre[1]}</li>`,
    )
    .join("");

  // console.log(genres);
};

const cleanGenres = () => {
  const genresItems = document.querySelectorAll(".genres__items");

  genresItems.forEach((genreItem) => genreItem.classList.remove("active"));
};

export const highlightGenre = (genre) => {
  cleanGenres();

  genre.classList.toggle("active");
};

export const clearFilters = () => {
  const ratingRadios = document.querySelectorAll(".rating__radio");
  const filterYearSelected = document.querySelector(".year__selected");
  const filterYearInput = document.querySelector(".year__input");

  ratingRadios.forEach((ratingRadio) => (ratingRadio.checked = ""));

  cleanGenres();

  filterYearInput.value = 1998;
  filterYearSelected.value = 1998;
};
