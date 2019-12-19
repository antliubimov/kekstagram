// preview.js
"use strict";

(function() {
  const ESC_KEY = "Escape";
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");
  /**
   * Return html-comments
   * @param {object} photo
   * @returns {string}
   */
  const getComments = photo => {
    let comments = "";
    for (let i = 0; i < photo.comments.length; i += 1) {
      const commentTemplate = `
<li class="social__comment social__comment--text">
    <img class="social__picture" src=${photo.comments[i].avatar} alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">${photo.comments[i].message}</p>
</li>
`;
      comments += commentTemplate;
    }
    return comments;
  };

  /**
   * Close bigPicture
   */
  const bigPictureClose = () => {
    bigPicture
      .querySelector(".big-picture__title")
      .classList.add("visually-hidden");
    bigPicture
      .querySelector(".social__comment-count")
      .classList.remove("visually-hidden");
    bigPicture
      .querySelector(".social__comment-loadmore")
      .classList.remove("visually-hidden");
    bigPicture.classList.add("hidden");
    bigPictureCancel.removeEventListener("click", onBigPictureCancelClick);
    document.removeEventListener("keydown", onBigPictureEscDown);
  };
  /**
   * Click on bigPictureCancel button
   */
  const onBigPictureCancelClick = () => {
    bigPictureClose();
  };
  /**
   * When press Esc bigPicture is closed
   * @param evt
   */
  const onBigPictureEscDown = evt => {
    if (evt.key === ESC_KEY) {
      bigPictureClose();
    }
  };

  window.preview = {
    bigPictureCancel,
    getComments,
    onBigPictureCancelClick,
    onBigPictureEscDown
  };
})();
