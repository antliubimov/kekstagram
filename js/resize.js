// resize.js
"use strict";

(function() {
  const PERCENT = {
    min: 25,
    max: 100,
    step: 25
  };

  const resizeValue = document.querySelector(".resize__control--value");
  const img = document.querySelector(".img-upload__preview");

  const getResizeValue = () => {
    const regExp = /\d+[^%]/;
    const resize = resizeValue.value;
    return Number(resize.match(regExp)[0]);
  };

  const setResizeValue = resize => {
    resizeValue.value = `${resize}%`;
    const percentTransform = resize / 100;
    img.style.transform = `scale(${percentTransform})`;
  };

  const onDecreaseSizeButtonClick = () => {
    let resize = getResizeValue();
    if (resize > PERCENT.min && resize <= PERCENT.max) {
      resize -= PERCENT.step;
    }
    setResizeValue(resize);
  };
  const onIncreaseSizeButtonClick = () => {
    let resize = getResizeValue();
    if (resize >= PERCENT.min && resize < PERCENT.max) {
      resize += PERCENT.step;
    }
    setResizeValue(resize);
  };

  window.resize = {
    setResizeValue,
    onDecreaseSizeButtonClick,
    onIncreaseSizeButtonClick,
  };
})();
