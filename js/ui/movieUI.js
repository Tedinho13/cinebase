import { adjustImage } from "./sharedUI.js";

export const renderMovieDetails = (data) => {
  const moviePoster = document.querySelector(".movie-details__image");
  const movieBgcImage = document.querySelector(".movie-details__header");
  const movieLength = document.querySelector(".movie-details__length");
  const movieTitle = document.querySelector(".movie-details__title");
  const movieGenre = document.querySelector(".movie-details__genre");

  const movieStory = document.querySelector(".movie-details__story-text");
  const rateValue = document.querySelector(".rate__value");

  adjustImage(movieBgcImage, data);

  moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  moviePoster.alt = `${data.original_title}`;
  movieLength.textContent = (data.runtime / 60).toFixed(0) + "h";
  movieTitle.textContent = data.original_title;
  movieGenre.textContent = `${data.genres[0].name}  ${data.genres[1]?.name || ""}`;
  movieStory.textContent = data.overview;
  rateValue.textContent = data.vote_average.toFixed(1);
};
