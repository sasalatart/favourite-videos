(function() {
  'use strict'

  angular.module('favouriteVideos').directive('userLogin', userLogin);

  function userLogin() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/userLogin.html',
      controller: loginController,
      controllerAs: 'loginCtrl'
    }

    return directive;
  }

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
