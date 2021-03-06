// backend.js
"use strict";

(function() {
  const URL = "https://js.dump.academy/kekstagram";
  const XHR_TIMEOUT = 10000;
  /**
   * create XMLHTTPRequest
   * @param method
   * @param url
   * @param onLoad
   * @param onError
   * @returns {XMLHttpRequest}
   */
  const createXHR = (method, url, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(`The status of response ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener("error", () => {
      onError(`Connection error occurred`);
    });

    xhr.addEventListener("timeout", () => {
      onError(
        `the request did not manage to be executed for ${xhr.timeout} ms`
      );
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);
    return xhr;
  };
  /**
   * Upload data
   * @param onLoad
   * @param onError
   */
  const upLoad = (onLoad, onError) => {
    const urlGet = `${URL}/data`;
    createXHR("GET", urlGet, onLoad, onError).send();
  };
  /**
   * Send data
   * @param data
   * @param onLoad
   * @param onError
   */
  const downLoad = (data, onLoad, onError) => {
    createXHR("POST", URL, onLoad, onError).send(data);
  };

  window.backend = {
    upLoad,
    downLoad
  };
})();
