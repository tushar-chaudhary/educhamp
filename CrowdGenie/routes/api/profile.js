const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.post('/getProfile', (req, res) => {
  Profile.findOne({
    user: req.body.id
  })
    .then(profile => {
      return res.status(200).json(profile);
    })
    .catch(err => console.log(err));
});

module.exports = router;
