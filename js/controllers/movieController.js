import { fetchData, getMovieUrl } from "../api.js";
import { renderMovieDetails } from "../ui/movieUI.js";
import { startLoader, hideLoader } from "../ui/sharedUI.js";
import { state } from "../state.js";

const getMovieID = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id;
};

async function controlFunction() {
  startLoader();
  const id = getMovieID();
  const url = getMovieUrl(id);

  const data = await fetchData(url);
  state.actualMovie = data;
  hideLoader();
  renderMovieDetails(state.actualMovie);

  console.log(state);
}

controlFunction();

window.addEventListener("resize", () => renderMovieDetails(state.actualMovie));
