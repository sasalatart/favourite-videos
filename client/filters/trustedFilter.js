(function() {
  'use strict'

  angular.module('favouriteVideos').filter('trustedFilter', trustedFilter);

  trustedFilter.$inject = ['$sce'];

  function trustedFilter($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    }
  }
})();
