const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    mediaData:   { type: String, required: true }, // base64 data URL
    mediaType:   { type: String, enum: ["image", "video"], required: true },
    caption:     { type: String, default: "" },
    expiresAt:   { type: Date, required: true },
  },
  { timestamps: true }
);

// Virtual: is the story still active?
storySchema.virtual("isActive").get(function () {
  return new Date() < this.expiresAt;
});

module.exports = mongoose.model("Story", storySchema);