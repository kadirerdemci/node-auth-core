const validator = require("validator");

function validateRegisterInput({ username, email, password }) {
  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!validator.isLength(password, { min: 8 })) {
    errors.password = "Password should be at least 8 characters";
  }

  return errors;
}

function validateLoginInput({ email, password }) {
  const errors = {};

  if (!validator.isEmail(email)) {

    errors.email = "Invalid email format";
    
  }

  return errors;
}


module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
