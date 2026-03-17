const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true, trim: true },
    phone:          { type: String, required: true, trim: true },
    email:          { type: String, required: true, trim: true, lowercase: true },
    numberOfGuests: { type: Number, required: true, min: 1, max: 50 },
    date:           { type: Date,   required: true },
    time:           { type: String, required: true },
    specialRequest: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    emailConfirmed:  { type: Boolean, default: false },
    confirmToken:    { type: String,  default: null },
    confirmTokenExp: { type: Date,    default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);