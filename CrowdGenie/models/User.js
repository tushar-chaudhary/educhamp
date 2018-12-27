const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  subscriptionType: {
    type: String,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = User = mongoose.model('users', UserSchema);
