'use strict';
(function () {
  window.makePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var endCoords = {
        x: window.makePin.offsetLeft - shift.x,
        y: window.makePin.offsetTop - shift.y,
      };

      if ((endCoords.y < window.vars.pinMaxY) && (endCoords.y > 100)) {
        window.makePin.style.top = (window.makePin.offsetTop - shift.y) + 'px';
      }
      if ((endCoords.x < window.vars.pinMaxX) && (endCoords.x > -30)) {
        window.makePin.style.left = (window.makePin.offsetLeft - shift.x) +
          'px';
      }
      window.map.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
