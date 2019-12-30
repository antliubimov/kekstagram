// gallery.js
"use strict";

(function() {
  /*
   * Render photos
   * */
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureComments = bigPicture.querySelector(".social__comments");

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

  /**
   * Create a photosFragment and add photos into one
   * @param photos
   */
  const onLoadPhotos = photos => {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0, { length } = photos; i < length; i += 1) {
      const photoElement = window.picture.renderPhoto(photos[i]);
      photoElement.addEventListener(
        "click",
        onPhotoElementClick.bind(null, photos[i])
      );
      photosFragment.appendChild(photoElement);
    }

    document.querySelector(".pictures").appendChild(photosFragment);
  };

  const errorPopup = document.querySelector(".error-popup");
  const errorPopupCancel = document.querySelector(".error-popup__cancel");
  const errorPopupMessage = document.querySelector(".error-popup__message");
  /**
   * Handle error-message
   * @param errorMessage
   */
  const onErrorHandler = errorMessage => {
    errorPopup.classList.remove("hidden");
    errorPopupMessage.textContent = errorMessage;
    errorPopupCancel.addEventListener("click", onErrorPopupCancelClick);
    document.addEventListener("keydown", onErrorPopupEscDown);
  };
  /**
   * Close error-popup
   */
  const closeErrorPopup = () => {
    errorPopup.classList.add("hidden");
    errorPopupCancel.removeEventListener("click", onErrorPopupCancelClick);
    document.removeEventListener("keydown", onErrorPopupEscDown);
  };

  const onErrorPopupCancelClick = () => {
    closeErrorPopup();
  };
  const onErrorPopupEscDown = evt => {
    if (evt.key === "Escape") {
      closeErrorPopup();
    }
  };

  window.backend.upLoad(onLoadPhotos, onErrorHandler);
  //const { photos } = window.data;
})();
