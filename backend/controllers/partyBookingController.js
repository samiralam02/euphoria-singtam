const crypto = require("crypto");
const PartyBooking = require("../models/PartyBooking");
const { sendPartyConfirmation } = require("../utils/email");
const { validateEmail } = require("../utils/emailValidator");

// POST /api/party-bookings — public
const createPartyBooking = async (req, res) => {
  try {
    const { name, phone, email, eventType, numberOfGuests, date, time, decorationRequired, specialRequest, _hp } = req.body;

    // Honeypot check
    if (_hp && _hp.trim() !== "") {
      return res.status(200).json({ success: true, message: "Request received." });
    }

    if (!name || !phone || !email || !eventType || !numberOfGuests || !date || !time) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Live email validation — checks real existence + disposable
    const emailCheck = await validateEmail(email);
    if (!emailCheck.valid) {
      return res.status(400).json({ message: emailCheck.reason });
    }

    const confirmToken = crypto.randomBytes(32).toString("hex");
    const confirmTokenExp = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const partyBooking = await PartyBooking.create({
      name, phone, email, eventType, numberOfGuests, date, time,
      decorationRequired: decorationRequired === "Yes" || decorationRequired === true,
      specialRequest: specialRequest || "",
      emailConfirmed: false,
      confirmToken,
      confirmTokenExp,
    });

    res.status(201).json({
      success: true,
      message: "Almost done! Check your email and click the confirmation link to complete your event request.",
    });

    // Fire-and-forget — send email after responding
    sendPartyConfirmation({
      to: email, name, eventType, date, time, guests: numberOfGuests, token: confirmToken,
    }).catch(err => console.error("Email send failed:", err.message));

  } catch (error) {
    console.error("Create party booking error:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// GET /api/party-bookings/confirm/:token — public
const confirmPartyBooking = async (req, res) => {
  try {
    const booking = await PartyBooking.findOne({
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

    res.send(confirmPage("success", `Your ${booking.eventType} event for ${booking.numberOfGuests} guests on ${new Date(booking.date).toDateString()} is confirmed. Our team will be in touch soon!`));
  } catch (error) {
    console.error("Confirm party booking error:", error);
    res.status(500).send(confirmPage("error", "Something went wrong. Please contact us directly."));
  }
};

// GET /api/party-bookings — admin only
const getAllPartyBookings = async (req, res) => {
  try {
    // Auto-delete unconfirmed bookings older than 24h
    await PartyBooking.deleteMany({
      emailConfirmed: false,
      confirmTokenExp: { $lt: new Date() },
    });

    const partyBookings = await PartyBooking.find({ emailConfirmed: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: partyBookings.length, partyBookings });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/party-bookings/:id — admin only
const updatePartyBookingStatus = async (req, res) => {
  try {
    const partyBooking = await PartyBooking.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true, runValidators: true }
    );
    if (!partyBooking) return res.status(404).json({ message: "Party booking not found" });
    res.status(200).json({ success: true, partyBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/party-bookings/:id — admin only
const deletePartyBooking = async (req, res) => {
  try {
    const partyBooking = await PartyBooking.findByIdAndDelete(req.params.id);
    if (!partyBooking) return res.status(404).json({ message: "Party booking not found" });
    res.status(200).json({ success: true, message: "Party booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const confirmPage = (type, message) => {
  const isSuccess = type === "success";
  const CLIENT    = process.env.CLIENT_URL || "http://localhost:5173";

  const iconCheck = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${isSuccess ? "#4ade80" : "#f87171"}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  const iconX     = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const iconHome  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  const iconParty = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:6px"><path d="M2 22l10-10"/><path d="M16 8l-4-4-8 8 4 4 8-8z"/><path d="M18 2l4 4-2 2-4-4 2-2z"/></svg>`;
  const iconStar  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="#ff9f1c" stroke="#ff9f1c" stroke-width="1" style="display:inline-block;vertical-align:middle;margin-right:5px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${isSuccess ? "Event Confirmed" : "Invalid Link"} – Euphoria Singtam</title>
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
      box-shadow: 0 0 60px ${isSuccess ? "rgba(74,222,128,0.06)" : "rgba(248,113,113,0.06)"};
      animation: slideUp 0.5s ease forwards;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .logo-ring { display: inline-block; padding: 3px; border-radius: 50%; background: linear-gradient(135deg, #faf98b, #ff7d06, #ffb129); margin-bottom: 1.5rem; }
    .logo-ring-inner { background: #0d0d0d; padding: 2px; border-radius: 50%; }
    .logo-ring img { width: 64px; height: 64px; border-radius: 50%; display: block; object-fit: cover; }
    .status-icon { width: 72px; height: 72px; border-radius: 50%; background: ${isSuccess ? "rgba(74,222,128,0.08)" : "rgba(248,113,113,0.08)"}; border: 1px solid ${isSuccess ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
    .brand { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; background: linear-gradient(135deg, #faf98b, #ff7d06); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.25rem; }
    .brand-sub { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 2rem; }
    .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(255,125,6,0.2), transparent); margin: 1.5rem 0; }
    h1 { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: ${isSuccess ? "#4ade80" : "#f87171"}; margin-bottom: 0.75rem; }
    .message { font-size: 0.9rem; color: #7a7060; line-height: 1.75; margin-bottom: 2rem; padding: 1rem 1.25rem; background: ${isSuccess ? "rgba(74,222,128,0.04)" : "rgba(248,113,113,0.04)"}; border: 1px solid ${isSuccess ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)"}; border-radius: 0.75rem; }
    .btn-primary { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg,#ff7d06,#faf98b); color: #0f0f0f; text-decoration: none; padding: 0.875rem 2rem; border-radius: 0.625rem; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem; width: 100%; }
    .btn-secondary { display: inline-flex; align-items: center; justify-content: center; background: transparent; color: #ff9f1c; text-decoration: none; padding: 0.875rem 2rem; border-radius: 0.625rem; font-weight: 600; font-size: 0.9rem; width: 100%; border: 1px solid rgba(255,125,6,0.3); }
    .footer-text { margin-top: 2rem; font-size: 0.72rem; color: #2e2a26; letter-spacing: 0.05em; }
  </style>
</head>
<body>
  <div class="card">
    <a href="${CLIENT}" style="text-decoration:none;display:inline-block">
      <div class="logo-ring">
        <div class="logo-ring-inner">
          <img src="https://i.ibb.co/VcTDDhPR/eulogo.png" alt="Euphoria Singtam logo"/>
        </div>
      </div>
    </a>
    <div class="brand">Euphoria Singtam</div>
    <div class="brand-sub">Premium Bar &amp; Restaurant &nbsp;·&nbsp; Singtam, Sikkim</div>
    <div class="divider"></div>
    <div class="status-icon">${isSuccess ? iconCheck : iconX}</div>
    <h1>${isSuccess ? "Event Confirmed!" : "Link Invalid"}</h1>
    <div class="message">${isSuccess ? `${iconStar} ${message}` : message}</div>
    <a href="${CLIENT}" class="btn-primary">${iconHome} Back to Euphoria</a>
    <a href="${CLIENT}/party-booking" class="btn-secondary">${iconParty} Book Another Event</a>
    <p class="footer-text">Euphoria Singtam &nbsp;·&nbsp; Singtam, East Sikkim 737134</p>
  </div>
</body>
</html>`;
};

module.exports = { createPartyBooking, confirmPartyBooking, getAllPartyBookings, updatePartyBookingStatus, deletePartyBooking };