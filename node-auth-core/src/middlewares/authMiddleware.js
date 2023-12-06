const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/config");
const ServiceResponse = require("../response/serviceResponse");

async function authenticateUser(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json(new ServiceResponse(false, "Access denied. Token not provided.", null, 401));
  }

  try {
    const decoded = jwt.verify(token, config.development.jwtSecret);
    const user = await User.findByPk(decoded.id);
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    return res.status(401).json(new ServiceResponse(false, "Invalid token.", null, 401));
  }
}

module.exports = {
  authenticateUser,
};
