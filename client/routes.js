(function() {
  angular.module('favouriteVideos').config(router);

  function router($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeController',
        controllerAs: 'welcomeCtrl'
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
      when('/videos/:id', {
        templateUrl: 'templates/video.html',
        controller: 'videoController',
        controllerAs: 'videoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
})();
