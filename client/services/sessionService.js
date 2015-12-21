(function() {
  'use strict'

  angular.module('favourite-videos').service('sessionService', sessionService);

  function sessionService($http, $window) {
    this.login = function(userForm) {
      $http({
        method: 'POST',
        url: 'login',
        data: userForm
      }).success(function(data) {
        alert('welcome!');
        $window.location.href = '/#/videos';
      }).error(function(error, data) {
        alert('error!');
      });
    }
  }
})()
