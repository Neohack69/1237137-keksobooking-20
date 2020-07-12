'use strict';

(function () {
  function fillCard(cardNumber) {
    var templateCard = document.querySelector('#card').content
      .querySelector('article');
    var elementCard = templateCard.cloneNode(true);
    var card = window.cardsData[cardNumber];
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

    var arr = [];

    for (var i = 0; i < window.vars.featuresType.length; i++) {
      if (card.offer.features.indexOf(window.featuresType[i]) === -1) {
        arr.push(window.featuresType[i]);
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

  var template = document.querySelector('#pin').content.querySelector('button');

  var fragment = document.createDocumentFragment();
  for (var i = 1; i < 8; i++) {
    var element = template.cloneNode(true);
    element.style.left = window.cardsData[i].location.x + 20 + 'px';
    element.style.top = window.cardsData[i].location.y + 40 + 'px';
    element.querySelector('img').src = window.cardsData[i].author.avatar;
    element.querySelector('img').alt = window.cardsData[i].offer.title;
    fragment.appendChild(element);
  }

  window.makeCard = {
    render: function (cardNumber) {
      renderCards(fillCard(cardNumber));
    },
    fragment: fragment
  };
})();
