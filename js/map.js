'use strict';

(function () {
  var map = document.querySelector('.map');
  var pins = map.querySelector('.map__pins');
  var disableForms = function (state) {
    var formHeader = document.querySelector('.ad-form-header');
    formHeader.disabled = state;
    var mapFilters = document.querySelectorAll('.map__filter');
    mapFilters.forEach(function (input) {
      input.disabled = state;
    });
    var formInputs = document.querySelectorAll('.ad-form__element');
    formInputs.forEach(function (input) {
      input.disabled = state;
    });
    var mapFaded = document.querySelector('.map--faded');
    var formEnabled = document.querySelector('.ad-form--disabled');
    if (!state) {
      if (mapFaded) {
        mapFaded.classList.remove('map--faded');
      }
      if (formEnabled) {
        formEnabled.classList.remove('ad-form--disabled');
      }
    } else {
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      var buttonPin = document.querySelectorAll(
          '.map__pin:not(.map__pin--main)');
      buttonPin.forEach(function (pin) {
        pin.remove();
      });
    }
  };

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
    disableForms: disableForms,
    pins: pins,
  };
})();
