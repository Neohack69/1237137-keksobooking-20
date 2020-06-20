'use strict';

var flatType = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkinTime = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutTime = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresType = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

function getMockData(QUANTITY_OF_ADVERTISEMENT) {
  var advertisementMockArray = [];
  for (var i = 1; i < QUANTITY_OF_ADVERTISEMENT + 1; i++) {
    var arr = featuresType.slice(getRandomInt(0, 6), 6);
    var arr2 = photos.slice(getRandomInt(0, 3), 3);
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
        'type': flatType[getRandomInt(1, 5)],
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 11),
        'checkin': checkinTime[getRandomInt(1, 4)],
        'checkout': checkoutTime[getRandomInt(1, 4)],
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

var mockData = getMockData(8);

var map = document.querySelector('.map--faded');
map.classList.remove('map--faded');

var mapPin = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('button');

var fragment = document.createDocumentFragment();
for (var i = 0; i < QUANTITY_OF_ADVERTISEMENT; i++) {
  var element = template.cloneNode(true);
  element.style.left = mockData[i].location.x + 20 + 'px';
  element.style.top = mockData[i].location.y + 40 + 'px';
  element.querySelector('img').src = mockData[i].author.avatar;
  element.querySelector('img').alt = mockData[i].offer.title;
  fragment.appendChild(element);
}

mapPin.appendChild(fragment);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
