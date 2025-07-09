const express = require("express");
const router = express.Router();
const { rewardUser } = require("../controller/rewardController");

// GET /api/rewards/:id (id = Twitter ID)
router.get("/rewards/:id", rewardUser);

module.exports = router;
