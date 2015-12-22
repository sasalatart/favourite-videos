(function() {
  'use strict'

  angular.module('favouriteVideos').controller('videoController', videoController);

  videoController.$inject = ['Video', 'sessionService', '$routeParams']

  function videoController(Video, sessionService, $routeParams) {
    var vm = this;
    vm.video = {};

    sessionService.identity().then(function(identity) {
      if (identity) {
        Video.get({
          user_id: identity._id,
          video_id: $routeParams.id
        }, function(video) {
          vm.video = video;
          vm.video.url = vm.video.url.replace("watch?v=", "v/");
        }, function(error) {
          console.log(error);
        });
      } else {
        $window.location.href = '/#/';
      }
    })
  }
})();
