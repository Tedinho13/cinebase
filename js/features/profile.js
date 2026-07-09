export const initProfile = () => {
  const navProfile = document.querySelector(".nav__profile");
  const dropdown = document.querySelector(".profile-dropdown");

  const toggleProfile = () => {
    dropdown.classList.toggle("active");
  };

  navProfile.addEventListener("click", toggleProfile);
};
