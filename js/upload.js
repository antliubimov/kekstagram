// upload.js
"use strict";

(function() {
  const FILE_TYPES = ["gif", "jpg", "jpeg", "png"];
  const uploadFileChooser = document.querySelector("#upload-file");
  const imgPreview = document.querySelector(".img-upload__preview img");
  const effectPreview = document.querySelectorAll(".effects__preview");

  const onUploadFileChooserChange = () => {
    const file = uploadFileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(type => fileName.endsWith(type));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener("load", function() {
        imgPreview.src = reader.result;
        [...effectPreview].forEach(
          effect => (effect.style.backgroundImage = `url(${reader.result})`)
        );
      });

      reader.readAsDataURL(file);
    }
  };

  window.upload = {
    onUploadFileChooserChange
  };
})();
