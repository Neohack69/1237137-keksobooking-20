'use strict';

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

function getMockData(quantity) {
  var advertisementMockArray = [];
  for (var i = 1; i < quantity + 1; i++) {
    var arr = FEATURES_TYPE.slice(getRandomInt(0, 6), 6);
    var arr2 = PHOTOS.slice(getRandomInt(0, 3), 3);
    var x = getRandomInt(0, 600);
    var y = getRandomInt(130, 630);
    var newAdvertisement = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },
      'offer': {
        'title': 'Предложение ' + i,
        'address': x + ', ' + y,
        'price': getRandomInt(100, 1000),
        'type': FLAT_TYPE[getRandomInt(1, 5)],
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 11),
        'checkin': CHECKIN_TIME[getRandomInt(1, 3)],
        'checkout': CHECKOUT_TIME[getRandomInt(1, 3)],
        'features': arr,
        'description': 'Описание ' + i,
        'photos': arr2,
      },
      'location': {
        'x': x, 'y': y,
      },
    };
    arr = null;
    arr2 = null;
    advertisementMockArray.push(newAdvertisement);
    newAdvertisement = null;
  }
  return advertisementMockArray;
}

var mockData = getMockData(QUANTITY_OF_ADVERTISEMENT);

var mapPin = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');

var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  var element = template.cloneNode(true);
  element.style.left = mockData[i].location.x + 20 + 'px';
  element.style.top = mockData[i].location.y + 40 + 'px';
  element.querySelector('img').src = mockData[i].author.avatar;
  element.querySelector('img').alt = mockData[i].offer.title;
  fragment.appendChild(element);
}

function fillCard(cardNumber) {
  var templateCard = document.querySelector('#card').content
    .querySelector('article');
  var elementCard = templateCard.cloneNode(true);
  var card = mockData[cardNumber];
  elementCard.querySelector('.popup__title').textContent = card.offer.title;
  elementCard.querySelector(
      '.popup__text--address').textContent = card.offer.address;
  elementCard.querySelector(
      '.popup__text--price').textContent = card.offer.price + '₽/ночь';
  switch (card.offer.type) {
    case 'flat':
      elementCard.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      elementCard.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      elementCard.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      elementCard.querySelector('.popup__type').textContent = 'Дворец';
      break;
  }
  elementCard.querySelector(
      '.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' +
    card.offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' +
    card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var arr = [];

  for (i = 0; i < FEATURES_TYPE.length; i++) {
    if (card.offer.features.indexOf(FEATURES_TYPE[i]) === -1) {
      arr.push(FEATURES_TYPE[i]);
    }
  }

  for (i = 0; i < arr.length; i++) {
    elementCard.querySelector('.popup__feature--' + arr[i]).remove();
  }

  for (i = 0; i < card.offer.photos.length; i++) {
    var img = document.createElement('img', 'popup__photo');
    img.src = card.offer.photos[i];
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';
    elementCard.querySelector('.popup__photos').appendChild(img);
  }

  elementCard.querySelector(
      '.popup__description').textContent = card.offer.description;
  elementCard.querySelector('.popup__avatar').src = card.author.avatar;

  return elementCard;
}

function renderCards(fragmentCard) {
  var mapCard = document.querySelector('.map');
  var mapCard2 = document.querySelector('.map__filters-container');
  mapCard.insertBefore(fragmentCard, mapCard2);
}

function disableForms(state) {
  var formFieldset1 = document.querySelector('.ad-form-header');
  formFieldset1.disabled = state;
  var formFieldset2 = document.querySelectorAll('.ad-form__element');
  for (i = 0; i < formFieldset2.length; i++) {
    formFieldset2[i].disabled = state;
  }
  var formFieldset3 = document.querySelector('.map__filters');
  formFieldset3.disabled = state;

  if (!state) {
    var map = document.querySelector('.map--faded');
    map.classList.remove('map--faded');

    var formEnabled = document.querySelector('.ad-form--disabled');
    formEnabled.classList.remove('ad-form--disabled');
  }
}

function activateForms() {
  disableForms(false);
  var address = document.querySelector('#address');
  var top = parseInt(activatePin.style.top, 10) + 54;
  address.setAttribute(
      'value',
      top + ', ' + parseInt(activatePin.style.left, 10));
}

var activatePin = document.querySelector('.map__pin--main');
activatePin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateForms();
    mapPin.appendChild(fragment);
    fieldType.addEventListener('change', checkfieldPrice);
    fieldNumberRooms.addEventListener('change', checkNumberRooms);
    fieldNumberCapacity.addEventListener('change', checkNumberRooms);

    addHandlersForPins();
  }
});

activatePin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activateForms();
  }
});

var fieldType = document.querySelector('#type');
var fieldTypeSelect = document.querySelector('#type option').value;
var fieldPrice = document.querySelector('#price');

var checkfieldPrice = function (evt) {
  var value;
  if (!evt) {
    value = fieldTypeSelect;
  } else {
    value = evt.currentTarget.value;
  }

  switch (value) {
    case 'flat':
      fieldPrice.min = 1000;
      fieldPrice.placeholder = 1000;
      break;
    case 'bungalo':
      fieldPrice.min = 0;
      fieldPrice.placeholder = 0;
      break;
    case 'house':
      fieldPrice.min = 5000;
      fieldPrice.placeholder = 5000;
      break;
    case 'palace':
      fieldPrice.min = 10000;
      fieldPrice.placeholder = 10000;
      break;
  }
};

checkfieldPrice();

var fieldNumberRooms = document.querySelector('#room_number');
var fieldNumberCapacity = document.querySelector('#capacity');

var checkNumberRooms = function () {
  if (fieldNumberRooms.value === '1' && fieldNumberCapacity.value !== '1') {
    fieldNumberCapacity.setCustomValidity(
        'В одной комнате может разместиться только один гость');
  } else if (fieldNumberRooms.value === '2' &&
    (fieldNumberCapacity.value !== '1' && fieldNumberCapacity.value !== '2')) {
    fieldNumberCapacity.setCustomValidity(
        'В двух комнатах могут разместиться от одного до двух человек');
  } else if (fieldNumberRooms.value === '3' &&
    (fieldNumberCapacity.value !== '1' && fieldNumberCapacity.value !== '2' &&
      fieldNumberCapacity.value !== '3')) {
    fieldNumberCapacity.setCustomValidity(
        'В трех комнатах могут разместиться от одного до трех человек');
  } else if (fieldNumberRooms.value === '100' && fieldNumberCapacity.value !==
    '0') {
    fieldNumberCapacity.setCustomValidity('100 комнат не для гостей');
  } else {
    fieldNumberCapacity.setCustomValidity('');
  }
};

checkNumberRooms();

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


var addHandlersForPins = function () {
  var buttonPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var g = 0; g < buttonPin.length; g++) {
    buttonPin[g].id = g;
    buttonPin[g].addEventListener('click', pinClickHandler);
  }
};

var pinClickHandler = function (evt) {
  var currentCard = document.querySelector('.map__card');
  if (currentCard) {
    currentCard.remove();
  }
  var currentPin = parseInt(evt.currentTarget.id, 10);
  renderCards(fillCard(currentPin));

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

fieldTimeIn.addEventListener('change', checkTimeIn);
fieldTimeOut.addEventListener('change', checkTimeOut);

disableForms(true);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
