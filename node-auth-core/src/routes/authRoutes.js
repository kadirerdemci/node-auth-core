// routes/authRoutes.js

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication endpoints
 */

const express = require("express");
const { register, login } = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { handleErrors } = require("../middlewares/errorMiddleware");
const logUserMiddleware = require("../middlewares/logUserMiddleware");
const timingMiddleware = require("../middlewares/timingMiddleware");
const rateLimiterWithBan = require("../middlewares/rateLimitterMiddleware"); 
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful registration
 */
router.post("/register", register, logUserMiddleware);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with credentials
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 */
router.post(
  "/login",
  rateLimiterWithBan, 
  login,
  logUserMiddleware,
  timingMiddleware
);

/**
 * @swagger
 * /api/auth/secure-endpoint:
 *   get:
 *     summary: Access a secure endpoint
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful access to secure endpoint
 */
router.get(
  "/secure-endpoint",
  authenticateUser,
  handleErrors,
  logUserMiddleware,
  (req, res) => {
    res.json({
      message: "Secure endpoint accessed successfully.",
      user: req.user,
    });
  }
);

module.exports = router;
