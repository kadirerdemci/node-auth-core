// controllers/authController.js

const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateAuthToken = require("../services/authService").generateAuthToken;
const ServiceResponse = require("../response/serviceResponse");
const MailService = require("../services/mailService");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json(new ServiceResponse(false, "Email is already taken", null, 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationCode,
    });

    const emailResult = await MailService.sendVerificationEmail({
      email: user.email,
      username: user.username,
      verificationCode,
    });

    if (!emailResult.success) {
      return res
        .status(500)
        .json(
          new ServiceResponse(
            false,
            "Error sending verification email",
            null,
            500
          )
        );
    }

    user.password = undefined;

    const token = generateAuthToken(user);

    return res
      .status(201)
      .json(
        new ServiceResponse(
          true,
          "User registered successfully",
          { user, token },
          201
        )
      );
  } catch (error) {
    console.error("Error in register:", error);
    return res
      .status(500)
      .json(new ServiceResponse(false, "Internal Server Error", null, 500));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json(new ServiceResponse(false, "Invalid Credentials", null, 401));
    }

    user.password = undefined;

    const token = generateAuthToken(user);

    return res
      .status(200)
      .json(
        new ServiceResponse(true, "Login successful", { user, token }, 200)
      );
  } catch (error) {
    console.error("Error in login:", error);
    return res
      .status(500)
      .json(new ServiceResponse(false, "Internal Server Error", null, 500));
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ where: { email, verificationCode } });

    if (!user) {
      return res
        .status(400)
        .json(
          new ServiceResponse(false, "Invalid verification code", null, 400)
        );
    }

    user.isVerified = true;
    await user.save();

    return res
      .status(200)
      .json(
        new ServiceResponse(true, "Email verified successfully", null, 200)
      );
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    return res
      .status(500)
      .json(new ServiceResponse(false, "Internal Server Error", null, 500));
  }
};
