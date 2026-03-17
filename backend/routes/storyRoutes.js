const express = require("express");
const router  = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getActiveStory,
  getAllStories,
  createStory,
  deleteStory,
} = require("../controllers/storyController");

// Public
router.get("/active", getActiveStory);

// Protected (admin only)
router.get("/",           protect, getAllStories);
router.post("/",          protect, createStory);
router.delete("/:id",     protect, deleteStory);

module.exports = router;