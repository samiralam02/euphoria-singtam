const Story = require("../models/Story");

// ── GET active stories (public) ─────────────────────────────────────────────
const getActiveStory = async (req, res) => {
  try {
    const stories = await Story.find({ expiresAt: { $gt: new Date() } })
      .sort({ createdAt: -1 })
      .lean();

    if (!stories.length) return res.json({ story: null, stories: [] });

    // Keep legacy `story` field for backward compat + add `stories` array
    res.json({ story: stories[0], stories });
  } catch (err) {
    console.error("getActiveStory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── GET all stories (admin) ──────────────────────────────────────────────────
const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).lean();
    res.json({ stories });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ── Allowed MIME types (base64 data URLs start with these) ──────────────────
const ALLOWED_IMAGE_TYPES = [
  "data:image/jpeg;base64,",
  "data:image/jpg;base64,",
  "data:image/png;base64,",
  "data:image/webp;base64,",
  "data:image/gif;base64,",
];
const ALLOWED_VIDEO_TYPES = [
  "data:video/mp4;base64,",
  "data:video/webm;base64,",
  "data:video/quicktime;base64,",
];

// ── POST create story (admin) ────────────────────────────────────────────────
const createStory = async (req, res) => {
  try {
    const { mediaData, mediaType, caption, duration } = req.body;

    if (!mediaData || !mediaType) {
      return res.status(400).json({ message: "Media is required" });
    }

    // ── Validate mediaType field ────────────────────────────────────────────
    if (!["image", "video"].includes(mediaType)) {
      return res.status(400).json({ message: "Invalid media type." });
    }

    // ── Validate base64 data URL header against allowed MIME types ──────────
    const allowed = mediaType === "image" ? ALLOWED_IMAGE_TYPES : ALLOWED_VIDEO_TYPES;
    const isAllowed = allowed.some(prefix => mediaData.startsWith(prefix));
    if (!isAllowed) {
      return res.status(400).json({
        message: mediaType === "image"
          ? "Only JPEG, PNG, WebP and GIF images are allowed."
          : "Only MP4, WebM and MOV videos are allowed.",
      });
    }

    // ── Validate base64 size ────────────────────────────────────────────────
    const sizeInBytes = (mediaData.length * 3) / 4;
    const limitBytes  = mediaType === "video" ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
    if (sizeInBytes > limitBytes) {
      return res.status(400).json({
        message: `File too large. Max ${mediaType === "video" ? "20MB" : "5MB"}.`,
      });
    }

    // ── Sanitize caption — strip any HTML/script tags ───────────────────────
    const safeCaption = (caption || "")
      .replace(/<[^>]*>/g, "")
      .replace(/[<>'"]/g, "")
      .trim()
      .slice(0, 200);

    // ── Duration in hours (default 24h, max 48h) ────────────────────────────
    const hours    = Math.min(Math.max(parseInt(duration) || 24, 1), 48);
    const expiresAt = new Date(Date.now() + hours * 60 * 60 * 1000);

    const story = await Story.create({
      mediaData,
      mediaType,
      caption: safeCaption,
      expiresAt,
    });

    res.status(201).json({ message: "Story published!", story });
  } catch (err) {
    console.error("createStory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ── DELETE story (admin) ─────────────────────────────────────────────────────
const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getActiveStory, getAllStories, createStory, deleteStory };