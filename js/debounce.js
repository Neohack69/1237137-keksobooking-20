'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (fun) {
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
