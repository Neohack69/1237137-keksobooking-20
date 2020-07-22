'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (fun) {
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
