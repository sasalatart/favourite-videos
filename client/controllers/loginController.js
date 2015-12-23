(function() {
  'use strict'

  angular.module('favouriteVideos').controller('loginController', loginController);

  loginController.$inject = ['sessionService'];

  function loginController(sessionService) {
    var vm = this;
    vm.userForm = {};

    sessionService.identity().then(function(identity) {
      if (identity) {
        sessionService.redirectToRoot();
      } else {
        vm.login = function() {
          sessionService.login(vm.userForm);
          vm.userForm = {};
        }
      }
    });
  }
})();
