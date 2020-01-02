// preview.js
"use strict";

(function() {
  const ESC_KEY = "Escape";
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");
  const loadMore = bigPicture.querySelector(".social__comment-loadmore");
  const commentsLoaded = bigPicture.querySelector(".comments-loaded");
  /**
   * Get template of comment
   * @param template
   * @returns {string}
   */
  const getCommentTemplate = template => {
    return `
<li class="social__comment social__comment--text">
    <img class="social__picture" src=${template.avatar} alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">${template.message}</p>
</li>
`;
  };

  /**
   * Add comments in ul of comments
   * @param {Object} photoComments
   * @param {Number} count
   */
  const addComments = (photoComments, count) => {
    const comments = document.querySelector(".social__comments");
    const commLength = photoComments.length;
    const commentsArr = photoComments.slice(
      count,
      commLength - count > 5 ? count + 5 : commLength
    );
    for (let i = 0; i < commentsArr.length; i += 1) {
      comments.innerHTML += getCommentTemplate(commentsArr[i]);
    }
    commentsLoaded.innerText = count + commentsArr.length;
    if (commentsArr.length < 5) {
      hiddenLoadMore();
    }
  };
  /**
   * Load more comments
   * @param {array} photoComments
   */
  const onLoadComments = photoComments => {
    const commentsCount = document.querySelectorAll(".social__comment").length;
    addComments(photoComments, commentsCount);
  };
  /**
   * Hidden loadMore
   */
  const hiddenLoadMore = () => {
    loadMore.classList.add("visually-hidden");
    // loadMore.removeEventListener("click", onLoadMore);
  };

  /**
   * Return html-comments
   * @param {object} photo
   * @returns {string}
   */
  const getComments = photo => {
    let comments = "";
    const commentsLength =
      photo.comments.length > 5 ? 5 : photo.comments.length;
    for (let i = 0; i < commentsLength; i += 1) {
      comments += getCommentTemplate(photo.comments[i]);
    }
    commentsLoaded.innerText = commentsLength;

    if (commentsLength === photo.comments.length) {
      hiddenLoadMore();
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
    loadMore.removeEventListener("click", window.gallery.onLoadMore);
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
    onBigPictureEscDown,
    loadMore,
    onLoadComments
  };
})();
