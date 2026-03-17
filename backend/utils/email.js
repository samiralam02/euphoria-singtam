const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const BASE_URL   = process.env.API_URL;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const svg = {
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  users:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  star:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="#ff9f1c" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  check:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><polyline points="20 6 9 17 4 12"/></svg>`,
  sparkle:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="#faf98b" stroke="#faf98b" stroke-width="1" style="display:inline-block;vertical-align:middle"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>`,
  info:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" style="display:inline-block;vertical-align:middle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  party:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><path d="M2 22l10-10"/><path d="M16 8l-4-4-8 8 4 4 8-8z"/><path d="M18 2l4 4-2 2-4-4 2-2z"/></svg>`,
  briefcase:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
  cake:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>`,
  wine:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle"><path d="M8 22h8"/><path d="M12 11v11"/><path d="M5 3h14l-1.5 8.5a5 5 0 0 1-5 4.5 5 5 0 0 1-5-4.5z"/></svg>`,
  logoIcon: `<svg width="36" height="36" viewBox="0 0 36 36" style="display:block;margin:0 auto"><circle cx="18" cy="18" r="17" fill="#1a0a00" stroke="rgba(255,125,6,0.4)" stroke-width="1.5"/><text x="18" y="24" text-anchor="middle" font-size="18" fill="#ff9f1c" font-family="serif">E</text></svg>`,
};

// ── Email wrapper ─────────────────────────────────────────────────────────────
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#080808;padding:40px 16px">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a0a00 0%,#2a1200 50%,#1a0a00 100%);border-radius:20px 20px 0 0;border:1px solid rgba(255,125,6,0.3);border-bottom:none;padding:32px 32px 24px;text-align:center">

              <!-- Actual Euphoria logo with Instagram-style fire ring -->
              <div style="display:inline-block;padding:3px;border-radius:50%;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);margin-bottom:16px">
                <div style="background:#0d0d0d;padding:2px;border-radius:50%">
                  <img src="https://i.ibb.co/VcTDDhPR/eulogo.png"
                    width="72" height="72"
                    alt="Euphoria Singtam"
                    style="display:block;border-radius:50%;width:72px;height:72px;object-fit:cover" />
                </div>
              </div>

              <!-- Brand name using CSS gradient text fallback -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto">
                <tr>
                  <td style="text-align:center">
                    <div style="font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#ff9f1c;margin-bottom:4px">
                      Euphoria Singtam
                    </div>
                    <div style="font-size:11px;color:rgba(255,255,255,0.28);letter-spacing:0.18em;text-transform:uppercase">
                      Premium Bar &amp; Restaurant &nbsp;&middot;&nbsp; Singtam, Sikkim
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111111;border:1px solid rgba(255,125,6,0.18);border-top:none;border-bottom:none;padding:32px">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;border:1px solid rgba(255,125,6,0.15);border-top:1px solid rgba(255,255,255,0.05);border-radius:0 0 20px 20px;padding:20px 32px;text-align:center">
              <p style="margin:0 0 8px;font-size:12px;color:#3a3530">
                &copy; 2025 Euphoria Singtam &nbsp;&middot;&nbsp; Singtam, East Sikkim 737134
              </p>
              <p style="margin:0;font-size:12px">
                <a href="mailto:hello@euphoriasingtam.com" style="color:#ff9f1c;text-decoration:none">hello@euphoriasingtam.com</a>
                &nbsp;&middot;&nbsp;
                <a href="${CLIENT_URL}" style="color:#4a4540;text-decoration:none">Visit Website</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// ── Detail row with SVG icon ──────────────────────────────────────────────────
const detailRow = (iconSvg, label, value, isLast = false) => `
  <tr>
    <td style="padding:12px 0;${isLast ? "" : "border-bottom:1px solid rgba(255,255,255,0.05)"}">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="width:36px;vertical-align:middle">
            <div style="width:30px;height:30px;background:rgba(255,125,6,0.08);border:1px solid rgba(255,125,6,0.18);border-radius:8px;text-align:center;line-height:30px">
              ${iconSvg}
            </div>
          </td>
          <td style="vertical-align:middle;padding-left:12px">
            <div style="font-size:11px;color:#4a4540;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3px">${label}</div>
            <div style="font-size:14px;color:#ffffff;font-weight:600">${value}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;

// ── TABLE BOOKING confirmation ────────────────────────────────────────────────
const sendBookingConfirmation = async ({ to, name, date, time, guests, token }) => {
  const confirmLink = `${BASE_URL}/api/bookings/confirm/${token}`;
  const dateStr = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const body = `
    <h2 style="margin:0 0 6px;font-size:22px;color:#ffffff;font-weight:700">Hey ${name},</h2>
    <p style="margin:0 0 6px;font-size:15px;color:#ff9f1c;font-weight:600">Your table reservation is almost confirmed.</p>
    <p style="margin:0 0 28px;font-size:14px;color:#7a7060;line-height:1.7">
      We've received your booking request at Euphoria Singtam. Click the button below to confirm your spot — it only takes a second.
    </p>

    <!-- Details card -->
    <div style="background:#0d0d0d;border:1px solid rgba(255,125,6,0.18);border-radius:14px;padding:4px 20px 8px;margin-bottom:28px">
      <p style="margin:12px 0;font-size:11px;color:#ff9f1c;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;border-bottom:1px solid rgba(255,125,6,0.1);padding-bottom:10px">
        ${svg.star} &nbsp;Reservation Details
      </p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${detailRow(svg.calendar, "Date", dateStr)}
        ${detailRow(svg.clock, "Time", time)}
        ${detailRow(svg.users, "Guests", `${guests} Guest${guests > 1 ? "s" : ""}`, true)}
      </table>
    </div>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:20px">
      <tr>
        <td align="center">
          <a href="${confirmLink}"
            style="display:inline-table;background:linear-gradient(135deg,#ff7d06,#faf98b);color:#0f0f0f;text-decoration:none;padding:16px 44px;border-radius:12px;font-weight:800;font-size:16px;letter-spacing:0.02em">
            ${svg.check} &nbsp;Confirm My Table
          </a>
        </td>
      </tr>
    </table>

    <!-- Expiry info -->
    <div style="background:rgba(255,125,6,0.04);border:1px solid rgba(255,125,6,0.12);border-radius:10px;padding:14px 18px;text-align:center">
      <p style="margin:0;font-size:12px;color:#4a4540;line-height:1.8">
        ${svg.info} &nbsp;This link expires in <strong style="color:#ff9f1c">24 hours</strong>.<br/>
        If you didn't make this booking, you can safely ignore this email.
      </p>
    </div>`;

  await transporter.sendMail({
    from: `"Euphoria Singtam" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Confirm your table reservation — Euphoria Singtam`,
    html: emailWrapper(body),
  });
};

// ── PARTY BOOKING confirmation ────────────────────────────────────────────────
const sendPartyConfirmation = async ({ to, name, eventType, date, time, guests, token }) => {
  const confirmLink = `${BASE_URL}/api/party-bookings/confirm/${token}`;
  const dateStr = new Date(date).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const eventIcons = {
    "Birthday":        svg.cake,
    "Private Party":   svg.wine,
    "Corporate Event": svg.briefcase,
  };
  const eventIcon = eventIcons[eventType] || svg.party;

  const body = `
    <h2 style="margin:0 0 6px;font-size:22px;color:#ffffff;font-weight:700">Hey ${name},</h2>
    <p style="margin:0 0 6px;font-size:15px;color:#ff9f1c;font-weight:600">Your event request is almost confirmed.</p>
    <p style="margin:0 0 28px;font-size:14px;color:#7a7060;line-height:1.7">
      We're excited to host your <strong style="color:#ffffff">${eventType}</strong> at Euphoria Singtam. Confirm below and our events team will reach out within 24 hours to plan something unforgettable.
    </p>

    <!-- Details card -->
    <div style="background:#0d0d0d;border:1px solid rgba(255,125,6,0.18);border-radius:14px;padding:4px 20px 8px;margin-bottom:24px">
      <p style="margin:12px 0;font-size:11px;color:#ff9f1c;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;border-bottom:1px solid rgba(255,125,6,0.1);padding-bottom:10px">
        ${svg.star} &nbsp;Event Details
      </p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${detailRow(eventIcon, "Event", eventType)}
        ${detailRow(svg.calendar, "Date", dateStr)}
        ${detailRow(svg.clock, "Start Time", time)}
        ${detailRow(svg.users, "Guests", `${guests} Guests`, true)}
      </table>
    </div>

    <!-- What's next box -->
    <div style="background:rgba(250,249,139,0.03);border:1px solid rgba(250,249,139,0.1);border-radius:12px;padding:16px 20px;margin-bottom:24px">
      <p style="margin:0 0 6px;font-size:11px;color:#faf98b;font-weight:700;text-transform:uppercase;letter-spacing:0.12em">
        ${svg.sparkle} &nbsp;What happens next?
      </p>
      <p style="margin:0;font-size:13px;color:#7a7060;line-height:1.7">
        After confirming, our events team will contact you within <strong style="color:#ffffff">24 hours</strong> to discuss your vision, menu preferences, and special arrangements.
      </p>
    </div>

    <!-- CTA -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:20px">
      <tr>
        <td align="center">
          <a href="${confirmLink}"
            style="display:inline-table;background:linear-gradient(135deg,#ff7d06,#faf98b);color:#0f0f0f;text-decoration:none;padding:16px 44px;border-radius:12px;font-weight:800;font-size:16px;letter-spacing:0.02em">
            ${svg.check} &nbsp;Confirm My Event
          </a>
        </td>
      </tr>
    </table>

    <!-- Expiry -->
    <div style="background:rgba(255,125,6,0.04);border:1px solid rgba(255,125,6,0.12);border-radius:10px;padding:14px 18px;text-align:center">
      <p style="margin:0;font-size:12px;color:#4a4540;line-height:1.8">
        ${svg.info} &nbsp;This link expires in <strong style="color:#ff9f1c">24 hours</strong>.<br/>
        If you didn't make this request, you can safely ignore this email.
      </p>
    </div>`;

  await transporter.sendMail({
    from: `"Euphoria Singtam" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Confirm your ${eventType} at Euphoria Singtam`,
    html: emailWrapper(body),
  });
};

module.exports = { sendBookingConfirmation, sendPartyConfirmation };