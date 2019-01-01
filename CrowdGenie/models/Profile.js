const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  Children: [
    {
      firstName: {
        type: String
      },
      surname: {
        type: String
      },
      schoolYear: {
        type: String
      },
      subscriptionPrice: {
        type: String,
        default: ''
      },
      subscriptionYear: {
        type: String,
        default: ''
      },
      username: {
        type: String
      },
      password: {
        type: String
      },
      status: {
        type: String,
        default: 'ACTIVE'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
