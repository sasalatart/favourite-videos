(function() {
  'use strict';

  angular.module('favourite-videos').directive('userSignup', userSignup);

  function userSignup() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/userSignup.html',
      controller: signupController,
      controllerAs: 'signupCtrl'
    }

    return directive;
  }

  signupController.$inject = ['signupService'];

  function signupController(signupService) {
    var vm = this;
    vm.userForm = {};

    vm.submit = function() {
      signupService.signup(vm.userForm);
      vm.userForm = {};
    }
  }
})();
