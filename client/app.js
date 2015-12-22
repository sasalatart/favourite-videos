(function() {
  var app = angular.module('favourite-videos', ['ngRoute', 'ngResource']);

  require('./services/services');
  require('./directives/directives');
  require('./routes');
})();
