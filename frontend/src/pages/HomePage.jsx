import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { GiWineGlass, GiMicrophone, GiMountainRoad, GiBalloons } from "react-icons/gi";
import { LuArrowRight, LuCalendarCheck } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";

const features = [
  { icon: GiWineGlass,    title: "Craft Bar",      desc: "80+ premium spirits & creative cocktails" },
  { icon: GiMicrophone,   title: "Live Music",     desc: "Bands every weekend, curated playlists nightly" },
  { icon: GiMountainRoad, title: "Rooftop",        desc: "Open-air dining with Himalayan hill views" },
  { icon: GiBalloons,     title: "Private Events", desc: "Exclusive rooms for every celebration" },
];

const dishes = [
  { name:"Beef Wellington",       desc:"Tender fillet, mushroom duxelles, prosciutto, golden puff pastry", price:"₹1,850", tag:"Chef's Pick",  color:"#ffb129", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=75&auto=format&fit=crop" },
  { name:"Lobster Risotto",       desc:"Ceylon lobster, saffron Arborio, Parmesan cream, micro herbs",    price:"₹2,200", tag:"Seafood",      color:"#22d3ee", img:"https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=75&auto=format&fit=crop" },
  { name:"Sticky Toffee Pudding", desc:"Warm date sponge, butterscotch sauce, vanilla cream",             price:"₹580",   tag:"Dessert",      color:"#f472b6", img:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=75&auto=format&fit=crop" },
  { name:"Veg Combo",             desc:"Seasonal veggies, aromatic dal, fragrant rice, artisan bread",    price:"₹650",   tag:"Vegetarian",   color:"#4ade80", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=75&auto=format&fit=crop" },
  { name:"Non Veg Combo",         desc:"Grilled proteins, braised curry, biryani rice, condiments",       price:"₹950",   tag:"Popular",      color:"#fb923c", img:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=75&auto=format&fit=crop" },
];

const teamImages = [
  { src:"https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=700&q=70&auto=format&fit=crop", caption:"The people behind every perfect evening" },
  { src:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=70&auto=format&fit=crop", caption:"Crafting every dish with passion" },
  { src:"https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=700&q=70&auto=format&fit=crop", caption:"Serving smiles, one table at a time" },
  { src:"https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=700&q=70&auto=format&fit=crop",   caption:"Where every night becomes a memory" },
];

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-3">
    <div style={{ width:"1.5rem", height:"1px", background:"linear-gradient(to right,transparent,#faf98b)" }} />
    <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color:"#ff9f1c", fontFamily:"'DM Sans',sans-serif" }}>
      {children}
    </span>
  </div>
);

export default function HomePage() {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % teamImages.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background:"#080808" }}>
      <HeroSection />

      {/* ── Feature strip ── */}
      <section style={{ background:"#0f0f0f", borderTop:"1px solid rgba(255,125,6,0.1)", borderBottom:"1px solid rgba(255,125,6,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {features.map(({ icon:Icon, title, desc }) => (
            <div key={title} className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:-translate-y-1"
                style={{ background:"rgba(255,125,6,0.08)", border:"1px solid rgba(255,125,6,0.2)" }}>
                <Icon size={22} style={{ color:"#ff9f1c" }} />
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1 text-white" style={{ fontFamily:"'Playfair Display',serif" }}>{title}</h3>
              <p className="text-xs leading-relaxed hidden sm:block" style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About intro ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background:"#080808" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="section-title mb-5 sm:mb-6">
              More than a<br /><span className="text-fire-grad">restaurant</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}>
              Nestled in the heart of Singtam, Euphoria is a destination. Hand-crafted cocktails, exquisite continental cuisine, live music — every detail curated to create memories.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}>
              Under the vision of entrepreneur{" "}
              <span style={{ color:"#ff9f1c", fontWeight:600 }}>Anand Lamichaney (Mr.@one)</span>
              , Euphoria brings metropolitan sophistication to the Sikkim mountains.
            </p>
            <Link to="/about" className="btn-outline-fire">
              Read Our Story <LuArrowRight size={14} />
            </Link>
          </div>

          {/* Team slideshow */}
          <div className="relative rounded-2xl overflow-hidden" style={{ height:"26rem", border:"1px solid rgba(255,125,6,0.18)" }}>
            {teamImages.map((img, i) => (
              <img key={img.src} src={img.src} alt="Euphoria Singtam team and restaurant interiors Singtam Sikkim" loading="lazy" decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === imgIdx ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)" }} />
            <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 50% 100%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />
            <div className="absolute bottom-6 left-6 right-14">
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color:"#ff9f1c", fontFamily:"'DM Sans',sans-serif" }}>Our Team</p>
              <p className="text-sm" style={{ color:"rgba(255,245,225,0.5)", fontFamily:"'DM Sans',sans-serif" }}>{teamImages[imgIdx].caption}</p>
            </div>
            <div className="absolute bottom-6 right-5 flex items-center gap-1.5">
              {teamImages.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className="rounded-full transition-all duration-300"
                  style={{ width: i===imgIdx?"1.25rem":"0.375rem", height:"0.375rem", background: i===imgIdx?"#ff9f1c":"rgba(255,255,255,0.25)", border:"none", cursor:"pointer" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature Dishes ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" style={{ background:"#0d0d0d" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <SectionLabel>Signature Dishes</SectionLabel>
            <h2 className="section-title">Dishes that <span className="text-fire-grad italic">hit different</span></h2>
            <p className="text-sm sm:text-base mt-3 max-w-md mx-auto" style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}>
              Crafted with the finest ingredients, inspired by global flavors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {dishes.map(({ name, desc, price, tag, color, img }) => (
              <div key={name} className="card rounded-2xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ height:"12.5rem" }}>
                  <img src={img} alt={name} loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.1) 60%, transparent 100%)" }} />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                    style={{ background:`${color}18`, color, border:`1px solid ${color}35`, fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", letterSpacing:"0.06em", textTransform:"uppercase", backdropFilter:"blur(8px)", fontWeight:700 }}>
                    <HiSparkles size={9} /> {tag}
                  </span>
                  {/* Price pill — DM Sans bold */}
                  <span className="price-pill absolute bottom-3 right-3">
                    {price}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-base mb-1.5 text-white" style={{ fontFamily:"'Playfair Display',serif" }}>{name}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}>{desc}</p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop:"1px solid rgba(255,125,6,0.08)" }}>
                    <Link to="/menu"
                      className="flex items-center gap-1 text-xs font-medium transition-colors"
                      style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}
                      onMouseOver={e=>e.currentTarget.style.color="#ff9f1c"}
                      onMouseOut={e=>e.currentTarget.style.color="#7a7060"}>
                      View in Menu <LuArrowRight size={12} />
                    </Link>
                    <div className="w-2 h-2 rounded-full" style={{ background:color, opacity:0.5 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link to="/menu" className="btn-fire">Explore Full Menu <LuArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-24 px-4 text-center relative overflow-hidden" style={{ minHeight:"26rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity:0.5 }}>
          <source src="/rooftop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background:"rgba(8,6,4,0.5)" }} />
        <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 50% 50%, rgba(255,125,6,0.07) 0%, transparent 65%)" }} />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.7) 100%)" }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <SectionLabel>Ready?</SectionLabel>
          <h2 className="section-title mb-4 sm:mb-5">Book your table<br /><span className="text-fire-shimmer">for tonight</span></h2>
          <p className="text-sm sm:text-base mb-8 sm:mb-10" style={{ color:"#7a7060", fontFamily:"'DM Sans',sans-serif" }}>
            Tables fill up fast on weekends. Secure yours now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/booking"       className="btn-fire w-full sm:w-auto"><LuCalendarCheck size={16} /> Book a Table</Link>
            <Link to="/party-booking" className="btn-outline-fire w-full sm:w-auto"><GiBalloons size={16} /> Host an Event</Link>
          </div>
        </div>
      </section>
    </div>
  );
}