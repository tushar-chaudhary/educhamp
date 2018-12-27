const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Checking if this email exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      //Parent Details
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone
      });

      //Child Details
      const childInfo = {
        firstName: req.body.childfirstname,
        surname: req.body.childlastname,
        schoolYear: req.body.schoolyear,
        username:
          req.body.childfirstname.charAt(0) +
          req.body.childlastname.substring(0, 2) +
          String(Math.floor(100000 + Math.random() * 900000)),
        password: generator.generate({
          length: 10,
          numbers: true
        })
      };

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const profile = new Profile({
                user: user._id,
                Children: childInfo
              })
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        Profile.findOne({
          user: user._id
        }).then(profile => {
          const payload = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            subscriptionType: user.subscriptionType,
            active: user.active,
            profile: profile
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

//To store the data in the store
router.post('/updateSubscription_Set', (req, res) => {
  const email = req.body.email;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      //Updating the Profile of first Child
      Profile.updateOne(
        {
          user: user._id
        },
        {
          $set: {
            'Children.0.subscriptionYear': req.body.subscriptionYear,
            'Children.0.subscriptionPrice': req.body.subscriptionPrice
          }
        },
        (err, updatedData) => {
          if (err) {
            console.log(err);
          } else {
            User.findOne({ email })
              .then(user => {
                //Updating that parent has subscribed
                User.updateOne(
                  {
                    email: user.email
                  },
                  {
                    $set: {
                      subscriptionType: 'true'
                    }
                  },
                  (err, updatedData) => {
                    if (err) {
                      console.log(err);
                    } else {
                      user.subscriptionType = 'true';

                      return res.status(200).json(user);
                    }
                  }
                );
              })
              .catch(err => console.log(err));
          }
        }
      );
    })
    .catch(err => console.log(err));
});

//Skip Subscription
router.post('/skipSubscription', (req, res) => {
  User.updateOne(
    {
      email: req.body.email
    },
    {
      $set: {
        subscriptionType: 'true'
      }
    },
    (err, updatedData) => {
      if (err) {
        console.log(err);
      } else {
        User.findOne({
          email: req.body.email
        }).then(user => {
          console.log(user);
          return res.status(200).json(user);
        });
      }
    }
  );
});

//Router add Children
router.post('/addChildren', (req, res) => {
  const newChild = {
    firstName: req.body.childfirstname,
    surname: req.body.childlastname,
    schoolYear: req.body.state.schoolyear
  };

  Profile.updateOne(
    { user: req.body.user },
    {
      $push: {
        Children: newChild
      }
    },
    (err, updatedData) => {
      if (err) {
        console.log(err);
      }
    }
  );

  Profile.findOne({
    user: req.body.id
  }).then(profile => {
    return res.status(200).json(profile);
  });
});

//Router add other than first Child
router.post('/addChildrenToProfile', (req, res) => {
  const newChild = {
    subscriptionYear: req.body.subscriptionYear,
    subscriptionPrice: req.body.subscriptionPrice,
    firstName: req.body.subscriptionFirstName,
    surname: req.body.subscriptionSurname,
    schoolYear: req.body.subscriptionSchoolYear,
    username:
      req.body.subscriptionFirstName.charAt(0) +
      req.body.subscriptionSurname.substring(0, 2) +
      String(Math.floor(100000 + Math.random() * 900000)),
    password: generator.generate({
      length: 10,
      numbers: true
    })
  };
  Profile.updateOne(
    { user: req.body.subscriptionUser },
    {
      $push: {
        Children: newChild
      }
    },
    (err, updatedData) => {
      if (err) {
        console.log(err);
      }
    }
  );

  Profile.findOne({
    user: req.body.subscriptionUser
  }).then(profile => {
    return res.status(200).json(profile);
  });
});

//login Child
router.post('/resetPassword', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      Profile.findOne({
        user: user._id,
        Children: {
          $elemMatch: {
            username: req.body.username,
            password: req.body.password
          }
        }
      })
        .then(profile => {
          let childDetails = profile.Children.filter(function(el) {
            return (
              el.username === req.body.username &&
              el.password === req.body.password
            );
          });
          return res.status(200).json(childDetails[0]);
        })
        .catch(err => console.log(err));
    })
    .catch(err => res.status(404).json(err));
});

// Reset Password
router.post('/resetPassword', (req, res) => {
  const password = generator.generate({
    length: 10,
    numbers: true
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      User.updateOne(
        {
          email: req.body.email
        },
        {
          $set: {
            password: hash
          }
        },
        (err, updatedData) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ctoshu@gmail.com',

      pass: 'tushar1997'
    }
  });

  const mailOptions = {
    from: 'ctoshu@gmail.com',
    to: req.body.email,
    subject: 'Reset Password',
    text: 'Your New Password is: ' + password,
    html: '<p>Your New Password is: </p>' + password
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  return res.status(200).json({ success: true });
});

//Edit Parent Profile
router.post('/editParentProfile', (req, res) => {
  User.updateOne(
    {
      email: req.body.oldemail
    },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
      }
    },
    (err, updatedData) => {
      if (err) {
        console.log(err);
      } else {
        User.findOne({
          email: req.body.email
        }).then(user => {
          return res.status(200).json(user);
        });
      }
    }
  );
});

//Edit Child Profile
router.post('/editChildProfile', (req, res) => {
  Profile.updateOne(
    {
      'Children._id': req.body.childId
    },
    {
      $set: {
        'Children.$.firstName': req.body.firstname,
        'Children.$.surname': req.body.surname,
        'Children.$.username': req.body.username,
        'Children.$.schoolYear': req.body.schoolYear
      }
    },
    (err, updatedData) => {
      if (err) {
        console.log(err);
      } else {
        Profile.findOne({
          'Children._id': req.body.childId
        })
          .then(profile => {
            let childDetails = profile.Children.filter(function(el) {
              return String(el._id) === String(req.body.childId);
            });
            return res.status(200).json(childDetails[0]);
          })
          .catch(err => console.log(err));
      }
    }
  );
});

//Edit Parent Password
router.post('/editParentPassword', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
      User.updateOne(
        {
          email: req.body.email
        },
        {
          $set: {
            password: hash
          }
        },
        (err, updatedData) => {
          if (err) {
            console.log(err);
          } else {
            User.findOne({
              email: req.body.email
            }).then(user => {
              return res.status(200).json(user);
            });
          }
        }
      );
    });
  });
});

//Edit Child Password
router.post('/editChildPassword', (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
      Profile.updateOne(
        {
          'Children._id': req.body.childId
        },
        {
          $set: {
            'Children.$.password': req.body.newpassword
          }
        },
        (err, updatedData) => {
          if (err) {
            console.log(err);
          } else {
            Profile.findOne({
              'Children._id': req.body.childId
            })
              .then(profile => {
                let childDetails = profile.Children.filter(function(el) {
                  return String(el._id) === String(req.body.childId);
                });
                return res.status(200).json(childDetails[0]);
              })
              .catch(err => console.log(err));
          }
        }
      );
    });
  });
});

module.exports = router;
