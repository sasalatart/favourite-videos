var User = require('./models/user');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.sendFile('client/index.html', {
      'root': '../favourite-videos'
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    failureFlash: true
  }), function(req, res) {
    res.send("success");
  });

  app.post('/signup', passport.authenticate('local-signup', {
    failureFlash: true
  }), function(req, res) {
    res.send("success");
  });

  app.get('/logout', function(req, res) {
    req.logout();
  });
}
