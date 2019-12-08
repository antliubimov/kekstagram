// scale-effect.js
"use strict";

(function() {
  const EFFECT_LEVEL = {
    MIN: 0,
    MAX: 100
  };

  const scalePin = document.querySelector(".scale__pin");
  const scaleValue = document.querySelector(".scale__value");
  const scaleLevel = document.querySelector(".scale__level");

  /**
   * Set the pin position and change css-style for scalePin and scaleLevel
   * @param {number} value The value from 0 to 100 %
   */
  const setPinPosition = value => {
    scaleValue.value = value;
    scalePin.style.left = `${value}%`;
    scaleLevel.style.width = `${value}%`;
  };

  const onScalePinMouseDown = evt => {
    evt.preventDefault();
    const scaleLineWidth = document.querySelector(".scale__line").offsetWidth;
    let startCoordX = evt.clientX;

    const onMouseMove = moveEvt => {
      moveEvt.preventDefault();

      const shift = startCoordX - moveEvt.clientX;
      const shiftScalePin = scalePin.offsetLeft - shift;
      startCoordX = moveEvt.clientX;
      const valuePin = Math.round(
        (shiftScalePin * EFFECT_LEVEL.MAX) / scaleLineWidth
      );
      if (valuePin >= EFFECT_LEVEL.MIN && valuePin <= EFFECT_LEVEL.MAX) {
        setPinPosition(valuePin);
        window.form.setPictureEffect(window.form.currentEffect);
      }
    };

    const onMouseUp = upEvt => {
      upEvt.preventDefault();
      startCoordX = upEvt;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  scalePin.addEventListener("mousedown", onScalePinMouseDown);

  window.scaleEffect = {
    EFFECT_LEVEL,
    setPinPosition,
    onScalePinMouseDown
  };
})();
