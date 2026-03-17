import React, { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { LuImages } from "react-icons/lu";
import { GiWineGlass } from "react-icons/gi";

const cats = ["All", "Bar", "Live Music", "Rooftop", "Continental", "Dining", "Cozy Ambiance"];

const items = [
  {
    cat: "Bar",
    title: "The Euphoria Bar",
    desc: "80+ premium spirits, craft cocktails & expert mixology",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=900&q=80&auto=format&fit=crop",
    span: "col-span-2 row-span-2",
    tall: true,
  },
  {
    cat: "Live Music",
    title: "Music Corner",
    desc: "Live bands every weekend, curated playlists nightly",
    img: "./euphoria-singtam-live-music-corner.jpg",
    span: "",
  },
  {
    cat: "Rooftop",
    title: "Rooftop Terrace",
    desc: "Panoramic Himalayan hill views & open-air dining",
    img: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Continental",
    title: "The Kitchen",
    desc: "Beef Wellington & signature continental creations",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Dining",
    title: "Main Dining Hall",
    desc: "Elegant tables, warm amber lighting & timeless ambiance",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=70&auto=format&fit=crop",
    span: "col-span-2",
  },
  {
    cat: "Cozy Ambiance",
    title: "Window Swing Lounge",
    desc: "Signature hanging chairs beside the glass wall — the perfect cozy corner for relaxed evenings",
    img: "./euphoria-singtam-window-swing-lounge.jpg",
    span: "",
  },
  {
    cat: "Bar",
    title: "Cocktail Bar",
    desc: "Watch our mixologists create liquid art in real time",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Live Music",
    title: "Acoustic Nights",
    desc: "Intimate acoustic sessions every Friday from 8:30 PM",
    img: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Rooftop",
    title: "Sunset Sessions",
    desc: "Golden hour cocktails & the Sikkim skyline at dusk",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Continental",
    title: "Signature Plates",
    desc: "Every plate a canvas — plated with passion and precision",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Dining",
    title: "Candlelit Evenings",
    desc: "Where every dinner becomes a memory worth keeping",
    img: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=75&auto=format&fit=crop",
    span: "",
  },
  {
    cat: "Cozy Ambiance",
    title: "Warm Interiors",
    desc: "Handpicked decor that wraps you in warmth and comfort",
    img: "./euphoria-singtam-restaurant-interior.jpg",
    span: "",
  },
];

function GalleryCard({ item }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`} style={{ minHeight: "260px" }}>
      {!loaded && (
        <div className="absolute inset-0 rounded-2xl"
          style={{ background: "linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
      )}
      <img loading="lazy" decoding="async" src={item.img} alt={`${item.title} - Euphoria Singtam bar restaurant Singtam Sikkim`} onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease, transform 0.7s ease" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,3,2,0.92) 0%, rgba(5,3,2,0.35) 45%, rgba(5,3,2,0.12) 100%)" }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(to top, rgba(180,70,0,0.45) 0%, rgba(180,70,0,0.1) 50%, transparent 100%)" }} />
      <div className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(255,125,6,0.35), transparent 70%)" }} />
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <span className="tag-fire flex items-center gap-1" style={{ backdropFilter: "blur(8px)", background: "rgba(255,125,6,0.2)" }}>
          <HiSparkles size={9} /> {item.cat}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-semibold text-white mb-1"
          style={{ fontFamily: "'Playfair Display',serif", fontSize: item.tall ? "1.5rem" : "1.1rem", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: "rgba(255,220,160,0.8)", fontFamily: "'DM Sans',sans-serif" }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter(i => i.cat === active);
  const displayItems = active === "All" ? filtered : filtered.map(i => ({ ...i, span: "" }));

  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>

      {/* Header */}
      <div className="pt-32 pb-16 px-4 text-center relative overflow-hidden" style={{ background: "#0d0d0d" }}>
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=900&q=65&auto=format&fit=crop"
          alt="Euphoria Singtam restaurant interior dining experience Sikkim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.7) 60%, #0d0d0d 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <span className="tag-fire mb-5 inline-flex items-center gap-1.5">
            <GiWineGlass size={12} /> Visual Tour
          </span>
          <h1 className="section-title mb-3">
            Our <span className="text-fire-grad italic">Gallery</span>
          </h1>
          <p className="text-base max-w-sm mx-auto" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            A glimpse into the world of Euphoria
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 px-4 py-4"
        style={{ background: "rgba(9,8,6,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)}
                className="text-xs font-semibold tracking-wide transition-all duration-300 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  background: active === c ? "linear-gradient(135deg,#ff7d06,#faf98b)" : "rgba(255,255,255,0.04)",
                  color: active === c ? "#0f0f0f" : "rgba(255,255,255,0.4)",
                  border: active === c ? "none" : "1px solid rgba(255,125,6,0.18)",
                  boxShadow: active === c ? "0 3px 12px rgba(250,249,139,0.2)" : "none",
                }}>
                {c}
              </button>
            ))}
          </div>
          <span className="text-xs font-medium" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
            {displayItems.length} photos
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 pb-16">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "260px" }}>
          {displayItems.map((item, i) => (
            <GalleryCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
        {displayItems.length === 0 && (
          <div className="text-center py-20">
            <LuImages size={48} style={{ color: "#3a3530", margin: "0 auto 1rem" }} />
            <p style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>No photos in this category yet</p>
          </div>
        )}
      </div>
    </div>
  );
}