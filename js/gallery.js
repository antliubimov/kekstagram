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

    window.gallery.onLoadMore = () => {
      window.preview.onLoadComments(photo.comments);
    };
    window.preview.loadMore.addEventListener(
      "click",
      window.gallery.onLoadMore
    );

    bigPicture
      .querySelector(".big-picture__title")
      .classList.remove("visually-hidden");

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

  const photos = [];

  const recommended = document.querySelector("#filter-recommended");
  const popular = document.querySelector("#filter-popular");
  const discussed = document.querySelector("#filter-discussed");
  const random = document.querySelector("#filter-random");
  const filters = [recommended, popular, discussed, random];

  /**
   * Add eventListener on filter-button
   * @param {Array} filtersArr
   */
  const addFiltersListeners = filtersArr => {
    filtersArr.forEach(filter =>
      filter.addEventListener("click", window.filters.onFilterClick)
    );
  };

  /**
   * Create a photosFragment and add data into one
   * @param {Array} data
   */
  const loadPhotos = data => {
    const photosFragment = document.createDocumentFragment();
    for (let i = 0, { length } = data; i < length; i += 1) {
      const photoElement = window.picture.renderPhoto(data[i]);
      photoElement.addEventListener(
        "click",
        onPhotoElementClick.bind(null, data[i])
      );
      photosFragment.appendChild(photoElement);
    }
    document.querySelector(".pictures").appendChild(photosFragment);
  };

  const onLoadPhotos = data => {
    window.gallery.photos = [...data];
    loadPhotos(data);

    document
      .querySelector(".img-filters")
      .classList.remove("img-filters--inactive");

    addFiltersListeners(filters);
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

  window.gallery = {
    photos,
    loadPhotos
  };
})();
