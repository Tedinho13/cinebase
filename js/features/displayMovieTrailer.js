import { fetchData, getMovieVideoUrl } from "../services/api.js";

import { renderMovieTrailer, showVideoModal } from "../ui/sharedUI.js";

export const displayMovieTrailer = async (id) => {
  showVideoModal();

  const url = getMovieVideoUrl(id);
  const data = await fetchData(url);

  renderMovieTrailer(data.results);
};
