
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "test",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    jwtSecret: process.env.jwtSecret || "your_jwt_secret_key",
  },
  test: {
    // ...
  },
  production: {
    // ...
  },
};