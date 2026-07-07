const autocompletionList = document.querySelector(".autocompletion__list");
const loaderOverlay = document.querySelector(".loader-overlay");
const loader = document.querySelector(".loader");

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
  console.log(genres);

  moviesGrid.innerHTML = data.results
    .map((movie) => {
      return `<div class="movie__card" id="${movie.id}">
                    <div class="movie__poster">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie poster" class="movie__image">

                        <div class="rate rate--poster">${movie.vote_average.toFixed(1)}</div>
                    </div>
                    <h3 class="movie__title">${movie.original_title}</h3>
                    <p class="movie__info">Data wydania: <span class="movie__date">${movie.release_date}</span> <span class="bull">&bull;</span> <span class="genre">${genres.get(movie.genre_ids[0])}</span></p>
             </div>`;
    })
    .join("");
};
