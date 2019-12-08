// form-validity.js
"use strict";

(function() {
  /*
   * Validation Hash-tags and comment
   * */
  const hashTag = {
    SYMBOL: "#",
    MIN_SIZE: 1,
    MAX_SIZE: 20,
    AMOUNT: 5
  };

  const COMMENT_MAX_SIZE = 140;
  const ERROR_STYLE = `2px solid #ff0000`;

  const hashTagsField = document.querySelector(".text__hashtags");
  const commentField = document.querySelector(".text__description");
  const submitButton = document.querySelector("#upload-submit");
  const uploadForm = document.querySelector(".img-upload__text");

  /**
   * Selects an incorrectly filled field
   * @param {Node} element
   */
  const setErrorValidStyle = element => {
    element.style.border = ERROR_STYLE;
  };

  /**
   * Deselects an incorrectly filled field
   * @param {Node} element
   */
  const resetErrorValidStyle = element => {
    element.style.border = ``;
  };
  /**
   * Returns the array without the deleted element
   * @param {Array} initialArray
   * @param {*} deletedElement
   * @returns {Array}
   */
  const getArrayWithoutElement = (initialArray, deletedElement) =>
    initialArray.filter(element => element !== deletedElement);

  /**
   * Returns the array with lowercase-elements without empty element
   * @param str
   * @returns {Array}
   */
  const getHashTagsArray = str => {
    const hashTagsArray = str.split(" ").map(hashTag => hashTag.toLowerCase());
    return getArrayWithoutElement(hashTagsArray, "");
  };

  /**
   * Array of objects matching the validation function hashtag format and error message
   * @type {*[]}
   */
  const checkActions = [
    {
      message: "Каждый хэш-тег должен начинаться со знака #",
      check: arg => arg.some(elem => elem[0] !== hashTag.SYMBOL)
    },
    {
      message:
        "Каждый хеш-тег должен содержать знак решетки, затем буквы английского или русского алфавита и цифры",
      check: arg => arg.some(elem => elem.match(/[^#a-zA-Z0-9а-яА-Я]/g))
    },
    {
      message: "Хеш-тег не может состоять только из одной решётки",
      check: arg => arg.some(elem => elem.length < hashTag.MIN_SIZE)
    },
    {
      message: "Хэш-тэги должны быть уникальными",
      check: arg => arg.some((value, idx, arr) => arr.indexOf(value) !== idx)
    },
    {
      message: `Нельзя указать больше ${hashTag.AMOUNT} хэш-тегов`,
      check: arg => arg.length > hashTag.AMOUNT
    },
    {
      message: `Максимальная длина одного хэш-тега ${hashTag.MAX_SIZE} символов, включая решётку`,
      check: arg => arg.some(elem => elem.length > hashTag.MAX_SIZE)
    },
    {
      message: false,
      check: arg => arg.length === 0
    },
    {
      message: false,
      check: arg => arg
    }
  ];
  /**
   * Returns the first object of the checkActions array, whose check function from argument arg returns true
   * @param {Array} arg
   * @returns {Object}
   */
  const getCheckAction = arg => checkActions.find(({ check }) => check(arg));
  /**
   * Checks the correctness of filling the field with hashtags. Шf the field is filled incorrectly displays an error message
   * @param {String} data
   */
  const checkHashTags = data => {
    const hashTags = getHashTagsArray(data);
    const { message } = getCheckAction(hashTags);
    if (message) {
      hashTagsField.setCustomValidity(message);
    } else {
      hashTagsField.setCustomValidity("");
    }
  };

  /**
   * Check max length of data-comments, if it is wrong shows error-message.
   * @param {String} data
   */
  const checkComment = data => {
    if (data.length > COMMENT_MAX_SIZE) {
      commentField.setCustomValidity(
        `Длина комментария должно быть не более ${COMMENT_MAX_SIZE} символов. Текущая длина комментария ${data.length} символов`
      );
    } else {
      commentField.setCustomValidity("");
    }
  };

  /**
   * Hides messages about incorrectly filled fields at input event
   * @param {Node} fields
   */
  const clearCustomValidity = (...fields) => {
    fields.forEach(field => {
      field.addEventListener("input", () => {
        field.setCustomValidity("");
      });
    });
  };

  /**
   * Initialize validation of fields
   */
  const initializeValidity = () => {
    clearCustomValidity(hashTagsField, commentField);

    submitButton.addEventListener("click", () => {
      checkHashTags(hashTagsField.value);
      checkComment(commentField.value);
    });

    uploadForm.addEventListener(
      "invalid",
      function(evt) {
        setErrorValidStyle(evt.target);
      },
      true
    );

    uploadForm.addEventListener("input", function(evt) {
      resetErrorValidStyle(evt.target);
    });
  };

  window.formValidity = {
    initializeValidity
  };
})();
