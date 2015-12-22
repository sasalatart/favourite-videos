var User = require('./models/user');
var Video = require('./models/video');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.sendFile('client/index.html', {
      'root': '../favourite-videos'
    });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    failureFlash: true
  }), function(req, res) {
    res.send(req.user);
  });

  app.post('/login', passport.authenticate('local-login', {
    failureFlash: true
  }), function(req, res) {
    res.send(req.user);
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
    var video = Video.findOne({ _id: req.params.video_id }, function(err, video) {
      if (err) {
        res.status(500).json(err);
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
        res.status(500).json(err);
      } else {
        res.status(201).json(newVideo);
      }
    })
  });

  app.put('/users/:user_id/videos/:video_id', function(req, res) {
    Video.findOne({ _id: req.params.video_id }, function(err, video) {
      if (err) {
        res.status(500).json(err);
      } else {
        video.title = req.body.title;
        video.url = req.body.url;
        video.save(function(err) {
          if (err) {
            res.status(500).json(err);
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
        res.status(500).json(err);
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
