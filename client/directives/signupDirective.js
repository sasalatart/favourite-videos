(function() {
  'use strict';

  angular.module('favouriteVideos').directive('userSignup', userSignup);

  function userSignup() {
    var directive = {
      restrict: 'E',
      templateUrl: 'userSignup.html',
      controller: 'signupController',
      controllerAs: 'signupCtrl'
    }

    return directive;
  }
})();
