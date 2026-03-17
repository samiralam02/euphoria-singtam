const express = require("express");
const router = express.Router();
const { createBooking, confirmBooking, getAllBookings, updateBookingStatus, deleteBooking } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: "Too many booking attempts. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", bookingLimiter, createBooking);
router.get("/confirm/:token", confirmBooking);
router.get("/", protect, getAllBookings);
router.put("/:id", protect, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

module.exports = router;