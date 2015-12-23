(function() {
  'use strict'

  angular.module('favouriteVideos').controller('signupController', signupController);

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
