import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BG_IMAGE = "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=75";

const stats = [
  { v: "5000+", l: "Happy Guests"    },
  { v: "48+",   l: "Signature Drinks" },
  { v: "4.9★",  l: "Guest Rating"    },
];

export default function HeroSection() {
  const [mounted,   setMounted]   = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "#0a0806" }} />
        <img
          src={BG_IMAGE}
          alt=""
          loading="eager"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: imgLoaded ? 0.55 : 0 }}
        />
        {/* Warm colour cast */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(140,100,0,0.3) 0%, rgba(80,50,0,0.25) 50%, rgba(10,6,3,0.15) 100%)",
        }} />
        {/* Left fade for text */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to right, rgba(8,6,4,0.78) 0%, rgba(8,6,4,0.5) 40%, rgba(8,6,4,0.2) 70%, transparent 100%)",
        }} />
        {/* Bottom vignette */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(8,6,4,0.65) 0%, rgba(8,6,4,0.2) 30%, transparent 60%)",
        }} />
        {/* Top fade */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(8,6,4,0.4) 0%, transparent 20%)",
        }} />
        {/* Lemon glow orb */}
        <div className="absolute pointer-events-none" style={{
          width: "40rem", height: "28rem",
          bottom: "-5rem", left: "-5rem",
          background: "radial-gradient(ellipse, rgba(255,125,6,0.08) 0%, transparent 65%)",
          animation: "float 8s ease-in-out infinite",
        }} />
        <div className="absolute pointer-events-none" style={{
          inset: 0,
          background: "radial-gradient(ellipse at 35% 55%, rgba(200,160,0,0.08) 0%, transparent 55%)",
        }} />
      </div>

      {/* ── Navbar spacer — always pushes content below fixed navbar ── */}
      <div style={{ height: "4.5rem", flexShrink: 0 }} />

      {/* ── Content ── */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex-1 flex items-center"
        style={{
          paddingTop: "clamp(5.5rem, 16vw, 9rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        <div className="max-w-2xl">

          {/* Live badge */}
          <div className={`transition-all duration-600 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <span className="tag-fire mb-6 inline-flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#0f0f0f" }} />
              Live Music Every Friday · 8:30 PM Onwards
            </span>
          </div>

          {/* Headline */}
          <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1
              className="font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
                letterSpacing: "-0.01em",
                color: "#ffffff",
                textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              }}
            >
              Euphoria Nights.<br />
              <span className="text-fire-shimmer">Fine Dining.</span><br />
              Rooftop Energy.
            </h1>
          </div>

          {/* Sub */}
          <div className={`transition-all duration-700 delay-350 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{
                color: "rgba(255,245,225,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: "30rem",
                textShadow: "0 1px 12px rgba(0,0,0,0.5)",
              }}
            >
              Experience Singtam's premium lounge restaurant with crafted cocktails, global plates, private event spaces, and unforgettable atmosphere.
            </p>
          </div>

          {/* CTAs — equal width on mobile so both buttons same size */}
          <div className={`flex gap-3 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Link to="/booking"       className="btn-fire flex-1 sm:flex-none text-center" style={{ fontSize: "0.82rem", padding: "0.75rem 1.25rem" }}>Book a Table</Link>
            <Link to="/party-booking" className="btn-outline-fire flex-1 sm:flex-none text-center" style={{ fontSize: "0.82rem", padding: "0.75rem 1.25rem" }}>Book Party Room</Link>
          </div>

          {/* Stats — no wrap, smaller on mobile */}
          <div className={`flex items-center gap-4 sm:gap-8 mt-10 pb-5 transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            {stats.map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && (
                  <div className="w-px h-7 self-center flex-shrink-0" style={{ background: "rgba(255,125,6,0.35)" }} />
                )}
                <div className="flex-shrink-0">
                  <div
                    className="font-black text-fire-grad"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(1.1rem, 4vw, 1.8rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="tracking-widest uppercase mt-0.5"
                    style={{ color: "rgba(250,249,139,0.35)", fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.55rem, 1.8vw, 0.7rem)" }}
                  >
                    {s.l}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 right-10 hidden md:flex flex-col items-center gap-2" style={{ opacity: 0.3 }}>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "#ff9f1c", fontFamily: "'DM Sans', sans-serif", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, #faf98b, transparent)", animation: "float 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}