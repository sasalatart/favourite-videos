var mongoose = require('mongoose');

var userSchema = {
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}

module.exports = new mongoose.Schema(userSchema);
module.exports.userSchema = userSchema;
