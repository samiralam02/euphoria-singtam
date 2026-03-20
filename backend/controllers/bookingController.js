const crypto = require("crypto");
const Booking = require("../models/Booking");
const { sendBookingConfirmation } = require("../utils/email");
const { validateEmail } = require("../utils/emailValidator");

const createBooking = async (req, res) => {
  try {
    const { name, phone, email, numberOfGuests, date, time, specialRequest, _hp } = req.body;

    if (_hp && _hp.trim() !== "") {
      return res.status(200).json({ success: true, message: "Booking received." }); // silent reject
    }

    if (!name || !phone || !email || !numberOfGuests || !date || !time) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Live email validation — checks real existence + disposable
    const emailCheck = await validateEmail(email);
    if (!emailCheck.valid) {
      return res.status(400).json({ message: emailCheck.reason });
    }

    // Generate confirm token (expires in 24h)
    const confirmToken = crypto.randomBytes(32).toString("hex");
    const confirmTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const booking = await Booking.create({
      name, phone, email, numberOfGuests, date, time,
      specialRequest: specialRequest || "",
      emailConfirmed: false,
      confirmToken,
      confirmTokenExp,
    });

    // Respond immediately — don't wait for email
    res.status(201).json({
      success: true,
      message: "Almost done! Check your email and click the confirmation link to complete your booking.",
    });

    // Fire-and-forget — send email after responding so user isn't waiting
    sendBookingConfirmation({
      to: email, name, date, time, guests: numberOfGuests, token: confirmToken,
    }).catch(err => console.error("Email send failed:", err.message));

  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// GET /api/bookings/confirm/:token — public
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      confirmToken: req.params.token,
      confirmTokenExp: { $gt: new Date() },
    });

    if (!booking) {
      return res.status(400).send(confirmPage("error", "This confirmation link is invalid or has expired."));
    }

    booking.emailConfirmed = true;
    booking.confirmToken = null;
    booking.confirmTokenExp = null;
    await booking.save();

    res.send(confirmPage("success", `Your table for ${booking.numberOfGuests} on ${new Date(booking.date).toDateString()} at ${booking.time} is confirmed. See you soon!`));
  } catch (error) {
    console.error("Confirm booking error:", error);
    res.status(500).send(confirmPage("error", "Something went wrong. Please contact us directly."));
  }
};

// GET /api/bookings — admin only (only email-confirmed bookings)
const getAllBookings = async (req, res) => {
  try {
    // Auto-delete unconfirmed bookings older than 24h to keep DB clean
    await Booking.deleteMany({
      emailConfirmed: false,
      confirmTokenExp: { $lt: new Date() },
    });

    const bookings = await Booking.find({ emailConfirmed: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/bookings/:id — admin only
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true, runValidators: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/bookings/:id — admin only
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ── Confirmation page ─────────────────────────────────────────────────────────
const confirmPage = (type, message) => {
  const isSuccess = type === "success";
  const CLIENT    = process.env.CLIENT_URL || "http://localhost:5173";

  // Inline SVGs — same style as Lucide React icons used on the website
  const iconCheck = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${isSuccess ? "#4ade80" : "#f87171"}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  const iconX     = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const iconHome  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const iconMenu  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
  const iconCal   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:5px"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${isSuccess ? "Booking Confirmed" : "Invalid Link"} – Euphoria Singtam</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #080808;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }

    /* Ambient background orbs */
    body::before {
      content: '';
      position: fixed;
      width: 40rem; height: 40rem;
      border-radius: 50%;
      background: radial-gradient(circle, ${isSuccess ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)"} 0%, transparent 70%);
      top: -10rem; left: -10rem;
      pointer-events: none;
    }
    body::after {
      content: '';
      position: fixed;
      width: 30rem; height: 30rem;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255,125,6,0.07) 0%, transparent 70%);
      bottom: -8rem; right: -8rem;
      pointer-events: none;
    }

    .card {
      background: #111111;
      border: 1px solid ${isSuccess ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"};
      border-radius: 1.5rem;
      padding: 3rem 2.5rem;
      max-width: 460px;
      width: 100%;
      text-align: center;
      position: relative;
      box-shadow: 0 0 60px ${isSuccess ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)"};
      animation: slideUp 0.5s ease forwards;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* Logo ring */
    .logo-ring {
      display: inline-block;
      padding: 3px;
      border-radius: 50%;
      background: linear-gradient(135deg, #faf98b, #ff7d06, #ffb129);
      margin-bottom: 1.5rem;
    }
    .logo-ring-inner {
      background: #0d0d0d;
      padding: 2px;
      border-radius: 50%;
    }
    .logo-ring img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: block;
      object-fit: cover;
    }

    /* Status icon */
    .status-icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: ${isSuccess ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)"};
      border: 1px solid ${isSuccess ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"};
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .brand {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #faf98b, #ff7d06);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.25rem;
    }
    .brand-sub {
      font-size: 0.7rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.25);
      margin-bottom: 2rem;
    }

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255,125,6,0.2), transparent);
      margin: 1.5rem 0;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: ${isSuccess ? "#4ade80" : "#f87171"};
      margin-bottom: 0.75rem;
    }

    .message {
      font-size: 0.9rem;
      color: #7a7060;
      line-height: 1.75;
      margin-bottom: 2rem;
      padding: 1rem 1.25rem;
      background: ${isSuccess ? "rgba(74,222,128,0.04)" : "rgba(248,113,113,0.04)"};
      border: 1px solid ${isSuccess ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)"};
      border-radius: 0.75rem;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ff7d06, #faf98b);
      color: #0f0f0f;
      text-decoration: none;
      padding: 0.875rem 2rem;
      border-radius: 0.625rem;
      font-weight: 700;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
      width: 100%;
      transition: filter 0.2s, transform 0.2s;
    }
    .btn-primary:hover {
      filter: brightness(1.08);
      transform: translateY(-1px);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: #ff9f1c;
      text-decoration: none;
      padding: 0.875rem 2rem;
      border-radius: 0.625rem;
      font-weight: 600;
      font-size: 0.9rem;
      width: 100%;
      border: 1px solid rgba(255,125,6,0.3);
      transition: background 0.2s, border-color 0.2s;
    }
    .btn-secondary:hover {
      background: rgba(255,125,6,0.08);
      border-color: rgba(255,125,6,0.55);
    }

    .footer-text {
      margin-top: 2rem;
      font-size: 0.72rem;
      color: #2e2a26;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="card">

    <!-- Logo with fire ring -->
    <div class="logo-ring">
      <div class="logo-ring-inner">
        <img src="https://i.ibb.co/VcTDDhPR/eulogo.png" alt="Euphoria Singtam logo" />
      </div>
    </div>

    <!-- Brand -->
    <div class="brand">Euphoria Singtam</div>
    <div class="brand-sub">Premium Bar &amp; Restaurant &nbsp;·&nbsp; Singtam, Sikkim</div>

    <div class="divider"></div>

    <!-- Status icon with SVG -->
    <div class="status-icon">
      ${isSuccess ? iconCheck : iconX}
    </div>

    <!-- Title -->
    <h1>${isSuccess ? "Booking Confirmed!" : "Link Invalid"}</h1>

    <!-- Message -->
    <div class="message">
      ${isSuccess
        ? `${iconCal} ${message}`
        : message
      }
    </div>

    <!-- Buttons -->
    <a href="${CLIENT}" class="btn-primary">
      ${iconHome} Back to Euphoria
    </a>
    <a href="${CLIENT}/booking" class="btn-secondary">
      ${iconMenu} Make Another Booking
    </a>

    <p class="footer-text">
      Euphoria Singtam &nbsp;·&nbsp; Singtam, East Sikkim 737134
    </p>
  </div>
</body>
</html>`;
};

module.exports = { createBooking, confirmBooking, getAllBookings, updateBookingStatus, deleteBooking };