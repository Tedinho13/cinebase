import { updateCollectionNumberSpan } from "../ui/sharedUI.js";

export const initProfile = () => {
  const navProfile = document.querySelector(".nav__profile");
  const dropdown = document.querySelector(".profile-dropdown");

  const profileItem = document.querySelector(".favourites-movies__item");

  updateCollectionNumberSpan();

  const toggleProfile = () => {
    dropdown.classList.toggle("active");
  };

  const goToFavouritesPage = () => {
    location.href = `favourites.html`;
  };

  navProfile.addEventListener("click", toggleProfile);
  profileItem.addEventListener("click", goToFavouritesPage);
};
