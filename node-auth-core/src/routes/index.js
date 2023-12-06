// src/routes/index.js

const express = require("express");
const authRoutes = require("./authRoutes");
const { authenticateUser } = require("../middlewares/authMiddleware");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.use("/auth", authRoutes);

/**
 * @swagger
 * tags:
 *   - name: General
 *     description: General endpoints
 */

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Ping endpoint for testing
 *     tags:
 *       - General
 *     responses:
 *       '200':
 *         description: okkkk
 */
router.get("/ping", (req, res) => {
  res.json({ message: "okkkk" });
});

// Diğer endpoint'leri buraya ekleyin

module.exports = router;
