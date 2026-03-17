import React from "react";
import { Link } from "react-router-dom";
import { LuZap, LuLeaf, LuHeart, LuArrowRight, LuInstagram } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";

const milestones = [
  { year: "2021", title: "The Vision",        desc: "Anand returns to Singtam with a dream — world-class hospitality in the Himalayas." },
  { year: "2022", title: "Building Euphoria", desc: "Months crafting every detail: the bar, the kitchen, the vibe. No compromises." },
  { year: "2023", title: "Grand Opening",     desc: "Euphoria opens and immediately becomes Sikkim's most talked-about destination." },
  { year: "2024", title: "Growing Legacy",    desc: "Live music nights, rooftop expansion, private events — a true cultural landmark." },
];

const values = [
  { Icon: LuZap,      color: "#ff9f1c", title: "Craftsmanship", desc: "Every dish, every drink executed with precision and passion." },
  { Icon: LuLeaf,     color: "#4ade80", title: "Authenticity",  desc: "Local ingredients elevated by continental techniques." },
  { Icon: HiSparkles, color: "#ff9f1c", title: "Experience",    desc: "We create moments, not just meals." },
  { Icon: LuHeart,    color: "#f472b6", title: "Community",     desc: "Rooted in Singtam, proud of Sikkim, welcoming the world." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>

      {/* ── Header ── */}
      <div className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 text-center relative overflow-hidden" style={{ background: "#0d0d0d" }}>
        {/* Background image */}
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=65&auto=format&fit=crop"
          alt="Euphoria Singtam rooftop bar restaurant ambiance Singtam Sikkim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18, objectPosition: "center 40%" }}
        />
        {/* Bottom fade */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.7) 60%, #0d0d0d 100%)" }} />
        {/* Amber glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="tag-fire mb-5 inline-flex items-center gap-1.5">
            <HiSparkles size={11} /> Our Story
          </span>
          <h1 className="section-title mb-4">
            About <span className="text-fire-grad italic">Euphoria</span>
          </h1>
          <p className="text-sm sm:text-base max-w-md mx-auto" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            A story of passion, pride, and the pursuit of extraordinary experiences in the mountains of Sikkim.
          </p>
        </div>
      </div>

      {/* ── Story + Values ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Story text */}
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl text-white mb-5"
              style={{ fontFamily: "'Playfair Display',serif" }}>
              The Story of <span className="text-fire-grad">Euphoria</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
              <p>Euphoria Singtam was born from one belief: the people of Sikkim deserve a world-class hospitality experience without leaving the mountains they love.</p>
              <p>What began as an idea became a movement — a premium bar and restaurant that honors East Sikkim's natural splendor while delivering metropolitan sophistication in every detail.</p>
              <p>From curated cocktails to signature continental dishes, from live music to rooftop dining under the Himalayan sky — every element is intentional, crafted, and deeply personal.</p>
            </div>
            <div className="mt-8">
              <Link to="/booking" className="btn-fire" style={{ padding: "0.75rem 2rem" }}>
                <LuArrowRight size={14} /> Reserve a Table
              </Link>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {values.map(({ Icon, color, title, desc }) => (
              <div key={title} className="card rounded-xl p-5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <h3 className="font-semibold text-sm text-white mb-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: "#0d0d0d" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="tag-fire mb-4 inline-flex items-center gap-1.5">Journey</span>
            <h2 className="section-title">Our <span className="text-fire-grad italic">Timeline</span></h2>
          </div>
          <div className="relative pl-8 border-l" style={{ borderColor: "rgba(255,125,6,0.2)" }}>
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative ${i < milestones.length - 1 ? "mb-10" : ""}`}>
                {/* Dot */}
                <div className="absolute -left-[41px] w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)", top: "6px" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#080808" }} />
                </div>
                <span className="font-bold text-2xl sm:text-3xl text-fire-grad block mb-1"
                  style={{ fontFamily: "'Playfair Display',serif" }}>{m.year}</span>
                <h3 className="font-semibold text-base sm:text-lg text-white mb-1.5"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>{m.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="py-14 sm:py-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-6">
            <span className="tag-fire inline-flex items-center gap-1.5">
              <HiSparkles size={11} /> The Visionary
            </span>
          </div>
          <div className="card rounded-2xl p-7 sm:p-10 text-center">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 flex-shrink-0"
              style={{ border: "2px solid rgba(255,125,6,0.35)", boxShadow: "0 0 24px rgba(255,125,6,0.15)" }}>
              <img
                src="/anand-lamichaney-founder-euphoria-singtam.png"
                alt="Anand Lamichaney founder Euphoria Singtam bar restaurant Sikkim"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Name */}
            <h3 className="font-bold text-xl text-white mb-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Anand Lamichaney
            </h3>

            {/* Handle */}
            <p className="text-sm font-semibold mb-1" style={{ color: "#ff9f1c", fontFamily: "'DM Sans',sans-serif" }}>
              Mr.@one
            </p>

            {/* Role */}
            <p className="text-xs tracking-widest uppercase mb-5" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
              Founder · Entrepreneur · Social Media Influencer
            </p>

            {/* Divider */}
            <div className="w-12 h-px mx-auto mb-5" style={{ background: "rgba(250,249,139,0.2)" }} />

            {/* Bio */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
              A Singtam native with a global perspective, Anand transformed his entrepreneurial vision into Euphoria — one of Sikkim's most celebrated destinations.
            </p>

            {/* Quote */}
            <blockquote className="text-sm sm:text-base italic mb-6 px-2"
              style={{ color: "rgba(255,245,225,0.6)", fontFamily: "'DM Sans',sans-serif", borderLeft: "2px solid rgba(250,249,139,0.2)", textAlign: "left", paddingLeft: "1rem" }}>
              "I wanted Singtam to have something world-class — a place where every evening feels like a celebration."
            </blockquote>

            {/* Instagram */}
            <a href="https://www.instagram.com/mr.a_one?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(225,48,108,0.08)", border: "1px solid rgba(225,48,108,0.2)", color: "#E1306C", fontFamily: "'DM Sans',sans-serif" }}>
              <LuInstagram size={15} /> Follow @mr.one
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}