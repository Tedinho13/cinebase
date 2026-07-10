export const renderInfoAboutEmptyCollection = () => {
  const moviesSearchDescription = document.querySelector(
    ".movies__search-description",
  );

  moviesSearchDescription.textContent = `Nothing's there.`;
};
