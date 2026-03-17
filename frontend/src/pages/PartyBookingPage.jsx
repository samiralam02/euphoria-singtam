import React from "react";
import PartyBookingForm from "../components/PartyBookingForm";
import { LuPartyPopper, LuUsers, LuMusic, LuCamera, LuGlassWater, LuFlower2, LuSpeaker, LuCalendarCheck } from "react-icons/lu";
import { GiBalloons, GiCrystalBall } from "react-icons/gi";
import { MdBusinessCenter } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { TbChefHat } from "react-icons/tb";

const eventTypes = [
  {
    Icon: GiBalloons,
    title: "Birthday Parties",
    desc: "Custom decoration, cake service, dedicated host & surprise setups",
    color: "#ff9f1c",
    glow: "rgba(255,159,28,0.2)",
    tag: "Most Popular",
  },
  {
    Icon: GiCrystalBall,
    title: "Private Parties",
    desc: "Exclusive venue hire, curated cocktail menus & personalized themes",
    color: "#faf98b",
    glow: "rgba(250,249,139,0.15)",
    tag: "Exclusive",
  },
  {
    Icon: MdBusinessCenter,
    title: "Corporate Events",
    desc: "Professional A/V setup, fine dining experience & seamless coordination",
    color: "#ffb129",
    glow: "rgba(255,177,41,0.18)",
    tag: "Professional",
  },
];

const included = [
  { Icon: TbChefHat,     label: "Custom Menu Planning",     desc: "Tailored multi-course menus" },
  { Icon: LuFlower2,     label: "Decoration & Florals",     desc: "Themed setups & fresh flowers" },
  { Icon: LuSpeaker,     label: "Premium Audio & Lighting", desc: "Full AV system included" },
  { Icon: LuGlassWater,  label: "Welcome Drinks",           desc: "Curated arrival cocktails" },
  { Icon: LuMusic,       label: "Live Music Options",       desc: "Bands & acoustic artists" },
  { Icon: LuCamera,      label: "Photography",              desc: "We arrange the perfect shots" },
  { Icon: LuUsers,       label: "Dedicated Coordinator",    desc: "One point of contact always" },
  { Icon: LuPartyPopper, label: "Exclusive Venue Access",   desc: "Private space, your rules" },
];

const venues = [
  { name: "Party Room A",    cap: "Up to 30"  },
  { name: "Party Room B",    cap: "Up to 60"  },
  { name: "Rooftop Terrace", cap: "Up to 100" },
  { name: "Full Venue",      cap: "Up to 200" },
];

export default function PartyBookingPage() {
  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>

      {/* ── Header ── */}
      <div className="pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 text-center relative overflow-hidden"
        style={{ background: "#0d0d0d" }}>
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=65&auto=format&fit=crop"
          alt="Euphoria Singtam rooftop private party event space Singtam Sikkim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.7) 60%, #0d0d0d 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="tag-fire mb-4 inline-flex items-center gap-1.5">
            <HiSparkles size={12} /> Private Events
          </span>
          <h1 className="section-title mb-3">
            Host Your <span className="text-fire-grad italic">Event</span>
          </h1>
          <p className="text-sm sm:text-base max-w-sm mx-auto"
            style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            Birthdays, private parties, corporate events — every detail crafted to perfection
          </p>
        </div>
      </div>

      {/* ── Event type cards ── */}
      <section className="py-10 sm:py-14 px-4 sm:px-6"
        style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,125,6,0.07)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {eventTypes.map(({ Icon, title, desc, color, glow, tag }) => (
            <div key={title}
              className="relative group rounded-2xl p-6 sm:p-8 text-center hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-default"
              style={{ background: "#111", border: `1px solid ${color}25` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${glow} 0%, transparent 65%)` }} />
              <div className="absolute top-3.5 right-3.5">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}30`, fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  {tag}
                </span>
              </div>
              <div className="relative inline-flex items-center justify-center mb-5 sm:mb-6">
                <div className="absolute rounded-full group-hover:scale-110 transition-transform duration-500"
                  style={{ inset: "-12px", border: `1px solid ${color}20`, borderRadius: "50%" }} />
                <div className="absolute rounded-full"
                  style={{ inset: "-6px", border: `1px solid ${color}35`, borderRadius: "50%" }} />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: `radial-gradient(circle, ${color}20 0%, ${color}08 100%)`, border: `1.5px solid ${color}40`, boxShadow: `0 0 30px ${glow}` }}>
                  <Icon size={30} style={{ color }} />
                </div>
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-white mb-2 relative z-10"
                style={{ fontFamily: "'Playfair Display',serif" }}>{title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed relative z-10"
                style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">

          {/* ── Left sidebar ── */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">

            {/* What's Included */}
            <div className="card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4"
                style={{ background: "rgba(255,125,6,0.06)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,125,6,0.12)", border: "1px solid rgba(255,125,6,0.25)" }}>
                  <HiSparkles size={14} style={{ color: "#ff9f1c" }} />
                </div>
                <h3 className="font-semibold text-base text-white"
                  style={{ fontFamily: "'Playfair Display',serif" }}>
                  What's Included
                </h3>
              </div>

              {/* Always single column — no cramped 2-col on mobile */}
              <div className="px-4 py-3 flex flex-col">
                {included.map(({ Icon, label, desc }) => (
                  <div key={label}
                    className="flex items-center gap-3 px-1 py-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,125,6,0.07)", border: "1px solid rgba(255,125,6,0.18)" }}>
                      <Icon size={14} style={{ color: "#ff9f1c" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-white"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
                      <div className="text-xs mt-0.5"
                        style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Capacity */}
            <div className="card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4"
                style={{ background: "rgba(255,125,6,0.06)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,125,6,0.12)", border: "1px solid rgba(255,125,6,0.25)" }}>
                  <LuUsers size={14} style={{ color: "#ff9f1c" }} />
                </div>
                <h3 className="font-semibold text-base text-white"
                  style={{ fontFamily: "'Playfair Display',serif" }}>
                  Venue Capacity
                </h3>
              </div>

              {/* Always single column — no cramped 2-col on mobile */}
              <div className="px-5 py-2">
                {venues.map((v, i) => (
                  <div key={v.name}
                    className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: i < venues.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span className="text-sm"
                      style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{v.name}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "rgba(255,125,6,0.1)", color: "#ff9f1c", border: "1px solid rgba(255,125,6,0.25)", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>
                      {v.cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <div className="card rounded-2xl overflow-hidden">
              <div className="px-6 sm:px-8 py-5 sm:py-6 flex items-center gap-3 sm:gap-4"
                style={{ background: "rgba(255,125,6,0.05)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)", boxShadow: "0 4px 16px rgba(255,125,6,0.4)" }}>
                  <LuCalendarCheck size={18} style={{ color: "#0f0f0f" }} />
                </div>
                <div>
                  <h2 className="font-bold text-lg sm:text-xl text-white"
                    style={{ fontFamily: "'Playfair Display',serif" }}>
                    Request an Event
                  </h2>
                  <p className="text-xs mt-0.5"
                    style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
                    Tell us your vision — we'll make it unforgettable
                  </p>
                </div>
              </div>
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <PartyBookingForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}