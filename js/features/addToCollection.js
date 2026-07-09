import { fetchData, getMovieUrl } from "../services/api.js";
import {
  updateCollectionButton,
  updateCollectionNumberSpan,
} from "../ui/sharedUI.js";

export const addToCollection = (data, actualPage) => {
  let collectionData = JSON.parse(localStorage.getItem("collection")) ?? [];

  if (collectionData !== null) {
    if (collectionData.some((movie) => movie.id === data.id)) {
      updateCollectionButton("deleted", actualPage);
      collectionData = collectionData.filter((movie) => movie.id !== data.id);
      localStorage.setItem("collection", JSON.stringify(collectionData));
      updateCollectionNumberSpan();
      return;
    }
  }

  console.log(data);

  const {
    backdrop_path,
    genre_ids,
    genres,
    id,
    original_title,
    overview,
    poster_path,
    release_date,
    vote_average,
  } = data;

  collectionData.push({
    backdrop_path,
    genre_ids,
    genres,
    id,
    original_title,
    overview,
    poster_path,
    release_date,
    vote_average,
  });

  localStorage.setItem("collection", JSON.stringify(collectionData));

  console.log(collectionData);

  updateCollectionNumberSpan();

  updateCollectionButton("added", actualPage);
};
