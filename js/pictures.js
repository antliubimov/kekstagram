'use strict';
var PHOTO_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппаратна кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomNum = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

var getRandomElement = elements => elements[getRandomNum(0, elements.length - 1)];

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

var photoTemplate = document.querySelector('#picture');

var renderPhoto = (photo) => {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.content.querySelector('.picture__img').src = photo.url;
  photoElement.content.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.content.querySelector('.picture__stat--comments');
  return photoElement;
};

var photosFragment = document.createDocumentFragment();

for (var i = 0, length = photos.length; i < length; i++) {
  photosFragment.appendChild(renderPhoto(photos[i]));
}

document.querySelector('.pictures').appendChild(photosFragment);

document.querySelector('.big-picture').classList.remove('hidden');
document.querySelector('.big-picture__img').querySelector('img').src = photos[0].url;
document.querySelector('.likes-count').textContent = photos[0].likes;
document.querySelector('.comments-count').textContent = photos[0].comments.length;
var commentsUl = document.querySelector('.social__comments');
commentsUl.innerHTML = '';
for (var j = 0; j < photos[0].comments.length; j++) {
  var commentTemplate = `
<li class="social__comment social__comment--text">
    <img class="social__picture" src="img/avatar-${getRandomNum(1, 6)}.svg" alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">${photos[0].comments[j]}</p>
</li>
`;
  commentsUl.innerHTML += commentTemplate;
}

document.querySelector('.social__caption').textContent = photos[0].description;

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');