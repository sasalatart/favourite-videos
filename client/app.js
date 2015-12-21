(function() {
  var app = angular.module('favourite-videos', ['ngRoute']);

  require('./routes');
  require('./services/services');
  require('./directives/directives');
})();
