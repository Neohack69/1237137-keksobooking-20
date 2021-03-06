'use strict';

(function () {
  var onError = function (message) {
    alert.error(message);
  };

  window.isRendered = false;
  window.cardsData = [];

  var onSuccess = function (data) {
    window.cardsData = data;
    window.cardsDataSliced = data.slice(0, 5);
    renderPins();
  };

  var activatePin = document.querySelector('.map__pin--main');

  var renderPins = function () {
    activatePin.removeEventListener('click', renderPins);
    if (!window.cardsData.length) {
      window.load(
          'https://javascript.pages.academy/keksobooking/data', onSuccess,
          onError);
    }
    if (window.cardsData.length && !window.isRendered) {
      window.makeCard.createPins(window.cardsDataSliced);
      addHandlersForPins();
      window.isRendered = true;
    }
  };

  activatePin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activateForms();
    }
  });
  activatePin.addEventListener('click', renderPins);

  var addHandlersForPins = function () {
    var buttonPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    buttonPin.forEach(function (pin, i) {
      pin.id = i;
      pin.addEventListener('click', function (evt) {
        window.map.pinPickHandler(evt);
      });
    });
  };

  activatePin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.activateForms();
    }
  });
  window.makePin = activatePin;
  window.renderPins = renderPins;
  window.addHandlersForPins = addHandlersForPins;
})();
