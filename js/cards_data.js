'use strict';

(function () {
  var onError = function (message) {
    alert.error(message);
  };

  var onSuccess = function (data) {
    window.cardsData = data;
  };

  window.load(
      'https://javascript.pages.academy/keksobooking/data', onSuccess, onError);

})();
