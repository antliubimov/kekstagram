// data.js
"use strict";

(function() {
  const PHOTO_COUNT = 25;
  const LIKES_MIN = 15;
  const LIKES_MAX = 200;
  const COMMENTS_AMOUNT = {
    MIN: 1,
    MAX: 2
  };
  const COMMENTS = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппаратна кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
  ];
  const DESCRIPTIONS = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
    "Вот это тачка!"
  ];

  const urlRandNum = window.utils.getRandomArr(1, PHOTO_COUNT);

  /**
   * Get array of comments
   * @returns {[]}
   */
  const getCommentsArray = () => {
    const countComments = window.utils.getRandomNum(
      COMMENTS_AMOUNT.MIN,
      COMMENTS_AMOUNT.MAX
    );
    const comments = [];

    while (comments.length !== countComments) {
      const comment = window.utils.getRandomElement(COMMENTS);

      if (!comments.includes(comment)) {
        comments.push(comment);
      }
    }

    return comments;
  };
  /**
   * Get array of photo-objects
   * @returns {[]}
   */
  const getPhotos = () => {
    const photos = [];

    for (let i = 0; i < PHOTO_COUNT; i += 1) {
      const photo = {
        url: `photos/${urlRandNum[i]}.jpg`,
        likes: window.utils.getRandomNum(LIKES_MIN, LIKES_MAX),
        comments: getCommentsArray(),
        description: window.utils.getRandomElement(DESCRIPTIONS)
      };

      photos.push(photo);
    }

    return photos;
  };

  const photos = getPhotos();

  window.photos = {
    photos
  };
})();
