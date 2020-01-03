// filters.js
"use strict";

(function() {
  const cleanPictures = () => {
    document
      .querySelectorAll(".picture__link")
      .forEach(picture => picture.remove());
  };

  const getCurrentFilter = () => {
    return [...document.querySelectorAll(".img-filters__button")].filter(btn =>
      btn.classList.contains("img-filters__button--active")
    )[0];
  };

  let currentFilter = getCurrentFilter();

  const setCurrentFilter = btn => {
    currentFilter.classList.remove("img-filters__button--active");
    currentFilter = btn;
    btn.classList.add("img-filters__button--active");
  };

  const getPhotosFn = (evt, fn) => {
    cleanPictures();
    setCurrentFilter(evt.target);
    const photos = [...window.gallery.photos];
    const sortPhotos = fn(photos);
    window.gallery.loadPhotos(sortPhotos);
  };

  const getRecommended = photos => photos;
  const getPopular = photos =>
    photos.sort((photoA, photoB) => photoB.likes - photoA.likes);
  const getDiscussed = photos =>
    photos.sort(
      (photoA, photoB) => photoB.comments.length - photoA.comments.length
    );
  const getRandomPhotos = photos => {
    const randomPhotos = [];
    while (randomPhotos.length !== 10) {
      const arrEl = window.utils.getRandomElement(photos);
      if (!randomPhotos.includes(arrEl)) {
        randomPhotos.push(arrEl);
      }
    }
    return randomPhotos;
  };

  const filter = {
    "filter-recommended": getRecommended,
    "filter-popular": getPopular,
    "filter-discussed": getDiscussed,
    "filter-random": getRandomPhotos
  };

  const onFilterClick = evt => {
    const filterID = evt.target.id;
    if (currentFilter.id.toString() !== filterID) {
      getPhotosFn(evt, filter[filterID]);
    }
  };

  window.filters = {
    onFilterClick
  };
})();
