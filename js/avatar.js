'use strict';

(function () {
  var avatarChooser = document.querySelector('#avatar');
  var previewPlace = document.querySelector('.ad-form-header__preview');
  var preview = previewPlace.querySelector('img');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.vars.fileType.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var photoChooser = document.querySelector('#images');
  var photoPlace = document.querySelector('.ad-form__photo');
  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = window.vars.fileType.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var img = document.createElement('img', 'room__photo');
        img.src = reader.result;
        img.width = 80;
        photoPlace.appendChild(img);
      });
      reader.readAsDataURL(file);
    }
  });
})();
