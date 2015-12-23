module.exports = function(passport) {
  return {
    login: function(req, res, next) {
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
    },

    logout: function(req, res) {
      req.logout();
    },

    getUser: function(req, res) {
      res.json(req.user);
    },

    isAuthenticated: function(req, res, next) {
      if (req.user) {
        return next();
      } else {
        res.redirect('/');
      }
    }
  }
}
