(function() {
  'use strict'

  angular.module('favouriteVideos').directive('navBar', navBar);

  function navBar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'navBar.html',
      controller: 'navbarController',
      controllerAs: 'navbarCtrl'
    }

    return directive;
  }
})();
