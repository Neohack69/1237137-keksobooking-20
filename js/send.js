'use strict';

(function () {
  var submitButton = document.querySelector('.ad-form');
  submitButton.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var form = document.querySelector('.ad-form');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://javascript.pages.academy/keksobooking');
    xhr.send(formData);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }
    });
  });

  function onSuccess() {
    var successTemplate = document.querySelector('#success').content
      .querySelector('.success');
    var fragment = successTemplate.cloneNode(true);
    document.querySelector('.map')
      .insertBefore(fragment, document.querySelector('.map__pins'));
    var closeButton = document.querySelector('.success');
    closeButton.addEventListener('click', closeModalClick);

    function closeModalClick() {
      var successNode = document.querySelector('.map');
      successNode.removeChild(fragment);
      window.map.disableForms(true);
    }
  }

  function onError() {
    var errorTemplate = document.querySelector('#error').content
      .querySelector('.error');
    var fragment = errorTemplate.cloneNode(true);
    document.querySelector('.map')
      .insertBefore(fragment, document.querySelector('.map__pins'));
    var closeButton = document.querySelector('.error__button');
    closeButton.addEventListener('click', closeErrorClick);
    // closeButton.addEventListener('keydown', closeErrorKeydown(evt));
    // function closeErrorKeydown(evt) {
    //   if (evt.key = 'Escape') {
    //     var errorNode = document.querySelector('.map');
    //     errorNode.removeChild(fragment);
    //   }
    // }
    function closeErrorClick() {
      var errorNode = document.querySelector('.map');
      errorNode.removeChild(fragment);
    }

    closeButton.removeEventListener(closeErrorClick); // тут сомнения
  }
})();
