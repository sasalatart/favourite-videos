(function() {
  angular.module('favourite-videos').config(router);

  function router($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/welcome.html'
      }).
      when('/signup', {
        templateUrl: 'templates/signup.html'
      }).
      when('/login', {
        templateUrl: 'templates/login.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
})();
