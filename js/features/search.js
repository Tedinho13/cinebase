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

  if (!searchForm) return;

  const searchMovie = () => {
    console.log("szukanko");

    setAutocompletionVisible(false);
    location.href = `searched.html?query=${encodeURIComponent(searchInput.value)}`;

    state.selectedAutocompletionIndex = -1;
  };

  const changeInputValue = (e) => {
    if (!e.target.classList.contains("autocompletion__item")) return;

    searchInput.value = e.target.dataset.title;
    setAutocompletionVisible(false);
    searchMovie();
  };

  const selectHighlightedItem = (items) => {
    if (state.selectedAutocompletionIndex === -1) return;

    const item = items[state.selectedAutocompletionIndex];

    searchInput.value = item.dataset.title;
    searchMovie();
  };

  const highlight = (items) => {
    items.forEach((item) => item.classList.remove("active"));

    console.log(state.selectedAutocompletionIndex);

    items[state.selectedAutocompletionIndex].classList.add("active");
  };

  const handleKeyboardNavigation = (e) => {
    const items = [...document.querySelectorAll(".autocompletion__item")];

    if (e.key === "Enter") {
      e.preventDefault();

      if (state.selectedAutocompletionIndex !== -1) {
        selectHighlightedItem(items);
      } else {
        searchMovie();
      }

      return;
    }

    if (!items.length) return;

    // obsługa ArrowUp i ArrowDown

    if (e.key === "ArrowDown") {
      e.preventDefault();
      state.selectedAutocompletionIndex++;

      if (state.selectedAutocompletionIndex >= items.length)
        state.selectedAutocompletionIndex = 0;

      highlight(items);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      state.selectedAutocompletionIndex--;

      if (state.selectedAutocompletionIndex < 0)
        state.selectedAutocompletionIndex = items.length - 1;

      highlight(items);
    }
    if (e.key === "Enter") {
      e.preventDefault();

      if (state.selectedAutocompletionIndex !== -1) {
        selectHighlightedItem(items);
      } else {
        searchMovie();
      }
    }
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
      state.selectedAutocompletionIndex = -1;
      setAutocompletionVisible(true);
    }, 300);
  };

  searchInput.addEventListener("input", showAutocompletion);
  autocompletionList.addEventListener("click", changeInputValue);
  searchInput.addEventListener("keydown", handleKeyboardNavigation);
}
