import { generateMoviesList } from "../ui/sharedUI.js";

export const showCollection = (genres) => {
  const favouritesCollection = JSON.parse(localStorage.getItem("collection"));

  console.log(favouritesCollection);

  generateMoviesList(favouritesCollection, genres);
};
