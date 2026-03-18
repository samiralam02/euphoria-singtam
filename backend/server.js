const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.set("trust proxy", 1);

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false, limit: "25mb" }));

// Rate limiting — max 5 booking submissions per IP per hour
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: "Too many booking attempts. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/party-bookings", require("./routes/partyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/story", require("./routes/storyRoutes"));

app.get("/api/health", (req, res) => {
  res.json({ status: "Euphoria Singtam API is running" });
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));