var mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt');

var userSchema = {
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  local: {
    password: {
      type: String,
      required: true
    }
  }
}

var userMongooseSchema = mongoose.Schema(userSchema);

userMongooseSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userMongooseSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userMongooseSchema);
module.exports.userMongooseSchema = userMongooseSchema;
module.exports.userSchema = userSchema;
