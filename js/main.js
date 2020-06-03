'use strict';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //  Максимум не включается, минимум включается
}

var flatType = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresType = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

for (var i = 1; i <= 8; i++) {
  var arr = featuresType.slice(getRandomInt(0, 6), 6);
  var arr2 = photos.slice(getRandomInt(0, 3), 3);
  var newAdvertisement = {
    'author': {
      'avatar': 'img/avatars/user' + i + '.png',
    },
    'offer': {
      'title': 'Предложение ' + i,
      'address': '600, 300',
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
      'x': getRandomInt(0, 600),
      'y': getRandomInt(130, 630)
    }
  };
  arr = null;
}

var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');

