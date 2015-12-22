(function() {
  'use strict'

  angular.module('favouriteVideos').factory('Video', function($resource) {
    return $resource('/users/:user_id/videos/:video_id', {
      user_id: '@user_id',
      video_id: '@video_id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  });
})();
