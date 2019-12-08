// gallery.js
"use strict";

(function() {
  /*
   * Render photos
   * */
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureComments = bigPicture.querySelector(".social__comments");

  const photosFragment = document.createDocumentFragment();
  const { photos } = window.data;
  for (let i = 0, { length } = photos; i < length; i += 1) {
    photosFragment.appendChild(window.picture.renderPhoto(photos[i]));
  }

  document.querySelector(".pictures").appendChild(photosFragment);

  /**
   * Get bigPicture section
   * @param {object} photo
   */
  const getBigPicture = photo => {
    bigPicture.querySelector(".big-picture__img > img").src = photo.url;
    bigPicture.querySelector(".likes-count").textContent = photo.likes;
    bigPicture.querySelector(
      ".comments-count"
    ).textContent = photo.comments.length.toString();
    bigPicture.querySelector(".social__caption").textContent =
      photo.description;
    bigPictureComments.innerHTML = window.preview.getComments(photo);

    bigPicture
      .querySelector(".big-picture__title")
      .classList.remove("visually-hidden");
    bigPicture
      .querySelector(".social__comment-count")
      .classList.add("visually-hidden");
    bigPicture
      .querySelector(".social__comment-loadmore")
      .classList.add("visually-hidden");

    window.preview.bigPictureCancel.addEventListener(
      "click",
      window.preview.onBigPictureCancelClick
    );
    document.addEventListener("keydown", window.preview.onBigPictureEscDown);
  };

  /**
   * Click on photo
   * @param {object} photo
   */
  const onPhotoElementClick = photo => {
    getBigPicture(photo);
    bigPicture.classList.remove("hidden");
  };

  window.gallery = {
    onPhotoElementClick
  };
})();
