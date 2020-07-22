'use strict';

(function () {

  var formFilters = document.querySelector('.map__filters');
  var housingType = formFilters.querySelector('#housing-type');
  var housingPrice = formFilters.querySelector('#housing-price');
  var housingRooms = formFilters.querySelector('#housing-rooms');
  var housingGuests = formFilters.querySelector('#housing-guests');
  var housingFeatures = formFilters.querySelector('.map__features');
  var compareTwoArray = function (first, second) {
    var result = true;
    var currentValue;
    for (var i = 0; i < first.length; i++) {
      currentValue = second.indexOf(first[i]);
      if (currentValue === -1) {
        result = false;
      }
    }
    return result;
  };
  var filterByType = function (data) {
    if (housingType.value === 'any') {
      return data.offer.type;
    }
    return data.offer.type === housingType.value;
  };

  var filterByPrice = function (data) {
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
    return (data.offer.price <= toPrice) && (data.offer.price >= fromPrice);
  };
  var filterByRooms = function (data) {
    var rooms = housingRooms.value;
    if (rooms === 'any') {
      return data.offer.rooms;
    }
    return data.offer.rooms === parseInt(rooms, 10);
  };
  var filterByGuests = function (data) {
    var guests = housingGuests.value;
    if (guests === 'any') {
      return data.offer.guests;
    }
    return data.offer.guests === parseInt(guests, 10);
  };
  var filterByFeatures = function (data) {
    var checkedFeatures = document.querySelectorAll(
        'input[type=checkbox]:checked');
    var features = [];

    if (checkedFeatures.length === 0) {
      return data.offer.features;
    } else {
      checkedFeatures.forEach(function (item) {
        features.push(item.value);
      });
    }
    return compareTwoArray(features, data.offer.features);
  };

  var applyFilter = function () {
    var pin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.remove();
    }
    pin.forEach(function (el, number) {
      window.map.pins.removeChild(pin[number]);
    });
    function composeAndFilter(filters) {
      return function (x) {
        for (var i = 0; i < filters.length; i++) {
          if (!filters[i](x)) {
            return false;
          }
        }
        return true;
      };
    }
    var filteredData = window.cardsData
      .filter(composeAndFilter([filterByType, filterByPrice, filterByRooms, filterByGuests, filterByFeatures]));
    filteredData = filteredData.slice(0, 5);

    window.cardsDataSliced = filteredData;
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
