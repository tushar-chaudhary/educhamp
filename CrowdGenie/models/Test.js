const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  testName: {
    type: String
  },
  score: {
    type: String
  },
  class: {
    type: String
  },
  report: {
    type: String
  },
  childId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Test = mongoose.model('tests', TestSchema);
