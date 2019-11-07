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
/**
 * Returns a random number from min-value to max-value (inclusive)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
var getRandomNum = (min, max) =>
  Math.round(min - 0.5 + Math.random() * (max - min + 1));
/**
 * Returns an random element from an array
 * @param {array} elements
 * @returns {element} element
 */
var getRandomElement = elements =>
  elements[getRandomNum(0, elements.length - 1)];
/**
 * Returns array with numbers from min-value to max-value
 * @param {number} min
 * @param {number} max
 * @returns {[]} array
 */
var getRandomArr = (min, max) => {
  var arr = [];

  while (arr.length !== max) {
    var arrEl = getRandomNum(min, max);

    if (!arr.includes(arrEl)) {
      arr.push(arrEl);
    }
  }

  return arr;
};

var urlRandNum = getRandomArr(1, PHOTO_COUNT);

/**
 * Get array of comments
 * @returns {[]}
 */
var getCommentsArray = () => {
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
/**
 * Get array of photo-objects
 * @returns {[]}
 */
var getPhotos = () => {
  var photos = [];

  for (var i = 0; i < PHOTO_COUNT; i++) {
    var photo = {
      url: `photos/${urlRandNum[i]}.jpg`,
      likes: getRandomNum(LIKES_MIN, LIKES_MAX),
      comments: getCommentsArray(),
      description: getRandomElement(DESCRIPTIONS)
    };

    photos.push(photo);
  }

  return photos;
};

var photos = getPhotos();

/*
* Render photos
* */
var photoTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture__link");
var bigPicture = document.querySelector(".big-picture");
var bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");
var bigPictureComments = bigPicture.querySelector(".social__comments");

/**
 * Close bigPicture
 */
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
  bigPicture.classList.add("hidden");
  bigPictureCancel.removeEventListener("click", onBigPictureCancelClick);
  document.removeEventListener("keydown", onBigPictureEscDown);
};
/**
 * Click on bigPictureCancel button
 */
var onBigPictureCancelClick = () => {
  bigPictureClose();
};
/**
 * When press Esc bigPicture is closed
 * @param evt
 */
var onBigPictureEscDown = (evt) => {
  if (evt.key === ESC_KEY) {
    bigPictureClose();
  }
};
/**
 * Click on photo
 * @param {object} photo
 */
var onPhotoElementClick = (photo) => {
  getBigPicture(photo);
  bigPicture.classList.remove("hidden");
};
/**
 * Return html-comments
 * @param {object} photo
 * @returns {string}
 */
var getComments = (photo) => {
  var comments = "";
  for (var i = 0; i < photo.comments.length; i += 1) {
    var commentTemplate = `
<li class="social__comment social__comment--text">
    <img class="social__picture" src="img/avatar-${getRandomNum(1, 6)}.svg" alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">${photo.comments[i]}</p>
</li>
`;
    comments += commentTemplate;
  }
  return comments;
};
/**
 * Get bigPicture section
 * @param {object} photo
 */
var getBigPicture = (photo) => {
  bigPicture.querySelector(".big-picture__img > img").src = photo.url;
  bigPicture.querySelector(".likes-count").textContent = photo.likes;
  bigPicture.querySelector(".comments-count").textContent = photo.comments.length.toString();
  bigPicture.querySelector(".social__caption").textContent = photo.description;
  bigPictureComments.innerHTML = getComments(photo);

  bigPicture
    .querySelector(".big-picture__title")
    .classList.remove("visually-hidden");
  bigPicture
    .querySelector(".social__comment-count")
    .classList.add("visually-hidden");
  bigPicture
    .querySelector(".social__comment-loadmore")
    .classList.add("visually-hidden");

  bigPictureCancel.addEventListener("click", onBigPictureCancelClick);
  document.addEventListener("keydown", onBigPictureEscDown);
};
/**
 * Render photo-element
 * @param {object} photo
 * @returns {Node}
 */
var renderPhoto = (photo) => {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector(".picture__img").src = photo.url;
  photoElement.querySelector(".picture__stat--likes").textContent = photo.likes;
  photoElement.querySelector(".picture__stat--comments");

  photoElement.addEventListener("click", onPhotoElementClick.bind(null, photo));

  return photoElement;
};

var photosFragment = document.createDocumentFragment();

for (var i = 0, length = photos.length; i < length; i += 1) {
  photosFragment.appendChild(renderPhoto(photos[i]));
}

document.querySelector(".pictures").appendChild(photosFragment);

/*
*  Upload the photo and add a effect to it
* */

var uploadFileButton = document.querySelector('#upload-file');
var imgUploadPanel = document.querySelector('.img-upload__overlay');
var imgUploadPicture = document.querySelector('.img-upload__preview > img');
var effectItems = document.querySelectorAll('.effects__item > input');
var defaultEffect = document.querySelector('#effect-none');
var uploadCancel = document.querySelector('#upload-cancel');
var scalePanel = document.querySelector('.img-upload__scale');
var scalePin = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.scale__value');
var scaleLevel = document.querySelector('.scale__level');
var uploadForm = document.querySelector('.img-upload__text');
var hashTagsField = document.querySelector('.text__hashtags');
var commentField = document.querySelector('.text__description');
var submitButton = document.querySelector('#upload-submit');
var EFFECT_MAX_LEVEL = 100;
var currentPictureClass;
/**
 * Sets the class of the loaded image according to effectName
 * @param {string} effectName
 */
var setPictureClass = (effectName) => {
  if (currentPictureClass) {
    imgUploadPicture.classList.remove(currentPictureClass);
  }
  imgUploadPicture.classList.add(`effects__preview--${effectName}`);
  currentPictureClass = `effects__preview--${effectName}`;
};
/**
 * Return the scaled value for the effect according to effectName
 * @param {number} value Value before scaling: from 0 to 100
 * @param {string} effectName
 * @returns {number} The scaling number
 */
const getEffectValue = (value, effectName) => {
  const currentEffect = EFFECTS[effectName];
  return currentEffect.min + value * (currentEffect.max - currentEffect.min) / EFFECT_MAX_LEVEL;
};

/**
 * Set the css-style on the upload picture according to effect
 * @param {string} effectName
 */
var setPictureEffect = (effectName) => {
  var effectValue = getEffectValue(scaleValue.value, effectName);
  imgUploadPicture.style.filter = EFFECTS[effectName].setFilter(effectValue);
};

/**
 * Add eventlisteners on effectItems and set the class and the effect on the upload image
 */
var initialize = () => {
  [...effectItems].forEach(effectsItem => effectsItem.addEventListener('click', onEffectsItemClick));
  defaultEffect.checked = true;
  setPictureClass(defaultEffect.value);
  setPictureEffect(defaultEffect.value);
  hide();
};
/**
 * remove Eventlisteners on effectItems when the upload form is closed
 */
var finalize = () => {
  [...effectItems].forEach(effectsItem => effectsItem.removeEventListener('click', onEffectsItemClick));
};
/**
 * Close image's upload form
 */
var imgUploadClose = () => {
  uploadFileButton.value  = '';
  imgUploadPanel.classList.add('hidden');
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('down', onImgUploadEscDown);
  finalize();
};
/**
 * Click on Esc-button when the upload form is opened
 * @param {Event} evt
 */
var onImgUploadEscDown = (evt) => {
  if (evt.key === ESC_KEY && document.activeElement !== commentField && document.activeElement !== hashTagsField) {
    imgUploadClose();
  }
};
/**
 *  Click on the Cancel Button when the upload form is opened
 */
var onUploadCancelClick = () => {
  imgUploadClose();
};
/**
 * Handles effect click on the upload form
 * @param {Event} evt
 */
var onEffectsItemClick = (evt) => {
  var selectedEffect = evt.target.value;
  if (selectedEffect === defaultEffect.value) {
    hide();
  } else {
    show();

  }
  setPinPosition(EFFECT_MAX_LEVEL);
  setPictureClass(selectedEffect);
  setPictureEffect(selectedEffect);
};

/**
 * Set the pin position and change css-style for scalePin and scaleLevel
 * @param {number} value The value from 0 to 100 %
 */
var setPinPosition = (value) => {
  scaleValue.value = Math.round(value);
  scalePin.style.left = `${value}%`;
  scaleLevel.style.width = `${value}%`;
};

/**
 * Hide scale panel
 */
var hide = () => {
  scalePanel.classList.add('hidden');
  scalePin.removeEventListener('mousedown', onScalePinMouseDown);
};
/**
 * Show scale panel
 */
var show = () => {
  if (scalePanel.classList.contains('hidden')) {
    scalePanel.classList.remove('hidden');
    scalePin.addEventListener('mousedown', onScalePinMouseDown);
  }
};
/**
 * Change on uploadFile-input
 */
var onUploadFileChange = () => {
  imgUploadPanel.classList.remove('hidden');
  initialize();
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onImgUploadEscDown);
};

uploadFileButton.addEventListener('change', onUploadFileChange);

// TODO: сделать нажатие на Pin
var onScalePinMouseDown = () => {
  var valuePin = scalePin.style.left / 100;
  setPinPosition(valuePin);
};
//

/*
* Validation Hash-tags and comment
* */
var hashTag = {
  SYMBOL: '#',
  MIN_SIZE: 2,
  MAX_SIZE: 20,
  AMOUNT: 5
};

const COMMENT_MAX_SIZE = 140;
const ERROR_STYLE = `2px solid #ff0000`;
/**
 * Returns the array without the deleted element
 * @param {Array} initialArray
 * @param {*} deletedElement
 * @returns {Array}
 */
var getArrayWithoutElement = (initialArray, deletedElement) => initialArray.filter(element => element !== deletedElement);

/**
 * Returns the array with lowercase-elements without empty element
 * @param str
 * @returns {Array}
 */
var getHashTagsArray = (str) => {
  var hashTagsArray = str.split(' ').map(hashTag => hashTag.toLowerCase());
  return getArrayWithoutElement(hashTagsArray, '');
};

var onHashTagsInput = (evt) => {
  var hashTagsArr = getHashTagsArray(evt.target.value);
  var hashTagsArrLength = hashTagsArr.length;
  var filterArr = hashTagsArr.filter(hashtag => hashtag[0] === '#');
  var filterLengthArr = hashTagsArr.filter(hashtag => hashtag.length > hashTag.MAX_SIZE);
  var filterSymbolArr = hashTagsArr.filter(hashtag => hashtag.match(/[^#a-zA-Z0-9а-яА-Я]/g));
  var noRepeatHashTags = new Set(hashTagsArr);
  if (hashTagsArrLength !== filterArr.length) {
    hashTagsField.setCustomValidity('Каждый хэш-тег должен начинаться со знака #');
  } else if (filterSymbolArr.length !== 0) {
    hashTagsField.setCustomValidity('Каждый хеш-тег должен содержать знак решетки, затем буквы английского или русского алфавита и цифры');
  } else if (hashTagsArr.includes('#')) {
    hashTagsField.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (hashTagsArrLength !== noRepeatHashTags.size) {
    hashTagsField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  } else if (hashTagsArrLength > hashTag.AMOUNT) {
    hashTagsField.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } else if (filterLengthArr.length > 0) {
    hashTagsField.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  } else {
    hashTagsField.setCustomValidity('');
  }
};
hashTagsField.addEventListener('input', onHashTagsInput);



/**
 * Check max length of data-comments, if it is wrong shows error-message.
 * @param {String} data
 */
var checkComment = (data) => {
  if (data.length > COMMENT_MAX_SIZE) {
    data.setCustomValidity(`Длина комментария должно быть не более ${COMMENT_MAX_SIZE} символов. Текущая длина комментария ${data.length} символов`);
  } else {
    data.setCustomValidity('');
  }
}

var onTextDescriptionInput = (evt) => {
 checkComment(evt.target);
};
commentField.addEventListener('input', onTextDescriptionInput);

var CustomValidation = (input) => {

};

var hashTagsFieldValidityChecks = [

];

hashTagsField.CustomValidation = new CustomValidation(hashTagsField);
hashTagsField.CustomValidation.validityChecks = hashTagsFieldValidityChecks;

var validate = () => {
  hashTagsField.CustomValidation.checkInput();
};


submitButton.addEventListener('click', validate);
uploadForm.addEventListener('submit', validate);

