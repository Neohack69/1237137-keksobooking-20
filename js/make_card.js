'use strict';

(function () {
  function fillCard(cardNumber) {
    var templateCard = document.querySelector('#card').content
      .querySelector('article');
    var elementCard = templateCard.cloneNode(true);
    var card = window.cardsDataSliced[cardNumber];
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
        '.popup__text--capacity').textContent = card.offer.rooms +
      ' комнаты для ' +
      card.offer.guests + ' гостей';
    elementCard.querySelector(
        '.popup__text--time').textContent = 'Заезд после ' +
      card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresArray = [];

    for (var i = 0; i < 6; i++) {
      if (card.offer.features.indexOf(window.vars.featuresType[i]) === -1) {
        featuresArray.push(window.vars.featuresType[i]);
      }
    }

    for (i = 0; i < featuresArray.length; i++) {
      elementCard.querySelector('.popup__feature--' + featuresArray[i]).remove();
    }
    card.offer.photos.forEach(function (photo) {
      var img = document.createElement('img', 'popup__photo');
      img.src = photo;
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      elementCard.querySelector('.popup__photos').appendChild(img);
    });
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

  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  var mapPin = document.querySelector('.map__pins');

  function createPins(dataArray) {
    dataArray.forEach(function (dataItem) {
      var element = template.cloneNode(true);
      element.style.left = dataItem.location.x + 20 + 'px';
      element.style.top = dataItem.location.y + 40 + 'px';
      element.querySelector('img').src = dataItem.author.avatar;
      element.querySelector('img').alt = dataItem.offer.title;
      fragment.appendChild(element);
    });
    // for (var i = 0; i < dataArray.length; i++) {
    //   var element = template.cloneNode(true);
    //   element.style.left = dataArray[i].location.x + 20 + 'px';
    //   element.style.top = dataArray[i].location.y + 40 + 'px';
    //   element.querySelector('img').src = dataArray[i].author.avatar;
    //   element.querySelector('img').alt = dataArray[i].offer.title;
    //   fragment.appendChild(element);
    // }
    mapPin.appendChild(fragment);
  }

  window.makeCard = {
    render: function (cardNumber) {
      renderCards(fillCard(cardNumber));
    },
    createPins: createPins
  };
})();
