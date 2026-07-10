export const setFiltersVisible = (show) => {
  const filters = document.querySelector(".filters");
  filters.classList.toggle("hidden", !show);
};

export const renderGenresList = (genres) => {
  const filtersGenre = document.querySelector(".filters__select--genre");

  const genresArray = [...genres];

  filtersGenre.innerHTML = genresArray
    .map(
      (genre) =>
        `<li data-genreid="${genre[0]}" class="genre__item">${genre[1]}</li>`,
    )
    .join("");
};


