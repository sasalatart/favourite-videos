(function() {
  var app = angular.module('favouriteVideos', ['ngRoute', 'ngResource']);

  require('./factories/factories');
  require('./services/services');
  require('./directives/directives');
  require('./routes');
})();
