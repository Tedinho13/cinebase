import { fetchData, getSearchedMovieUrl } from "../services/api.js";
import {
  renderAutocompletionData,
  setAutocompletionVisible,
} from "../ui/sharedUI.js";
import { state } from "../state.js";

export function initSearch() {
  const searchForm = document.querySelector(".nav__search");
  const searchInput = document.querySelector(".nav__search-input");
  const autocompletionList = document.querySelector(".autocompletion__list");

  if (!searchForm) return; // gdyby na stronie nie było wyszukiwarki

  const searchMovie = () => {
    setAutocompletionVisible(false);
    location.href = `searched.html?query=${encodeURIComponent(searchInput.value)}`;
  };

  const changeInputValue = (e) => {
    if (!e.target.classList.contains("autocompletion__item")) return;

    searchInput.value = e.target.dataset.title;
    setAutocompletionVisible(false);
    searchMovie();
  };

  const showAutocompletion = (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {
      setAutocompletionVisible(false);
      return;
    }

    clearTimeout(state.timeoutID);

    state.timeoutID = setTimeout(async () => {
      const data = await fetchData(getSearchedMovieUrl(query));
      renderAutocompletionData(data);
      setAutocompletionVisible(true);
    }, 300);
  };

  searchInput.addEventListener("input", showAutocompletion);
  autocompletionList.addEventListener("click", changeInputValue);

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchMovie();
  });
}
