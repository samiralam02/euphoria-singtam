const https = require("https");

// ── Known disposable domains — hardcoded fallback ────────────────────────────
const KNOWN_DISPOSABLE = new Set([
  "mailinator.com","guerrillamail.com","guerrillamail.net","guerrillamail.org",
  "guerrillamail.biz","guerrillamail.de","guerrillamail.info","yopmail.com",
  "yopmail.fr","tempmail.com","temp-mail.org","temp-mail.io","throwam.com",
  "trashmail.com","trashmail.at","trashmail.io","trashmail.me","trashmail.net",
  "trashmail.org","trashmail.xyz","maildrop.cc","mailnull.com","mailnesia.com",
  "10minutemail.com","10minutemail.net","fakeinbox.com","dispostable.com",
  "getnada.com","getairmail.com","sharklasers.com","grr.la","spam4.me",
  "spamgourmet.com","emailondeck.com","mohmal.com","mailsac.com","mailexpire.com",
  "spambox.us","guerrillamailblock.com","trashdevil.com","trashcanmail.com",
  "throwaway.email","nada.email","moakt.cc","moakt.com","tempr.email",
]);

// ── 1. Quick local check ─────────────────────────────────────────────────────
const isKnownDisposable = (email) => {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  if (KNOWN_DISPOSABLE.has(domain)) return true;
  try {
    const pkg = require("disposable-email-domains");
    return pkg.includes(domain);
  } catch { return false; }
};

// ── 2. Abstract API live check ───────────────────────────────────────────────
const checkEmailWithAbstract = (email) => {
  return new Promise((resolve) => {
    const apiKey = process.env.ABSTRACT_API_KEY;

    // If no API key configured, skip live check
    if (!apiKey || apiKey === "your_abstract_api_key_here") {
      return resolve({ valid: true, skipped: true });
    }

    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

    https.get(url, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);

          // Reject if undeliverable
          if (json.deliverability === "UNDELIVERABLE") {
            return resolve({ valid: false, reason: "This email address does not exist. Please use a real email." });
          }

          // Reject if it's a disposable/temporary email
          if (json.is_disposable_email?.value === true) {
            return resolve({ valid: false, reason: "Temporary email addresses are not allowed. Please use a permanent email." });
          }

          // Reject if format is invalid
          if (json.is_valid_format?.value === false) {
            return resolve({ valid: false, reason: "Please enter a valid email address." });
          }

          resolve({ valid: true });
        } catch {
          // If API response can't be parsed, allow through (fail open)
          resolve({ valid: true, skipped: true });
        }
      });
    }).on("error", () => {
      // On network error, allow through (fail open — don't block real users)
      resolve({ valid: true, skipped: true });
    });
  });
};

// ── Main validator — runs both checks ────────────────────────────────────────
const validateEmail = async (email) => {
  // Step 1: instant local check
  if (isKnownDisposable(email)) {
    return { valid: false, reason: "Temporary email addresses are not allowed. Please use a permanent email." };
  }

  // Step 2: live Abstract API check
  return await checkEmailWithAbstract(email);
};

module.exports = { validateEmail, isKnownDisposable };