module.exports = function(Video) {
  return {
    index: function(req, res) {
      Video.find({
        user: req.params.id
      }, function(err, videos) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(videos);
        }
      })
    },

    show: function(req, res) {
      var video = Video.findOne({
        _id: req.params.video_id
      }, function(err, video) {
        if (err) {
          res.status(404).json({ messages: 'The requested video was not found' });
        } else {
          res.status(200).json(video);
        }
      })
    },

    create: function(req, res) {
      var newVideo = new Video();
      newVideo.title = req.body.title;
      newVideo.url = req.body.url;
      newVideo.user = req.user.id;

      newVideo.save(function(err) {
        if (err) {
          res.status(400).json({ messages: 'Failed to save your new video. Check if its URL is already in use' });
        } else {
          res.status(201).json(newVideo);
        }
      })
    },

    update: function(req, res) {
      Video.findOne({
        _id: req.params.video_id
      }, function(err, video) {
        if (err) {
          res.status(500).json({ messages: 'Failed to update your video' });
        } else {
          video.title = req.body.title;
          video.url = req.body.url;
          video.save(function(err) {
            if (err) {
              res.status(400).json({ messages: 'Failed to update your video. Check if its URL is already in use' });
            } else {
              res.status(200).json(video);
            }
          });
        }
      })
    },

    delete: function(req, res) {
      Video.remove({
        _id: req.params.video_id
      }, function(err) {
        if (err) {
          res.status(500).json({ messages: 'Failed to delete your video' });
        } else {
          res.status(202).json({});
        }
      })
    }
  }
}
