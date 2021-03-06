var localStrategy = require('passport-local').Strategy,
  User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      '_id': id
    }, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({
        'email': email
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'That email has already been taken' });
        }
        if (password !== req.body.passwordConfirmation) {
          return done(null, false, { message: 'Your password and its confirmation do not match' });
        } else {
          var newUser = new User();
          newUser.email = email;
          newUser.username = req.body.username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) {
              throw err;
            } else {
              return done(null, newUser);
            }
          });
        }
      });
    }));

  passport.use('local-login', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({
        'email': email
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'No user found with that email' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Wrong password' });
        }
        return done(null, user);
      });
    }));
}
