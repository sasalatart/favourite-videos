(function() {
  'use strict'

  angular.module('favouriteVideos').directive('navBar', navBar);

  function navBar() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/navBar.html',
      controller: 'navbarController',
      controllerAs: 'navbarCtrl'
    }

    return directive;
  }
})();
