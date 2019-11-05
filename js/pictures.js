"use strict";

var ESC_KEY = "Escape";
var PHOTO_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппаратна кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];
var DESCRIPTIONS = [
  "Тестим новую камеру!",
  "Затусили с друзьями на море",
  "Как же круто тут кормят",
  "Отдыхаем...",
  "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
  "Вот это тачка!"
];

var getRandomNum = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1));

var getRandomElement = elements =>
  elements[getRandomNum(0, elements.length - 1)];

var randomArr = (min, max) => {
  var arr = [];

  while (arr.length !== max) {
    var arrEl = getRandomNum(min, max);

    if (!arr.includes(arrEl)) {
      arr.push(arrEl);
    }
  }

  return arr;
};

var urlRandNum = randomArr(1, PHOTO_COUNT);

var getComments = () => {
  var countComments = getRandomNum(1, 2);
  var comments = [];

  while (comments.length !== countComments) {
    var comment = getRandomElement(COMMENTS);

    if (!comments.includes(comment)) {
      comments.push(comment);
    }
  }

  return comments;
};

var getPhotos = () => {
  var photos = [];

  for (var i = 0; i < 25; i++) {
    var photo = {
      url: `photos/${urlRandNum[i]}.jpg`,
      likes: getRandomNum(LIKES_MIN, LIKES_MAX),
      comments: getComments(),
      description: getRandomElement(DESCRIPTIONS)
    };

    photos.push(photo);
  }

  return photos;
};

var photos = getPhotos();

var photoTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture__link");

var renderPhoto = photo => {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector(".picture__img").src = photo.url;
  photoElement.querySelector(".picture__stat--likes").textContent = photo.likes;
  photoElement.querySelector(".picture__stat--comments");
  var createBigPicture = () => {
    var bigPicture = document.querySelector(".big-picture");

    bigPicture.querySelector(".big-picture__img").querySelector("img").src =
      photo.url;
    bigPicture.querySelector(".likes-count").textContent = photo.likes;
    bigPicture.querySelector(".comments-count").textContent =
      photo.comments.length;

    var commentsUl = bigPicture.querySelector(".social__comments");
    commentsUl.innerHTML = "";
    for (var j = 0; j < photo.comments.length; j++) {
      var commentTemplate = `
<li class="social__comment social__comment--text">
    <img class="social__picture" src="img/avatar-${getRandomNum(
      1,
      6
    )}.svg" alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">${photo.comments[j]}</p>
</li>
`;
      commentsUl.innerHTML += commentTemplate;
    }
    bigPicture
      .querySelector(".big-picture__title")
      .classList.remove("visually-hidden");
    bigPicture.querySelector(".social__caption").textContent =
      photo.description;

    bigPicture
      .querySelector(".social__comment-count")
      .classList.add("visually-hidden");
    bigPicture
      .querySelector(".social__comment-loadmore")
      .classList.add("visually-hidden");

    var bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");

    var bigPictureClose = () => {
      bigPicture
        .querySelector(".big-picture__title")
        .classList.add("visually-hidden");
      bigPicture
        .querySelector(".social__comment-count")
        .classList.remove("visually-hidden");
      bigPicture
        .querySelector(".social__comment-loadmore")
        .classList.remove("visually-hidden");
      bigPictureCancel.removeEventListener("click", onBigPictureCancelClick);
      document.removeEventListener("keydown", onBigPictureEscDown);
      bigPicture.classList.add("hidden");
    };
    var onBigPictureCancelClick = () => {
      bigPictureClose();
    };
    var onBigPictureEscDown = evt => {
      if (evt.key === ESC_KEY) {
        bigPictureClose();
      }
    };

    bigPictureCancel.addEventListener("click", onBigPictureCancelClick);
    document.addEventListener("keydown", onBigPictureEscDown);
  };

  var onPhotoElementClick = e => {
    e.preventDefault();
    createBigPicture();
    document.querySelector(".big-picture").classList.remove("hidden");
  };

  photoElement.addEventListener("click", onPhotoElementClick);

  return photoElement;
};

var photosFragment = document.createDocumentFragment();

for (var i = 0, length = photos.length; i < length; i++) {
  photosFragment.appendChild(renderPhoto(photos[i]));
}

document.querySelector(".pictures").appendChild(photosFragment);

var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
var effectsItems = document.querySelectorAll('.effects__item');

var onUploadFileChange = () => {
  imgUploadOverlay.classList.remove('hidden');

  var uploadCancel = document.querySelector('#upload-cancel');

  var imgUploadClose = () => {
    uploadFile.value  = '';
    imgUploadOverlay.classList.add('hidden');
    uploadCancel.removeEventListener('click', onUploadCancelClick);
    document.removeEventListener('down', onImgUploadEscDown);
    imgUploadPreview.classList = [];
    [...effectsItems].forEach(effectsItem => effectsItem.removeEventListener('click', onEffectsItemClick));
  };

  var onImgUploadEscDown = (evt) => {
    if (evt.key === ESC_KEY) {
      imgUploadClose();
    }
  };

  var onUploadCancelClick = () => {
    imgUploadClose();
  };

  var onEffectsItemClick = (evt) => {
    if (evt.target.value) {
      imgUploadPreview.classList = [];
      imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
    }
  };
  [...effectsItems].forEach(effectsItem => effectsItem.addEventListener('click', onEffectsItemClick));


  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onImgUploadEscDown);
};

uploadFile.addEventListener('change', onUploadFileChange);

var scalePin = document.querySelector('.scale__pin');
var onScalePinMouseUp = () => {

};

scalePin.addEventListener('mouseup', onScalePinMouseUp);


