import { fetchData, getMovieVideoUrl } from "../services/api.js";

import { renderMovieTrailer, showVideoModal } from "../ui/sharedUI.js";

export const displayMovieTrailer = async (id) => {
  showVideoModal();

  console.log(id);
  const url = getMovieVideoUrl(id);
  const data = await fetchData(url);

  console.log(data);

  renderMovieTrailer(data.results);
};

