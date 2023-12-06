// src/middleware/logUserMiddleware.js
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const { ServiceResponse } = require("../response/serviceResponse");
const unlinkAsync = promisify(fs.unlink);

const logUserMiddleware = async (req, res, next) => {
  if (req.user) {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${
      req.originalUrl
    } - User: ${req.user.username} - Status: ${res.statusCode}\n`;

    const filePath = path.join(__dirname, "..", "applog", "applog.log");

    try {
      fs.appendFileSync(filePath, logMessage);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const stats = fs.statSync(filePath);

      if (stats.mtime < thirtyDaysAgo) {
        await unlinkAsync(filePath);
      }
    } catch (err) {
      console.error("Error writing to log file:", err);
    }
  }

  next();
};

module.exports = logUserMiddleware;
