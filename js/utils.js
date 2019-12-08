// utils.js
'use strict';

(function () {
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

  return window.utils = {
    getRandomNum,
    getRandomElement,
    getRandomArr,
  }
})();
