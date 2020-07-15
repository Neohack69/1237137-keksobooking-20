'use strict';
// для коммита
(function () {
  var FEATURES_TYPE = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PIN_MAX_Y = 625;
  var PIN_MAX_X = 1165;

  var fieldType = document.querySelector('#type');
  var fieldTypeSelect = document.querySelector('#type option').value;
  var fieldPrice = document.querySelector('#price');
  var fieldNumberRooms = document.querySelector('#room_number');
  var fieldNumberCapacity = document.querySelector('#capacity');
  window.vars = {
    featuresType: FEATURES_TYPE,
    fieldType: fieldType,
    fieldTypeSelect: fieldTypeSelect,
    fieldPrice: fieldPrice,
    fieldNumberRooms: fieldNumberRooms,
    fieldNumberCapacity: fieldNumberCapacity,
    pinMaxY: PIN_MAX_Y,
    pinMaxX: PIN_MAX_X
  };
})();
