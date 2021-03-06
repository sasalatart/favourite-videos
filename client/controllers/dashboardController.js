(function() {
  'use strict'

  angular.module('favouriteVideos').controller('dashboardController', dashboardController);

  dashboardController.$inject = ['sessionService', 'Video'];

  function dashboardController(sessionService, Video) {
    var vm = this;
    vm.videoForm = {};
    vm.videos = [];

    sessionService.identity().then(function(identity) {
      if (!identity) {
        sessionService.redirectToRoot();
        swal('Oops...', 'You have not logged in!', 'error');
      } else {
        vm.identity = identity;

        Video.query({
          user_id: identity._id
        }).$promise.then(function(videos) {
          _.each(videos, function(video) {
            video.editing = false;
            video.updatedTitle = video.title;
            video.updatedURL = video.url;
            vm.videos.push(video)
          });
        });

        vm.newVideo = function() {
          var video = new Video();
          video.title = vm.videoForm.title;
          video.url = vm.videoForm.url;
          video.$save({
            user_id: identity._id
          }).then(function(newVideo) {
            newVideo.editing = false;
            newVideo.updatedTitle = newVideo.title;
            newVideo.updatedURL = newVideo.url;
            vm.videos.push(newVideo);
            vm.videoForm = {};
          }, function(error) {
            swal('Oops...', error.data.messages, 'error');
            vm.videoForm = {};
          });
        }

        vm.updateVideo = function(updatedVideo) {
          Video.get({
            user_id: identity._id,
            video_id: updatedVideo._id
          }, function(video) {
            video.title = updatedVideo.updatedTitle;
            video.url = updatedVideo.updatedURL;
            video.$update({
              user_id: identity._id,
              video_id: updatedVideo._id
            }, function(video) {
              updatedVideo.editing = false;
              updatedVideo.title = updatedVideo.updatedTitle = video.title;
              updatedVideo.url = updatedVideo.updatedURL = video.url;
            }, function(error) {
              swal('Oops...', error.data.messages, 'error');
            });
          });
        }

        vm.destroyVideo = function(id) {
          Video.delete({
            user_id: identity._id,
            video_id: id
          }, function() {
            vm.videos = _.reject(vm.videos, function(video) {
              return video._id === id;
            });
          }, function(error) {
            swal('Oops...', error.data.messages, 'error');
          });
        }
      }
    });
  }
})();
