'use strict';

(function () {
  var mapPin = document.querySelector('.map__pins');
  var activatePin = document.querySelector('.map__pin--main');
  activatePin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.map.activateForms();
      window.makeCard.createPins();
      mapPin.appendChild(window.makeCard.fragment);
      window.form.checkNumberRooms();
      window.form.checkfieldPrice();
      addHandlersForPins();
    }
  });
  var addHandlersForPins = function () {
    var buttonPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var g = 0; g < buttonPin.length; g++) {
      buttonPin[g].id = g;
      buttonPin[g].addEventListener('click', function (evt) {
        window.map.pinPickHandler(evt);
      });
    }
  };

  activatePin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.activateForms();
      mapPin.appendChild(window.makeCard.fragment);
      window.form.checkNumberRooms();
      window.form.checkfieldPrice();
      addHandlersForPins();
    }
  });
  window.makePin = activatePin;
})();
