// filters.js
"use strict";

(function() {
  const cleanPictures = button => {
    document
      .querySelectorAll(".picture__link")
      .forEach(picture => picture.remove());
    document
      .querySelectorAll(".img-filters__button")
      .forEach(btn => btn.classList.remove("img-filters__button--active"));
    button.classList.add("img-filters__button--active");
  };

  const getPhotosFn = (evt, fn) => {
    cleanPictures(evt.target);
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

  const onRecommendedClick = evt => {
    getPhotosFn(evt, getRecommended);
  };
  const onPopularClick = evt => {
    getPhotosFn(evt, getPopular);
  };

  const onDiscussedClick = evt => {
    getPhotosFn(evt, getDiscussed);
  };

  const onRandomClick = evt => {
    getPhotosFn(evt, getRandomPhotos);
  };

  window.filters = {
    onRecommendedClick,
    onPopularClick,
    onDiscussedClick,
    onRandomClick
  };
})();
