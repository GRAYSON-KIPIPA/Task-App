const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
