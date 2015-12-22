var mongoose            = require('mongoose'),
    userMongooseSchema  = require('./user').userMongooseSchema;

var videoSchema = {
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'userMongooseSchema',
    required: true
  }
}

module.exports = mongoose.model('Video', mongoose.Schema(videoSchema))
module.exports.videoSchema = videoSchema;
