'use strict';

(function () {
  function disableForms(state) {
    var formFieldset1 = document.querySelector('.ad-form-header');
    formFieldset1.disabled = state;
    var formFieldset2 = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < formFieldset2.length; i++) {
      formFieldset2[i].disabled = state;
    }
    var formFieldset3 = document.querySelector('.map__filters');
    formFieldset3.disabled = state;

    if (!state) {
      var map = document.querySelector('.map--faded');
      if (map) {
        map.classList.remove('map--faded');
      }
      var formEnabled = document.querySelector('.ad-form--disabled');
      if (formEnabled) {
        formEnabled.classList.remove('ad-form--disabled');
      }
    }
  }

  function activateForms() {
    disableForms(false);
    var address = document.querySelector('#address');
    var top = parseInt(window.makePin.style.top, 10) + 54;
    address.setAttribute(
        'value',
        top + ', ' + parseInt(window.makePin.style.left, 10));
  }

  var pinClickHandler = function (evt) {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      currentCard.remove();
    }
    var currentPin = parseInt(evt.currentTarget.id, 10);
    window.makeCard.render(currentPin);

    var popupCloseKeydownHandler = function (evt2) {
      evt2.preventDefault();
      if (evt2.key === 'Escape') {
        popupCloseClickHandler(evt2);
      }
    };
    var popup = document.querySelector('.popup');
    var popupClose = popup.querySelector('.popup__close');
    var popupCloseClickHandler = function () {
      popup.remove();
      popupClose.removeEventListener('click', popupCloseClickHandler);
      document.removeEventListener('keydown', popupCloseKeydownHandler);
    };
    popupClose.addEventListener('click', popupCloseClickHandler);
    document.addEventListener('keydown', popupCloseKeydownHandler);
  };
  var setAddress = function () {
    var address = document.querySelector('#address');
    var top = parseInt(window.makePin.style.top, 10) + 54;
    var left = parseInt(window.makePin.style.left, 10) + 31;
    address.setAttribute(
        'value',
        top + ', ' + left);
  };

  disableForms(true);
  window.map = {
    pinPickHandler: pinClickHandler,
    activateForms: activateForms,
    setAddress: setAddress,
  };
})();
