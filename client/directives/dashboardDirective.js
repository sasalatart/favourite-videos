(function() {
  'use strict'

  angular.module('favourite-videos').directive('userDashboard', userDashboard);

  function userDashboard() {
    var directive = {
      restrict: 'E',
      templateUrl: '../templates/userDashboard.html',
      controller: dashboardController,
      controllerAs: 'dashboardCtrl'
    }

    return directive;
  }

  dashboardController.$inject = ['sessionService', '$resource', '$window'];

  function dashboardController(sessionService, $resource, $window) {
    var vm = this;
    var Video = $resource('/users/:user_id/videos/:video_id', {
      user_id: '@user_id',
      video_id: '@video_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    vm.videoForm = {};
    vm.videos = {};

    sessionService.identity().then(function(identity) {
      if (identity) {
        vm.identity = identity;

        vm.videos = Video.query({
          user_id: identity._id
        });
        vm.videos.$promise.then(function(videos) {
          _.map(videos, function(video) {
            video.editing = false;
            video.updatedTitle = video.title;
            video.updatedURL = video.url;
            return video;
          });
          vm.videos = videos;
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
            console.log(error);
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
              console.log(error);
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
            })
          }, function(error) {
            console.log(error);
          });
        }
      } else {
        $window.location.href = '/#/';
      }
    })
  }
})();