(function() {
  'use strict';

  angular.module('favouriteVideos').directive('userSignup', userSignup);

  function userSignup() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/userSignup.html',
      controller: signupController,
      controllerAs: 'signupCtrl'
    }

    return directive;
  }

  signupController.$inject = ['signupService', 'sessionService'];

  function signupController(signupService, sessionService) {
    var vm = this;
    vm.userForm = {};

    sessionService.identity().then(function(identity) {
      if (identity) {
        sessionService.redirectToRoot();
      } else {
        vm.submit = function() {
          signupService.signup(vm.userForm);
          vm.userForm = {};
        }
      }
    })
  }
})();
