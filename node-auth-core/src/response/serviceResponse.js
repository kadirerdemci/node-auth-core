// src/response/serviceResponse.js
class ServiceResponse {
    constructor(success, message, data = null, statusCode = 200) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.statusCode = statusCode;
    }
  }
  
  module.exports = ServiceResponse;
  