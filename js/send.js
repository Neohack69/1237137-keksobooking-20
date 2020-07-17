'use strict';

(function () {
  var submitButton = document.querySelector('.ad-form__submit');
  submitButton.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var form = document.querySelector('.ad-form');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://javascript.pages.academy/keksobooking');
    xhr.send(formData);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var onSuccess = document.querySelector('#success');
        var fragment = onSuccess.cloneNode(true);
        document.querySelector('.map')
          .insertBefore(fragment, document.querySelector('.promo'));
      } else {
        console.log('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      console.log('Произошла ошибка соединения');
    });
  });
})();
