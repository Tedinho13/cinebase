const autocompletionList = document.querySelector(".autocompletion__list");
const loaderOverlay = document.querySelector(".loader-overlay");
const loader = document.querySelector(".loader");

const moviesTitle = document.querySelector(".movies__title");

const moviesGrid = document.querySelector(".movies__grid");

export function adjustImage(element, data) {
  const imageWidth = window.innerWidth >= 1024 ? 1280 : 500;
  element.style.backgroundImage = `url("https://image.tmdb.org/t/p/w${imageWidth}${data.backdrop_path}")`;
}

export function setAutocompletionVisible(show) {
  autocompletionList.classList.toggle("hidden", !show);
}

export const startLoader = () => {
  loaderOverlay.classList.remove("hidden");
  loader.classList.remove("off");
};

export const hideLoader = () => {
  loaderOverlay.classList.add("hidden");
  loader.classList.add("off");
};

export function renderAutocompletionData(data) {
  const slicedData = data.results.slice(0, 5);
  autocompletionList.innerHTML = slicedData
    .map((movie) => {
      return `<li data-title="${movie.original_title}" class="autocompletion__item">${movie.original_title}</li>`;
    })
    .join("");
}

export const generateMoviesList = (data, genres) => {
  const dataToRender = data?.results || data;

  moviesGrid.innerHTML = dataToRender
    .map((movie) => {
      const imagePath =
        movie.poster_path ?
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "img/no-cover.webp";

      const movieRate =
        movie.vote_average === 0 ? "Brak" : movie.vote_average.toFixed(1);

      const genresNames =
        movie.genre_ids ?
          genres.get(movie?.genre_ids[0])
        : movie.genres[0].name;

      return `<div class="movie__card" id="${movie.id}">
                    <div class="movie__poster">
                        <img src="${imagePath}" alt="movie poster" class="movie__image">

                        <div class="rate rate--poster">${movieRate}</div>
                    </div>
                    <h3 class="movie__title">${movie.original_title}</h3>
                    <p class="movie__info">Data wydania: <span class="movie__date">${movie.release_date}</span> <span class="bull">&bull;</span> <span class="genre">${genresNames || "Brak gatunku"}</span></p>
             </div>`;
    })
    .join("");
};

export const updateCollectionButton = (btnState, actualPage) => {
  const btnAddTolist = document.querySelector(".btn--addToList");
  if (actualPage === "index") {
    btnAddTolist.textContent =
      btnState === "added" ? `Added to List` : `+ My List`;
  } else if (actualPage === "movie") {
    btnAddTolist.innerHTML =
      btnState === "added" ?
        `<svg
          class="btn__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#e3e3e3"
        >
          <path d="M200-440v-80h560v80H200Z" />
        </svg>`
      : `<svg
          class="btn__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>`;
  }
};

export const renderSearchHeader = (state) => {
  console.log(state);

  const { filteredMovies: data, query, filters } = state;

  const movieQuerySpan = document.querySelector(".movie__query");
  const moviesSearchDescription = document.querySelector(
    ".movies__search-description",
  );
  const matchedMovies = document.querySelector(".movies__search-matches");
  const moviesTitle = document.querySelector(".movies__title");

  const basingData = data?.results || data;

  moviesSearchDescription.innerHTML =
    basingData.length > 0 ?
      ""
    : `Founded <span class="movie__query">${basingData.length}</span> matches`;

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
    moviesTitle.innerHTML =
      state.showSearchHeader ?
        `Searched results for <span class="movie__query">${query} ${searchDetails}</span>`
      : "";
  }
};

export const updateCollectionNumberSpan = () => {
  const moviesLengthSpan = document.querySelector(".favourite-movies__length");

  moviesLengthSpan.textContent =
    JSON.parse(localStorage.getItem("collection"))?.length || 0;
};

export const cleanGenres = () => {
  console.log("wykonuje się");

  const genresItems = document.querySelectorAll(".genre__item");

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
  filterYearSelected.textContent = 1998;
};
