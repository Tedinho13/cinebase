const heroContent = document.querySelector(".hero__content");
const hero = document.querySelector(".hero");
const pagination = document.querySelector(".pagination");

import { adjustImage } from "./sharedUI.js";

export const generatePoster = (data) => {
  adjustImage(hero, data);
  heroContent.id = data.id;

  const rate = document.querySelector(".rate__value");
  const heroTitle = document.querySelector(".hero__title");
  const heroDesc = document.querySelector(".hero__description");

  rate.textContent = data.vote_average.toFixed(1);
  heroTitle.textContent = data.original_title;
  heroDesc.textContent = data.overview;
};

export const showInput = () => {

  const paginationJumpTo = document.querySelector(".pagination__jump-to");
  const jumpToInput = document.querySelector(".jump-to__input");

  paginationJumpTo.classList.add("hidden");
  jumpToInput.classList.add("visible");
};

export const generatePagination = (pageCur, data) => {
  const pagesBtns = [...document.querySelectorAll(".pagination__item")];
  const total_pages = 500;

  let pageNumbers;
  if (pageCur === 1) pageNumbers = [1, 2, 3];
  else if (pageCur === 500) pageNumbers = [498, 499, 500];
  else pageNumbers = [pageCur - 1, pageCur, pageCur + 1];

  pagesBtns.forEach((btn, i) => {
    const page = i < 3 ? pageNumbers[i] : total_pages;
    btn.dataset.page = page;
    btn.classList.toggle("active", Number(btn.dataset.page) === pageCur);
    btn.textContent = page;
  });
};
