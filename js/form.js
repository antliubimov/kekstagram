// form.js
"use strict";

(function() {
  const EFFECTS = {
    chrome: {
      min: 0,
      max: 1,
      setFilter: value => `grayscale(${value})`
    },
    sepia: {
      min: 0,
      max: 1,
      setFilter: value => `sepia(${value})`
    },
    marvin: {
      min: 0,
      max: 100,
      setFilter: value => `invert(${value}%)`
    },
    phobos: {
      min: 0,
      max: 3,
      setFilter: value => `blur(${value}px)`
    },
    heat: {
      min: 1,
      max: 3,
      setFilter: value => `brightness(${value})`
    },
    none: {
      min: 0,
      max: 0,
      setFilter: () => `none`
    }
  };
  const EFFECT_LEVEL = {
    MIN: 0,
    MAX: 100
  };

  let currentPictureClass;
  let currentEffect;
  /*
   *  Upload the photo and add a effect to it
   * */

  const uploadForm = document.querySelector(".img-upload__form");
  const uploadFileButton = document.querySelector("#upload-file");
  const imgUploadPanel = document.querySelector(".img-upload__overlay");
  const imgUploadPicture = document.querySelector(".img-upload__preview > img");
  const effectItems = document.querySelectorAll(".effects__item > input");
  const defaultEffect = document.querySelector("#effect-none");
  const uploadCancel = document.querySelector("#upload-cancel");
  const scalePanel = document.querySelector(".img-upload__scale");
  const scalePin = document.querySelector(".scale__pin");
  const scaleValue = document.querySelector(".scale__value");
  const scaleLevel = document.querySelector(".scale__level");
  const hashTagsField = document.querySelector(".text__hashtags");
  const commentField = document.querySelector(".text__description");
  const uploadSubmit = document.querySelector("#upload-submit");
  const decreaseSizeButton = document.querySelector(".resize__control--minus");
  const increaseSizeButton = document.querySelector(".resize__control--plus");

  /**
   * Return the scaled value for the effect according to effectName
   * @param {number} value Value before scaling: from 0 to 100
   * @param {string} effectName
   * @returns {number} The scaling number
   */
  const getEffectValue = (value, effectName) => {
    const effect = EFFECTS[effectName];
    return effect.min + (value * (effect.max - effect.min)) / EFFECT_LEVEL.MAX;
  };

  /**
   * Set the css-style on the upload picture according to effect
   * @param {string} effectName
   */
  const setPictureEffect = effectName => {
    const effectValue = getEffectValue(scaleValue.value, effectName);
    imgUploadPicture.style.filter = EFFECTS[effectName].setFilter(effectValue);
  };

  /**
   * Sets the class of the loaded image according to effectName
   * @param {string} effectName
   */
  const setPictureClass = effectName => {
    if (currentPictureClass) {
      imgUploadPicture.classList.remove(currentPictureClass);
    }
    currentEffect = effectName;
    imgUploadPicture.classList.add(`effects__preview--${effectName}`);
    currentPictureClass = `effects__preview--${effectName}`;
  };

  /**
   * Hide scale panel
   */
  const hide = () => {
    scalePanel.classList.add("hidden");
    scalePin.removeEventListener("mousedown", onScalePinMouseDown);
  };
  /**
   * Show scale panel
   */
  const show = () => {
    if (scalePanel.classList.contains("hidden")) {
      scalePanel.classList.remove("hidden");
      scalePin.addEventListener("mousedown", onScalePinMouseDown);
    }
  };

  /**
   * Add eventlisteners on effectItems and set the class and the effect on the upload image
   */
  const initializeEffects = () => {
    [...effectItems].forEach(effectsItem =>
      effectsItem.addEventListener("click", onEffectsItemClick)
    );
    decreaseSizeButton.addEventListener("click", window.resize.onDecreaseSizeButtonClick);
    increaseSizeButton.addEventListener("click", window.resize.onIncreaseSizeButtonClick);
    defaultEffect.checked = true;
    setPictureClass(defaultEffect.value);
    setPictureEffect(defaultEffect.value);
    hide();
  };

  /**
   * Change on uploadFile-input
   */
  const onUploadFileChange = () => {
    imgUploadPanel.classList.remove("hidden");
    window.upload.onUploadFileChooserChange();
    initializeEffects();
    window.formValidity.initializeValidity();
    uploadCancel.addEventListener("click", onUploadCancelClick);
    document.addEventListener("keydown", onImgUploadEscDown);
  };

  /**
   * Set the pin position and change css-style for scalePin and scaleLevel
   * @param {number} value The value from 0 to 100 %
   */
  const setPinPosition = value => {
    scaleValue.value = value;
    scalePin.style.left = `${value}%`;
    scaleLevel.style.width = `${value}%`;
  };

  /**
   * Handles effect click on the upload form
   * @param {Event} evt
   */
  const onEffectsItemClick = evt => {
    const selectedEffect = evt.target.value;
    if (selectedEffect === defaultEffect.value) {
      hide();
    } else {
      show();
    }
    setPinPosition(EFFECT_LEVEL.MAX);
    setPictureClass(selectedEffect);
    setPictureEffect(selectedEffect);
  };

  /**
   * remove Eventlisteners on effectItems when the upload form is closed
   */
  const finalizeEffects = () => {
    [...effectItems].forEach(effectsItem =>
      effectsItem.removeEventListener("click", onEffectsItemClick)
    );
    decreaseSizeButton.removeEventListener("click", window.resize.onDecreaseSizeButtonClick);
    increaseSizeButton.removeEventListener("click", window.resize.onIncreaseSizeButtonClick);
  };

  /**
   * Close image's upload form
   */
  const imgUploadClose = () => {
    uploadFileButton.value = "";
    imgUploadPanel.classList.add("hidden");
    uploadCancel.removeEventListener("click", onUploadCancelClick);
    document.removeEventListener("keydown", onImgUploadEscDown);
    finalizeEffects();
  };

  /**
   * Click on Esc-button when the upload form is opened
   * @param {Event} evt
   */
  const onImgUploadEscDown = evt => {
    if (
      document.activeElement !== commentField &&
      document.activeElement !== hashTagsField
    ) {
      window.utils.downEsc(evt, imgUploadClose);
    }
  };
  /**
   *  Click on the Cancel Button when the upload form is opened
   */
  const onUploadCancelClick = () => {
    imgUploadClose();
  };

  uploadFileButton.addEventListener("change", onUploadFileChange);

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
        setPictureEffect(currentEffect);
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

  const onLoadForm = () => {
    imgUploadClose();
  };

  const uploadMessageError = document.querySelector(
    ".img-upload__message--error"
  );

  const onErrorHandler = errorMessage => {
    uploadMessageError.classList.remove("hidden");
    console.log(errorMessage);
    imgUploadClose();
  };

  const onUploadSubmitClick = evt => {
    window.backend.downLoad(
      new FormData(uploadForm),
      onLoadForm,
      onErrorHandler
    );
    evt.preventDefault();
  };

  uploadSubmit.addEventListener("click", onUploadSubmitClick);
})();
