import React from "react";
import BookingForm from "../components/BookingForm";
import { LuClock, LuMapPin, LuPhone, LuMail, LuUsers, LuCalendarCheck, LuInfo } from "react-icons/lu";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { HiSparkles } from "react-icons/hi2";

const hours = [
  { d: "Monday",    t: "12:00 PM – 11:00 PM" },
  { d: "Tuesday",   t: "12:00 PM – 11:00 PM" },
  { d: "Wednesday", t: "12:00 PM – 11:00 PM" },
  { d: "Thursday",  t: "12:00 PM – 11:00 PM" },
  { d: "Friday",    t: "12:00 PM – 1:00 AM",  hot: true },
  { d: "Saturday",  t: "12:00 PM – 1:00 AM",  hot: true },
  { d: "Sunday",    t: "12:00 PM – 11:00 PM" },
];

const perks = [
  { icon: GiForkKnifeSpoon, label: "Premium Dining",    desc: "Multi-course continental experience" },
  { icon: LuUsers,          label: "Groups Welcome",    desc: "Up to 50 guests comfortably" },
  { icon: HiSparkles,       label: "Special Occasions", desc: "Birthdays, anniversaries & more" },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>

      {/* ── Hero header ───────────────────────────────────── */}
      <div className="pt-32 pb-16 px-4 text-center relative overflow-hidden" style={{ background: "#0d0d0d" }}>
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=900&q=65&auto=format&fit=crop"
          alt="Euphoria Singtam table booking reservation dining setup Singtam"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.7) 60%, #0d0d0d 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />
        {/* Decorative fork-knife bg icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.03 }}>
          <GiForkKnifeSpoon size={400} style={{ color: "#ff7d06" }} />
        </div>
        <div className="relative z-10">
          <span className="tag-fire mb-5 inline-flex items-center gap-1.5">
            <LuCalendarCheck size={12} /> Reservations
          </span>
          <h1 className="section-title mb-3">
            Reserve Your <span className="text-fire-grad italic">Table</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            We'll have everything ready for a perfect evening
          </p>
        </div>
      </div>

      {/* ── Perks strip ───────────────────────────────────── */}
      <div style={{ background: "#0a0a0a", borderBottom: "1px solid rgba(255,125,6,0.07)" }}>
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {perks.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,125,6,0.07)", border: "1px solid rgba(255,125,6,0.18)" }}>
                <Icon size={18} style={{ color: "#ff9f1c" }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
                <div className="text-xs" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Left sidebar ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Hours card */}
            <div className="card rounded-2xl overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-3 px-6 py-4" style={{ background: "rgba(255,125,6,0.06)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,125,6,0.12)", border: "1px solid rgba(255,125,6,0.25)" }}>
                  <LuClock size={15} style={{ color: "#ff9f1c" }} />
                </div>
                <h3 className="font-display font-semibold text-base text-white" style={{ fontFamily: "'Playfair Display',serif" }}>
                  Dining Hours
                </h3>
              </div>
              {/* Hours list */}
              <div className="px-6 py-2">
                {hours.map(h => (
                  <div key={h.d} className="flex justify-between items-center py-2.5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="text-sm" style={{ color: h.hot ? "rgba(255,255,255,0.75)" : "#7a7060", fontFamily: "'DM Sans',sans-serif", fontWeight: h.hot ? 500 : 400 }}>
                      {h.d}
                    </span>
                    <div className="flex items-center gap-2">
                      {h.hot && (
                        <span className="tag-fire text-xs" style={{ padding: "0.1rem 0.5rem", fontSize: "0.6rem" }}>Live Night</span>
                      )}
                      <span className="text-sm font-semibold" style={{ color: h.hot ? "#ff9f1c" : "rgba(255,255,255,0.5)", fontFamily: "'DM Sans',sans-serif" }}>
                        {h.t}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4" style={{ background: "rgba(255,125,6,0.06)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,125,6,0.12)", border: "1px solid rgba(255,125,6,0.25)" }}>
                  <LuPhone size={15} style={{ color: "#ff9f1c" }} />
                </div>
                <h3 className="font-display font-semibold text-base text-white" style={{ fontFamily: "'Playfair Display',serif" }}>
                  Get in Touch
                </h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                {[
                  { Icon: LuMapPin, text: "Singtam, East Sikkim – 737134, India", href: null },
                  { Icon: LuPhone,  text: "+91 98765 43210", href: "tel:+919876543210" },
                  { Icon: LuMail,   text: "hello@euphoriasingtam.com", href: "mailto:hello@euphoriasingtam.com" },
                ].map(({ Icon, text, href }) => (
                  <div key={text} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-orange-500"
                      style={{ background: "rgba(255,125,6,0.06)", border: "1px solid rgba(255,125,6,0.18)" }}>
                      <Icon size={14} style={{ color: "#ff9f1c" }} />
                    </div>
                    {href ? (
                      <a href={href} className="text-sm mt-1.5 transition-colors duration-200 hover:text-white"
                        style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
                        {text}
                      </a>
                    ) : (
                      <p className="text-sm mt-1.5" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{text}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info tip */}
            <div className="rounded-2xl p-5 flex items-start gap-4"
              style={{ background: "rgba(255,125,6,0.05)", border: "1px solid rgba(255,125,6,0.2)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(255,125,6,0.12)", border: "1px solid rgba(255,125,6,0.25)" }}>
                <LuInfo size={14} style={{ color: "#ff9f1c" }} />
              </div>
              <p className="text-sm leading-relaxed italic" style={{ color: "#ff9f1c", fontFamily: "'DM Sans',sans-serif", opacity: 0.85 }}>
                For groups of 10 or more, we recommend calling ahead to ensure we can accommodate your party perfectly.
              </p>
            </div>
          </div>

          {/* ── Form panel ── */}
          <div className="lg:col-span-3">
            <div className="card rounded-2xl overflow-hidden">
              {/* Form header */}
              <div className="px-8 py-6 flex items-center gap-4" style={{ background: "rgba(255,125,6,0.05)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)", boxShadow: "0 4px 16px rgba(255,125,6,0.4)" }}>
                  <LuCalendarCheck size={20} style={{ color: "#0f0f0f" }} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>
                    Make a Reservation
                  </h2>
                  <p className="text-xs mt-0.5" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
                    Fill in the details below — we'll confirm within 30 minutes
                  </p>
                </div>
              </div>
              {/* Form body */}
              <div className="px-8 py-8">
                <BookingForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}