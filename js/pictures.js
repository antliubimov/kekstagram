'use strict';

var randomNum = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

var randomArr = (min, max) => {
  var arr = [];
  while (arr.length !== max) {
    var arrEl = randomNum(min, max);
    if (!arr.includes(arrEl)) {
      arr.push(arrEl);
    }
  }
  return arr;
};

var urlRandNum = randomArr(1, 25);

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппаратна кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var commentsArr = () => {
  var length = randomNum(1, 2);
  var arr = [];
  while (arr.length !== length) {
    var arrEl = randomNum(0, comments.length - 1);
    if (!arr.includes(arrEl)) {
      arr.push(arrEl);
    }
  }
  var commArr = arr.map(el => comments[el]);
  return commArr;
};

var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var photos = [];

for (var i = 0; i < 25; i++) {
  var photo = {
    url: `photos/${urlRandNum[i]}.jpg`,
    likes: randomNum(15, 200),
    comments: commentsArr(),
    description: description[randomNum(0, description.length - 1)]
  };
  photos.push(photo);
}