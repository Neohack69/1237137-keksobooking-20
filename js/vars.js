'use strict';

(function () {
  var FILE_TYPE = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];
  var FEATURES_TYPE = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var CUSTOM_VALIDITY = {
    '1': 'В одной комнате может разместиться только один гость',
    '2': 'В двух комнатах могут разместиться от одного до двух человек',
    '3': 'В трех комнатах могут разместиться от одного до трех человек',
    '100': '100 комнат не для гостей'
  };
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
    pinMaxX: PIN_MAX_X,
    fileType: FILE_TYPE,
    customValidity: CUSTOM_VALIDITY
  };
})();
