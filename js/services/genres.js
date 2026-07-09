import { getGenresUrl, fetchData } from "./api.js";
import { state } from "../state.js";

export async function getGenres() {
  try {
    const { genres } = await fetchData(getGenresUrl());

    const genresMap = new Map();

    genres.forEach((genre) => {
      genresMap.set(genre.id, genre.name);
    });

    state.genres = genresMap;
  } catch (err) {
    console.error(err);
  }
}