(function() {
  var app = angular.module('favouriteVideos', ['ngRoute', 'ngResource']);

  require('./filters/filters');
  require('./factories/factories');
  require('./services/services');
  require('./controllers/controllers');
  require('./directives/directives');
  require('./routes');
})();
