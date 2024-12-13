const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profilePicture: {
    type: String, // URL or file path
    default: null
  }
});

const Profile = mongoose.model('Profile',profileSchema)
module.exports = Profile