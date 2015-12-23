var User = require('./models/user'),
  Video = require('./models/video');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.sendFile('client/index.html', {
      'root': '../favourite-videos'
    });
  });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (user) {
        res.status(201).send({
          user: user,
          messages: 'Account Created'
        });
      } else {
        res.status(400).send({
          messages: info.message
        });
      }
    })(req, res, next);
  })

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (user) {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }

          res.status(200).send({
            user: user
          });
        });
      } else {
        res.status(404).send({
          messages: info.message
        });
      }
    })(req, res, next);
  });

  app.get('/logout', function(req, res) {
    req.logout();
  });

  app.get('/getUser', function(req, res) {
    res.json(req.user);
  });

  app.get('/dashboard', function(req, res) {
    checkAuthenticated(req, res);

    var videos = Video.find({
      'user': req.user.id
    });
    res.json(videos);
  });

  app.get('/users/:id/videos', function(req, res) {
    Video.find({
      user: req.params.id
    }, function(err, videos) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(videos);
      }
    })
  });

  app.get('/users/:user_id/videos/:video_id', function(req, res) {
    var video = Video.findOne({
      _id: req.params.video_id
    }, function(err, video) {
      if (err) {
        res.status(404).json({ messages: 'The requested video was not found' });
      } else {
        res.status(200).json(video);
      }
    })
  })

  app.post('/users/:id/videos', function(req, res) {
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
  });

  app.put('/users/:user_id/videos/:video_id', function(req, res) {
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
  });

  app.delete('/users/:user_id/videos/:video_id', function(req, res) {
    Video.remove({
      _id: req.params.video_id
    }, function(err) {
      if (err) {
        res.status(500).json({ messages: 'Failed to delete your video' });
      } else {
        res.status(202).json({});
      }
    })
  });

  function checkAuthenticated(req, res) {
    if (!req.user) {
      res.redirect(403, '/');
    }
  }
}
