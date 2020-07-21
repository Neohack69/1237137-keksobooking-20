'use strict';

(function () {

  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');
  var housingFeatures = formFilters.querySelector('.map__features');

  var compareTwoArray = function (arr1, arr2) {
    var result = true;
    var currentValue;
    for (var i = 0; i < arr1.length; i++) {
      currentValue = arr2.indexOf(arr1[i]);
      if (currentValue === -1) {
        result = false;
      }
    }
    return result;
  };

  var applyFilter = function () {
    var pin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.remove();
    }

    for (var i = 0; i < pin.length; i++) {
      window.map.pins.removeChild(pin[i]);
    }

    var filterType = window.cardsData.filter(function (arr) {

      var type = housingType.value;
      if (type === 'any') {
        return arr.offer.type;
      }
      return arr.offer.type === type;
    }).filter(function (arr) {
      var interval = housingPrice.value;
      var fromPrice;
      var toPrice;

      switch (interval) {
        case 'middle':
          fromPrice = 10000;
          toPrice = 50000;
          break;
        case 'low':
          fromPrice = 0;
          toPrice = 10000;
          break;
        case 'high':
          fromPrice = 50000;
          toPrice = Infinity;
          break;
        case 'any':
          fromPrice = 0;
          toPrice = Infinity;
          break;
      }
      return (arr.offer.price <= toPrice) && (arr.offer.price >= fromPrice);
    }).filter(function (arr) {
      var rooms = housingRooms.value;
      if (rooms === 'any') {
        return arr.offer.rooms;
      }
      return arr.offer.rooms === parseInt(rooms, 10);
    }).filter(function (arr) {
      var guests = housingGuests.value;
      if (guests === 'any') {
        return arr.offer.guests;
      }
      return arr.offer.guests === parseInt(guests, 10);
    }).filter(function (arr) {
      var checkedFeatures = document.querySelectorAll(
        'input[type=checkbox]:checked');
      var features = [];

      if (checkedFeatures.length === 0) {
        return arr.offer.features;
      } else {
        for (i = 0; i < checkedFeatures.length; i++) {
          features.push(checkedFeatures[i].value);
        }
      }
      return compareTwoArray(features, arr.offer.features);
    }).slice(0, 5);

    window.cardsDataSliced = filterType;
    window.makeCard.createPins(window.cardsDataSliced);
    window.addHandlersForPins();
  };

  var onChangeFilters = function () {
    window.debounce(applyFilter);
  };

  housingType.addEventListener('change', onChangeFilters);
  housingPrice.addEventListener('change', onChangeFilters);
  housingRooms.addEventListener('change', onChangeFilters);
  housingGuests.addEventListener('change', onChangeFilters);
  housingFeatures.addEventListener('change', onChangeFilters);

})();
