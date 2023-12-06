// In the same file where you define rateLimiterMiddleware
const rateLimiter = require("express-rate-limit");

const blockedIPs = new Set();

const rateLimiterMiddleware = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later",
  handler: (req, res, next) => {
    const ip = req.ip;
    blockedIPs.add(ip);

    setTimeout(() => {
      blockedIPs.delete(ip);
    }, 10 * 1000);

    res
      .status(429)
      .json({ error: "Too many requests, please try again later" });
  },
});

module.exports = (req, res, next) => {
  rateLimiterMiddleware(req, res, next);
};
