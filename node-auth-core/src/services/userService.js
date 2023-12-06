const { User } = require('../models');
const ServiceResponse = require("../response/serviceResponse"); 

exports.getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }

    return new ServiceResponse(true, 'User fetched successfully', user, 200);
  } catch (error) {
    console.error("Error in getUserById:", error);
    return new ServiceResponse(false, 'Error fetching user', null, 500);
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return new ServiceResponse(true, 'Users fetched successfully', users, 200);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return new ServiceResponse(false, 'Error fetching users', null, 500);
  }
};
