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
const { verifyEmail } = require("../controllers/authController");
const { listUsers } = require("../controllers/authController");
const logUserMiddleware = require("../middlewares/logUserMiddleware");
const timingMiddleware = require("../middlewares/timingMiddleware");
const rateLimiterWithBan = require("../middlewares/rateLimitterMiddleware");
const { deleteUser } = require("../controllers/authController");
const { searchUserByUsername } = require("../controllers/authController");

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

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify user's email with verification code
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
 *               verificationCode:
 *                 type: string
 *             required:
 *               - email
 *               - verificationCode
 *     responses:
 *       '200':
 *         description: Email verification successful
 */
router.post("/verify-email", verifyEmail, logUserMiddleware);

/**
 * @swagger
 * /api/auth/list-users:
 *   get:
 *     summary: List all users
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful listing of users
 */
router.get("/list-users", authenticateUser, listUsers);

/**
 * @swagger
 * /api/auth/delete-user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful deletion of the user
 */
router.delete("/delete-user/:id", authenticateUser, async (req, res) => {
  const userId = req.params.id;
  const result = await deleteUser(userId);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode).json(result);
  }
});

/**
 * @swagger
 * /api/auth/search-user-by-username/{username}:
 *   get:
 *     summary: Search a user by username
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to be searched
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful search for the user by username
 */
router.get("/search-user-by-username/:username", authenticateUser, async (req, res) => {
  const username = req.params.username;
  const result = await searchUserByUsername(username);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(result.statusCode).json(result);
  }
});
module.exports = router;
