(function() {
  'use strict';

  angular.module('favouriteVideos').service('signupService', signupService);

  function signupService($http, $window) {
    this.signup = function(userForm) {
      $http({
        method: 'POST',
        url: '/signup',
        data: userForm,
      }).success(function(data) {
        swal('Welcome!', data.messages, 'success');
        $window.location.href = '/#/videos';
      }).error(function(error) {
        swal('Oops...', error.messages, 'error');
      });
    }
  }
})();
