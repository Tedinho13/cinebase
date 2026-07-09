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
  console.log(data);

  const dataToRender = data?.results || data;

  moviesGrid.innerHTML = dataToRender
    .map((movie) => {
      const imagePath =
        movie.poster_path ?
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "img/no-cover.webp";

      const movieRate =
        movie.vote_average === 0 ? "Brak" : movie.vote_average.toFixed(1);

      return `<div class="movie__card" id="${movie.id}">
                    <div class="movie__poster">
                        <img src="${imagePath}" alt="movie poster" class="movie__image">

                        <div class="rate rate--poster">${movieRate}</div>
                    </div>
                    <h3 class="movie__title">${movie.original_title}</h3>
                    <p class="movie__info">Data wydania: <span class="movie__date">${movie.release_date}</span> <span class="bull">&bull;</span> <span class="genre">${genres.get(movie?.genre_ids[0]) || "Brak gatunku"}</span></p>
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
        </svg>`
  }
};
