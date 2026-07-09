import { state } from "../state.js";

export function listentoMovieCard() {
  const heroContent = document.querySelector(".hero__content");
  const moviesGrid = document.querySelector(".movies__grid");

  const displayMoviePage = (e) => {
    if (e.target.classList.contains("btn")) return;

    const card =
      e.target.closest(".movie__card") || e.target.closest(".hero__content");

    if (!card) return;
    const movieId = card.id;

    location.href = `movie.html?id=${movieId}`;
    state.latestLocation = location.href;
  };

  heroContent?.addEventListener("click", displayMoviePage);
  moviesGrid.addEventListener("click", displayMoviePage);
}
