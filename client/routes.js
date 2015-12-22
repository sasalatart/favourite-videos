(function() {
  angular.module('favourite-videos').config(router);

  function router($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/welcome.html'
      }).
      when('/signup', {
        template: '<user-signup></user-signup>'
      }).
      when('/login', {
        template: '<user-login></user-login>'
      }).
      when('/dashboard', {
        template: '<user-dashboard></user-dashboard>'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
})();
