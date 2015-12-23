(function() {
  'use strict'

  angular.module('favouriteVideos').service('sessionService', sessionService);

  function sessionService($http, $q, $window) {
    var vm = this;
    var _identity = undefined;

    var login = function(userForm) {
      $http({
        method: 'POST',
        url: 'login',
        data: userForm
      }).success(function(data) {
        identity(data);
        $window.location.href = '/#/dashboard';
      }).error(function(error, data) {
        alert('error!');
      });
    }

    var identity = function(setIdentity) {
      if (setIdentity) {
        _identity = setIdentity;
        return;
      }

      var deferred = $q.defer();

      if (angular.isDefined(_identity)) {
        deferred.resolve(_identity);
        return deferred.promise;
      }

      $http.get('/getUser')
        .success(function(result) {
          _identity = result;
          deferred.resolve(_identity);
        })
        .error(function() {
          _identity = undefined;
          deferred.reject();
        });

      return deferred.promise;
    }

    var redirectToRoot = function() {
      $window.location.href = '/#/';
    }

    return {
      login,
      identity,
      redirectToRoot
    }
  }
})()
