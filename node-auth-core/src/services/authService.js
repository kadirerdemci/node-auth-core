const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/config");
const ServiceResponse = require("../response/serviceResponse");

const generateToken = (user) => {
  const jwtSecret = config.development.jwtSecret;
  const expiresIn = "1h";

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, jwtSecret, { expiresIn });
};

exports.registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return new ServiceResponse(true, "User registered successfully", user, 200);
  } catch (error) {
    console.error("Error in registerUser:", error);
    return new ServiceResponse(false, "User registration failed", null, 500);
  }
};

exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new ServiceResponse(false, "Invalid Credentials", null, 401);
    }

    return new ServiceResponse(true, "Login successful", user, 200);
  } catch (error) {
    console.error("Error in loginUser:", error);
    return new ServiceResponse(false, "User login failed", null, 500);
  }
};

exports.generateAuthToken = (user) => {
  return new ServiceResponse(
    true,
    "Token generated successfully",
    generateToken(user),
    200
  );
};
