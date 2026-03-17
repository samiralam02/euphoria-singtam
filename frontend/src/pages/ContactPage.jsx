import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuMapPin, LuPhone, LuMail, LuClock, LuSend, LuCircleCheck,
  LuArrowRight, LuCalendarCheck, LuChevronDown,
  LuUtensils, LuPartyPopper, LuBriefcase, LuStar, LuCamera, LuMessageCircle,
} from "react-icons/lu";
import { MdWhatsapp } from "react-icons/md";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const hours = [
  { d: "Mon – Thu", t: "11am – 11pm", hot: false },
  { d: "Friday",    t: "12pm – 1am",  hot: true  },
  { d: "Saturday",  t: "12pm – 1am",  hot: true  },
  { d: "Sunday",    t: "11am – 11pm", hot: false },
];

const socials = [
  { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com",      color: "#E1306C" },
  { Icon: FaFacebookF, label: "Facebook",  href: "https://facebook.com",       color: "#1877F2" },
  { Icon: FaYoutube,   label: "YouTube",   href: "https://youtube.com",        color: "#FF0000" },
  { Icon: MdWhatsapp,  label: "WhatsApp",  href: "https://wa.me/918101497215", color: "#25D366" },
];

const subjects = [
  { value: "Table Reservation", label: "Table Reservation", Icon: LuUtensils,      color: "#ff9f1c" },
  { value: "Private Event",     label: "Private Event",     Icon: LuPartyPopper,   color: "#f472b6" },
  { value: "Corporate Event",   label: "Corporate Event",   Icon: LuBriefcase,     color: "#60a5fa" },
  { value: "Feedback",          label: "Feedback",          Icon: LuStar,          color: "#fbbf24" },
  { value: "Media / Press",     label: "Media / Press",     Icon: LuCamera,        color: "#a78bfa" },
  { value: "Other",             label: "Other",             Icon: LuMessageCircle, color: "#6b7280" },
];

function SubjectDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = subjects.find(s => s.value === value);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="input-fire w-full flex items-center justify-between gap-3 text-left"
        style={{ cursor: "pointer" }}>
        {selected ? (
          <span className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: `${selected.color}15` }}>
              <selected.Icon size={12} style={{ color: selected.color }} />
            </span>
            <span style={{ color: "rgba(255,245,225,0.85)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem" }}>
              {selected.label}
            </span>
          </span>
        ) : (
          <span style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem" }}>
            Select a topic…
          </span>
        )}
        <LuChevronDown size={14} style={{ color: "#4a4540", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden mt-1"
          style={{ background: "#131110", border: "1px solid rgba(255,125,6,0.18)", boxShadow: "0 20px 48px rgba(0,0,0,0.8)" }}>
          {subjects.map(s => (
            <button key={s.value} type="button" onClick={() => { onChange(s.value); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
              style={{ background: value === s.value ? `${s.color}08` : "transparent", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              onMouseOver={e => { if (value !== s.value) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseOut={e => { if (value !== s.value) e.currentTarget.style.background = "transparent"; }}>
              <span className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: `${s.color}12` }}>
                <s.Icon size={12} style={{ color: s.color }} />
              </span>
              <span className="text-sm" style={{ color: value === s.value ? s.color : "rgba(255,245,225,0.6)", fontFamily: "'DM Sans',sans-serif" }}>
                {s.label}
              </span>
              {value === s.value && <LuCircleCheck size={12} style={{ color: s.color, marginLeft: "auto" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const Lbl = ({ children }) => (
  <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block"
    style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans',sans-serif" }}>{children}</label>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.subject) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name: "", email: "", subject: "", message: "" }); }, 1200);
  };

  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>

      {/* Header */}
      <div className="pt-32 pb-16 px-4 text-center relative overflow-hidden" style={{ background: "#0b0b0b", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=65&auto=format&fit=crop"
          alt="Euphoria Singtam cocktail bar premium drinks Singtam Sikkim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(11,11,11,0.5) 0%, rgba(11,11,11,0.7) 60%, #0b0b0b 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <span className="tag-fire mb-4 inline-flex items-center gap-1.5">
            <LuMail size={11} /> Contact
          </span>
          <h1 className="section-title mb-3">Get in <span className="text-fire-grad italic">Touch</span></h1>
          <p className="text-sm max-w-xs mx-auto" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            Reservations, events, or just a hello.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-3">

            {/* Info rows */}
            <div className="card rounded-2xl divide-y" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
              {[
                { Icon: LuMapPin, label: "Address", val: "1st floor of Apollo Diagnostic Centre , Near Dhamala Hardware , Singtam,\n East Sikkim 737134, India",   href: "https://maps.google.com/?q=Singtam+Sikkim" },
                { Icon: LuPhone,  label: "Phone",   val: "+91 8101497215",                       href: "tel:+918101497215" },
                { Icon: LuMail,   label: "Email",   val: "euphoriasingtam@gmail.com",             href: "mailto:euphoriasingtam@gmail.com" },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02] group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", textDecoration: "none" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,125,6,0.07)", border: "1px solid rgba(255,125,6,0.18)" }}>
                    <Icon size={14} style={{ color: "#ff9f1c" }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#3a3530", fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
                    {val.split("\n").map(line => (
                      <p key={line} className="text-sm leading-snug transition-colors group-hover:text-white/70" style={{ color: "#6a6058", fontFamily: "'DM Sans',sans-serif" }}>{line}</p>
                    ))}
                  </div>
                  <LuArrowRight size={13} style={{ color: "#3a3530", marginLeft: "auto", flexShrink: 0, alignSelf: "center" }}
                    className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <LuClock size={13} style={{ color: "#ff9f1c" }} />
                <span className="text-xs font-bold tracking-widest uppercase text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>Hours</span>
              </div>
              <div className="px-5">
                {hours.map((h, i) => (
                  <div key={h.d} className="flex items-center justify-between py-3"
                    style={{ borderBottom: i < hours.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                    <span className="text-sm" style={{ color: h.hot ? "rgba(255,255,255,0.65)" : "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{h.d}</span>
                    <div className="flex items-center gap-2" style={{ flexWrap: "nowrap" }}>
                      <span className="text-sm" style={{ color: h.hot ? "#ff9f1c" : "rgba(255,255,255,0.25)", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>{h.t}</span>
                      {h.hot && <span className="tag-fire" style={{ padding: "0.08rem 0.45rem", fontSize: "0.55rem", flexShrink: 0 }}>Live</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <HiSparkles size={13} style={{ color: "#ff9f1c" }} />
                <span className="text-xs font-bold tracking-widest uppercase text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>Follow</span>
              </div>
              <div className="px-5 py-4 flex items-center gap-2.5">
                {socials.map(({ Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: `${color}10`, border: `1px solid ${color}18` }}
                    onMouseOver={e => { e.currentTarget.style.background = `${color}20`; e.currentTarget.style.borderColor = `${color}40`; }}
                    onMouseOut={e => { e.currentTarget.style.background = `${color}10`; e.currentTarget.style.borderColor = `${color}18`; }}>
                    <Icon size={15} style={{ color }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Book CTA */}
            <Link to="/booking"
              className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 group"
              style={{ background: "rgba(255,125,6,0.05)", border: "1px solid rgba(255,125,6,0.18)" }}>
              <div className="flex items-center gap-3">
                <LuCalendarCheck size={16} style={{ color: "#ff9f1c" }} />
                <span className="text-sm font-medium text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>Book a Table</span>
              </div>
              <LuArrowRight size={14} style={{ color: "#ff7d06" }} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card rounded-2xl overflow-hidden">
              <div className="px-7 py-5 flex items-center gap-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,125,6,0.02)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)", boxShadow: "0 3px 12px rgba(250,249,139,0.2)" }}>
                  <LuSend size={15} style={{ color: "#0f0f0f" }} />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white" style={{ fontFamily: "'Playfair Display',serif" }}>Send a Message</h2>
                  <p className="text-xs" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="px-7 py-7">
                {sent ? (
                  <div className="text-center py-14">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}>
                      <LuCircleCheck size={24} style={{ color: "#4ade80" }} />
                    </div>
                    <h3 className="font-bold text-xl mb-1.5" style={{ fontFamily: "'Playfair Display',serif", color: "#4ade80" }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm mb-7" style={{ color: "rgba(74,222,128,0.45)", fontFamily: "'DM Sans',sans-serif" }}>
                      We'll get back to you within 24 hours.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-outline-fire" style={{ padding: "0.55rem 1.5rem", fontSize: "0.85rem" }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Lbl>Name *</Lbl>
                        <input type="text" name="name" value={form.name} onChange={onChange}
                          placeholder="Your name" required className="input-fire" />
                      </div>
                      <div>
                        <Lbl>Email *</Lbl>
                        <input type="email" name="email" value={form.email} onChange={onChange}
                          placeholder="your@email.com" required className="input-fire" />
                      </div>
                    </div>
                    <div>
                      <Lbl>Subject *</Lbl>
                      <SubjectDropdown value={form.subject} onChange={(val) => setForm(p => ({ ...p, subject: val }))} />
                    </div>
                    <div>
                      <Lbl>Message *</Lbl>
                      <textarea name="message" value={form.message} onChange={onChange}
                        placeholder="Tell us how we can help…" rows={6} required className="input-fire resize-none" />
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-fire w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontSize: "0.875rem" }}>
                      {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Sending…
                          </span>
                        : <span className="flex items-center justify-center gap-2">
                            <LuSend size={13} /> Send Message
                          </span>}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="card rounded-2xl overflow-hidden mt-4">
              <div className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2">
                  <LuMapPin size={13} style={{ color: "#ff9f1c" }} />
                  <span className="text-xs font-bold tracking-widest uppercase text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>Location</span>
                </div>
                <a href="https://maps.google.com/?q=Singtam+Sikkim" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-xs transition-colors hover:text-white"
                  style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
                  Open in Maps <LuArrowRight size={10} />
                </a>
              </div>
              <div style={{ height: "190px" }}>
                <iframe title="Euphoria Singtam Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14193.38!2d88.5024!3d27.2290!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56c2a2b6a1b%3A0x1234567890abcdef!2sSingtam%2C%20Sikkim%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.35)" }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}