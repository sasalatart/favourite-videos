(function() {
  'use strict'

  angular.module('favouriteVideos').controller('navbarController', navbarController);

  navbarController.$inject = ['sessionService'];

  function navbarController(sessionService) {
    var vm = this;

    vm.logout = function() {
      sessionService.logout();
    }
  }
})();
