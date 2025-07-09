const {
  register,
  me,
  getUser,
  getTwitterIdByUsername,
  getAllUsers,
} = require("../controller/userController");
const express = require("express");
const router = express.Router();

router.post("/signup", register);
router.get("/twitterid/:username", getTwitterIdByUsername);
router.get("/me", me);
router.get("/user/:id", getUser);
router.get("/", getAllUsers);

module.exports = router;
