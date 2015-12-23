(function() {
  'use strict'

  angular.module('favouriteVideos').directive('userLogin', userLogin);

  function userLogin() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/userLogin.html',
      controller: 'loginController',
      controllerAs: 'loginCtrl'
    }

    return directive;
  }
})();
