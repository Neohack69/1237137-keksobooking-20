'use strict';

var QUANTITY_OF_ADVERTISEMENT = 8;
var CARD_NUMBER = 0;

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
        'checkin': CHECKIN_TIME[getRandomInt(1, 4)],
        'checkout': CHECKOUT_TIME[getRandomInt(1, 4)],
        'features': arr,
        'description': 'Описание ' + i,
        'photos': arr2,
      },
      'location': {
        'x': x,
        'y': y
      }
    };
    arr = null;
    arr2 = null;
    advertisementMockArray.push(newAdvertisement);
    newAdvertisement = null;
  }
  return advertisementMockArray;
}

var mockData = getMockData(QUANTITY_OF_ADVERTISEMENT);

var map = document.querySelector('.map--faded');
map.classList.remove('map--faded');

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

mapPin.appendChild(fragment);

function fillCard(cardNumber) {
  var fragmentCard = document.createDocumentFragment();
  var templateCard = document.querySelector('#card').content.querySelector('article');
  var elementCard = templateCard.cloneNode(true);
  var card = mockData[cardNumber];
  elementCard.querySelector('.popup__title').textContent = card.offer.title;
  elementCard.querySelector('.popup__text--address').textContent = card.offer.address;
  elementCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  switch (card.offer.type) {
    case 'flat': elementCard.querySelector('.popup__type').textContent = 'Квартира'; break;
    case 'bungalo': elementCard.querySelector('.popup__type').textContent = 'Бунгало'; break;
    case 'house': elementCard.querySelector('.popup__type').textContent = 'Дом'; break;
    case 'palace': elementCard.querySelector('.popup__type').textContent = 'Дворец'; break;
  }
  elementCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  elementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var arr = [];

  for (var j = 0; j < FEATURES_TYPE.length; j++) {
    if (card.offer.features.indexOf(FEATURES_TYPE[j]) === -1) {
      arr.push(FEATURES_TYPE[j]);
    }
  }

  for (var g = 0; g < arr.length; g++) {
    elementCard.querySelector('.popup__feature--' + arr[g]).remove();
  }

  for (var a = 0; a < card.offer.photos.length; a++) {
    elementCard.querySelector('.popup__photo').src = card.offer.photos[a];
    elementCard.querySelector('.popup__photos').appendChild(element.querySelector('.popup__photo'));
  } /*  Тут сомневаюсь  */

  elementCard.querySelector('.popup__description').textContent = card.offer.description;
  elementCard.querySelector('.popup__avatar').src = card.author.avatar;

  fragmentCard.appendChild(elementCard);
}

/* Тут надо добавить вставку "Вставьте полученный DOM-элемент в блок .map перед блоком .map__filters-container."
Но я не понял все именно туда вставить.
 */


fillCard(CARD_NUMBER);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
