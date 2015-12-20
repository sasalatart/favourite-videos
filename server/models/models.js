var mongoose  = require('mongoose'),
    _         = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/favourite-videos');

  wagner.factory('db', function() {
    return mongoose;
  });

  var User = mongoose.model('User', require('./user'), 'users');

  var models = {
    User: User
  };

  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
}
