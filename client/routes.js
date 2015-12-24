(function() {
  angular.module('favouriteVideos').config(router);

  function router($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'welcome.html',
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
      when('/users/:user_id/videos/:video_id', {
        templateUrl: 'video.html',
        controller: 'videoController',
        controllerAs: 'videoCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
})();
