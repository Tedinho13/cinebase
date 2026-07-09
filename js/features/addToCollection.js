import { fetchData, getMovieUrl } from "../services/api.js";
import { updateCollectionButton } from "../ui/sharedUI.js";

export const addToCollection = (data, actualPage) => {
  let collectionData = JSON.parse(localStorage.getItem("collection")) ?? [];

  if (collectionData !== null) {
    if (collectionData.some((movie) => movie.id === data.id)) {
      updateCollectionButton("deleted", actualPage);
      collectionData = collectionData.filter((movie) => movie.id !== data.id);
      localStorage.setItem("collection", JSON.stringify(collectionData));
      return;
    }
  }

  updateCollectionButton("added", actualPage);

  console.log(data);

  const {
    backdrop_path,
    id,
    original_title,
    overview,
    release_date,
    vote_average,
  } = data;

  console.log(collectionData);

  collectionData.push({
    backdrop_path,
    id,
    original_title,
    overview,
    release_date,
    vote_average,
  });

  localStorage.setItem("collection", JSON.stringify(collectionData));
};
