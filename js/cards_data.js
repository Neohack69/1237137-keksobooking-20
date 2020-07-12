'use strict';

(function () {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getMockData(quantity) {
    var advertisementMockArray = [];
    for (var i = 1; i < quantity + 1; i++) {
      var arr = window.vars.featuresType.slice(getRandomInt(0, 6), 6);
      var arr2 = window.vars.photos.slice(getRandomInt(0, 3), 3);
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
          'type': window.vars.flatType[getRandomInt(1, 5)],
          'rooms': getRandomInt(1, 6),
          'guests': getRandomInt(1, 11),
          'checkin': window.vars.checkInTime[getRandomInt(1, 3)],
          'checkout': window.vars.checkOutTime[getRandomInt(1, 3)],
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

  window.cardsData = getMockData(window.vars.advNumber);
})();
