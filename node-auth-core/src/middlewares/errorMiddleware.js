const ServiceResponse = require("../response/serviceResponse");

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json(new ServiceResponse(false, 'Internal Server Error', null, 500));
};

module.exports = { handleErrors };
