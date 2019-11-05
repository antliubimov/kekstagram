"use strict";

var ESC_KEY = "Escape";
var PHOTO_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
const COMMENTS_AMOUNT = {
  MIN: 1,
  MAX: 2
};
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
const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    setFilter: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    setFilter: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    setFilter: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    setFilter: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    setFilter: (value) => `brightness(${value})`
  },
  none: {
    min: 0,
    max: 0,
    setFilter: () => `none`
  }
};

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
  var countComments = getRandomNum(COMMENTS_AMOUNT.MIN, COMMENTS_AMOUNT.MAX);
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

  for (var i = 0; i < PHOTO_COUNT; i++) {
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

/*
*  Загрузка фото и применение эффектов
*
* */

var uploadFileButton = document.querySelector('#upload-file');
var imgUploadPanel = document.querySelector('.img-upload__overlay');
var imgUploadPicture = document.querySelector('.img-upload__preview > img');
var effectItems = document.querySelectorAll('.effects__item');
var scalePin = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.scale__value');
var EFFECT_MAX_LEVEL = 100;

var onUploadFileChange = () => {
  imgUploadPanel.classList.remove('hidden');
  var currentEffect = '';
  var uploadCancel = document.querySelector('#upload-cancel');

  var imgUploadClose = () => {
    uploadFileButton.value  = '';
    imgUploadPanel.classList.add('hidden');
    uploadCancel.removeEventListener('click', onUploadCancelClick);
    document.removeEventListener('down', onImgUploadEscDown);
    imgUploadPicture.classList = [];
    [...effectItems].forEach(effectsItem => effectsItem.removeEventListener('click', onEffectsItemClick));
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
    currentEffect = evt.target.value;
    if (currentEffect) {
      imgUploadPicture.classList = [];
      imgUploadPicture.classList.add(`effects__preview--${currentEffect}`);
    }
  };
  [...effectItems].forEach(effectsItem => effectsItem.addEventListener('click', onEffectsItemClick));


  var onScalePinMouseUp = () => {
    scaleValue.value = scalePin.left;
    imgUploadPicture.style.filter = EFFECTS[currentEffect].setFilter(scaleValue);
  };

  scalePin.addEventListener('mouseup', onScalePinMouseUp);

  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onImgUploadEscDown);
};

uploadFileButton.addEventListener('change', onUploadFileChange);




