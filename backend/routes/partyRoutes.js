const express = require("express");
const router = express.Router();
const { createPartyBooking, confirmPartyBooking, getAllPartyBookings, updatePartyBookingStatus, deletePartyBooking } = require("../controllers/partyBookingController");
const { protect } = require("../middleware/authMiddleware");
const rateLimit = require("express-rate-limit");

const partyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: "Too many booking attempts. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", partyLimiter, createPartyBooking);
router.get("/confirm/:token", confirmPartyBooking);
router.get("/", protect, getAllPartyBookings);
router.put("/:id", protect, updatePartyBookingStatus);
router.delete("/:id", protect, deletePartyBooking);

module.exports = router;