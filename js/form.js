'use strict';

(function () {
  window.isRoomsOk = false;
  var checkfieldPrice = function (evt) {
    var value;
    if (!evt) {
      value = window.vars.fieldTypeSelect;
    } else {
      value = evt.currentTarget.value;
    }

    switch (value) {
      case 'flat':
        window.vars.fieldPrice.min = 1000;
        window.vars.fieldPrice.placeholder = 1000;
        break;
      case 'bungalo':
        window.vars.fieldPrice.min = 0;
        window.vars.fieldPrice.placeholder = 0;
        break;
      case 'house':
        window.vars.fieldPrice.min = 5000;
        window.vars.fieldPrice.placeholder = 5000;
        break;
      case 'palace':
        window.vars.fieldPrice.min = 10000;
        window.vars.fieldPrice.placeholder = 10000;
        break;
    }
  };

  function checkCapacity(rooms, capacity) {
    if (rooms.value === '1' && capacity.value !== '1') {
      return '1';
    }
    if (rooms.value === '2' &&
      (capacity.value !== '1' && capacity.value !==
        '2')) {
      return '2';
    }
    if (rooms.value === '3' &&
      (capacity.value !== '1' && capacity.value !== '2' && capacity.value !==
        '3')) {
      return '3';
    }
    if (rooms.value === '100' && capacity.value !==
      '0') {
      return '100';
    }
    return '0';
  }

  var checkNumberRooms = function () {
    var capacity = window.vars.fieldNumberCapacity;
    var error = checkCapacity(window.vars.fieldNumberRooms, window.vars.fieldNumberCapacity);
    if (error !== '0') {
      capacity.setCustomValidity(window.vars.customValidity[error]);
      capacity.reportValidity();
    } else {
      capacity.setCustomValidity('');
      window.isRoomsOk = true;
    }
  };
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');

  var checkTimeIn = function () {
    if (fieldTimeIn.value !== fieldTimeOut.value) {
      fieldTimeOut.value = fieldTimeIn.value;
    }
  };

  var checkTimeOut = function () {
    if (fieldTimeOut.value !== fieldTimeIn.value) {
      fieldTimeIn.value = fieldTimeOut.value;
    }
  };

  checkTimeIn();
  checkTimeOut();

  fieldTimeIn.addEventListener('change', checkTimeIn);
  fieldTimeOut.addEventListener('change', checkTimeOut);

  window.vars.fieldType.addEventListener('change', checkfieldPrice);
  window.vars.fieldNumberRooms.addEventListener('change', checkNumberRooms);
  window.vars.fieldNumberCapacity.addEventListener(
      'change', checkNumberRooms);
  window.checkNumberRooms = checkNumberRooms;
})();
