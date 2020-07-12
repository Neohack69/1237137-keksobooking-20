'use strict';

(function () {
  var QUANTITY_OF_ADVERTISEMENT = 8;

  var FLAT_TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var CHECKIN_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var CHECKOUT_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES_TYPE = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var PIN_MAX_Y = 625;
  var PIN_MAX_X = 1165;

  var fieldType = document.querySelector('#type');
  var fieldTypeSelect = document.querySelector('#type option').value;
  var fieldPrice = document.querySelector('#price');
  var fieldNumberRooms = document.querySelector('#room_number');
  var fieldNumberCapacity = document.querySelector('#capacity');
  window.vars = {
    photos: PHOTOS,
    featuresType: FEATURES_TYPE,
    checkOutTime: CHECKOUT_TIME,
    checkInTime: CHECKIN_TIME,
    flatType: FLAT_TYPE,
    advNumber: QUANTITY_OF_ADVERTISEMENT,
    fieldType: fieldType,
    fieldTypeSelect: fieldTypeSelect,
    fieldPrice: fieldPrice,
    fieldNumberRooms: fieldNumberRooms,
    fieldNumberCapacity: fieldNumberCapacity,
    pinMaxY: PIN_MAX_Y,
    pinMaxX: PIN_MAX_X
  };
})();
