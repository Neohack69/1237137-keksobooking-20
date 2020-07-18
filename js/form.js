'use strict';

(function () {
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

  var checkNumberRooms = function () {
    if (window.vars.fieldNumberRooms.value === '1' &&
      window.vars.fieldNumberCapacity.value !== '1') {
      window.vars.fieldNumberCapacity.setCustomValidity(
          'В одной комнате может разместиться только один гость');
      window.vars.fieldNumberCapacity.reportValidity();
    } else if (window.vars.fieldNumberRooms.value === '2' &&
      (window.vars.fieldNumberCapacity.value !== '1' &&
        window.vars.fieldNumberCapacity.value !==
        '2')) {
      window.vars.fieldNumberCapacity.setCustomValidity(
          'В двух комнатах могут разместиться от одного до двух человек');
      window.vars.fieldNumberCapacity.reportValidity();
    } else if (window.vars.fieldNumberRooms.value === '3' &&
      (window.vars.fieldNumberCapacity.value !== '1' &&
        window.vars.fieldNumberCapacity.value !== '2' &&
        window.vars.fieldNumberCapacity.value !== '3')) {
      window.vars.fieldNumberCapacity.setCustomValidity(
          'В трех комнатах могут разместиться от одного до трех человек');
      window.vars.fieldNumberCapacity.reportValidity();
    } else if (window.vars.fieldNumberRooms.value === '100' &&
      window.vars.fieldNumberCapacity.value !==
      '0') {
      window.vars.fieldNumberCapacity.setCustomValidity(
          '100 комнат не для гостей');
      window.vars.fieldNumberCapacity.reportValidity();
    } else {
      window.vars.fieldNumberCapacity.setCustomValidity('');
      window.vars.fieldNumberCapacity.reportValidity();
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
})();
