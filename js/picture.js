// picture.js
"use strict";

(function() {
  const photoTemplate = document
    .querySelector("#picture")
    .content.querySelector(".picture__link");

  /**
   * Render photo-element
   * @param {object} photo
   * @returns {Node}
   */
  const renderPhoto = photo => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector(".picture__img").src = photo.url;
    photoElement.querySelector(".picture__stat--likes").textContent =
      photo.likes;
    photoElement.querySelector(".picture__stat--comments");

    return photoElement;
  };

  window.picture = {
    renderPhoto
  };
})();
