var User              = require('./models/user'),
    Video             = require('./models/video');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.sendFile('client/index.html', {
      'root': '../favourite-videos'
    });
  });

var signupController  = require('./controllers/signupController')(passport),
    sessionController = require('./controllers/sessionController')(passport),
    videoController   = require('./controllers/videoController')(Video);

  app.post('/signup', signupController);

  app.post('/login', sessionController.login);
  app.get('/logout', sessionController.logout);
  app.get('/getUser', sessionController.getUser);

  app.get('/users/:id/videos', videoController.index);
  app.get('/users/:user_id/videos/:video_id', videoController.show);
  app.post('/users/:id/videos', videoController.create);
  app.put('/users/:user_id/videos/:video_id', videoController.update);
  app.delete('/users/:user_id/videos/:video_id', videoController.delete);
}
