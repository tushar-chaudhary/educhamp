const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone field is required';
  }

  if (Validator.isEmpty(data.childfirstname)) {
    errors.childfirstname = "Child's first name is required";
  }

  if (Validator.isEmpty(data.childlastname)) {
    errors.childlastname = "Child's surname is required";
  }

  if (Validator.isEmpty(data.schoolyear)) {
    errors.schoolyear = "Child's school year is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
