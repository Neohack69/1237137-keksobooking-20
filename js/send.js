'use strict';

(function () {

  var submitButton = document.querySelector('.ad-form');
  submitButton.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.isRoomsOk) {
      var form = document.querySelector('.ad-form');
      var formData = new FormData(form);
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess();
        } else {
          onError();
        }
      });
      xhr.open('POST', 'https://javascript.pages.academy/keksobooking');
      xhr.send(formData);
    } else {
      window.checkNumberRooms();
    }
  });

  function onSuccess() {
    var successTemplate = document.querySelector('#success').content
      .querySelector('.success');
    var fragment = successTemplate.cloneNode(true);
    document.querySelector('.map')
      .insertBefore(fragment, document.querySelector('.map__pins'));
    var closeButton = document.querySelector('.success');
    closeButton.addEventListener('click', closeModalClick);
    document.addEventListener('keydown', closeSuccessKeydown);
    function closeSuccessKeydown(evt) {
      if (evt.key === 'Escape') {
        var errorNode = document.querySelector('.map');
        errorNode.removeChild(fragment);
        document.removeEventListener('keydown', closeSuccessKeydown);
        resetPage();
      }
    }
    function closeModalClick() {
      var successNode = document.querySelector('.map');
      successNode.removeChild(fragment);
      resetPage();
    }
  }

  function resetPage() {
    window.map.disableForms(true);
    window.isRendered = false;
    window.makePin.addEventListener('click', window.renderPins);
    window.vars.fieldPrice.value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
    window.vars.fieldNumberRooms.value = 1;
    window.vars.fieldNumberCapacity.value = 3;
    window.vars.fieldType.value = 'flat';
    window.isRoomsOk = false;
    document.querySelector('#housing-type').value = 'any';
    document.querySelector('#housing-price').value = 'any';
    document.querySelector('#housing-rooms').value = 'any';
    document.querySelector('#housing-guests').value = 'any';
  }

  function onError() {
    var errorTemplate = document.querySelector('#error').content
      .querySelector('.error');
    var fragment = errorTemplate.cloneNode(true);
    document.querySelector('.map')
      .insertBefore(fragment, document.querySelector('.map__pins'));
    var closeButton = document.querySelector('.error__button');
    closeButton.addEventListener('click', closeErrorClick);
    document.addEventListener('keydown', closeErrorKeydown);
    function closeErrorKeydown(evt) {
      if (evt.key === 'Escape') {
        var errorNode = document.querySelector('.map');
        errorNode.removeChild(fragment);
        document.removeEventListener('keydown', closeErrorKeydown);
      }
    }
    function closeErrorClick() {
      var errorNode = document.querySelector('.map');
      errorNode.removeChild(fragment);
      closeButton.removeEventListener(closeErrorClick);
    }
  }
})();
