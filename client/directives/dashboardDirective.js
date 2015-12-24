(function() {
  'use strict'

  angular.module('favouriteVideos').directive('userDashboard', userDashboard);

  function userDashboard() {
    var directive = {
      restrict: 'E',
      templateUrl: 'userDashboard.html',
      controller: 'dashboardController',
      controllerAs: 'dashboardCtrl'
    }

    return directive;
  }
})();
