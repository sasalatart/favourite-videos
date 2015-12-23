module.exports = function(passport) {
  return function(req, res, next) {
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
  }
}
