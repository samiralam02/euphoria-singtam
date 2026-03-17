import React from "react";
import { Link } from "react-router-dom";

const testimonials = [
  { name: "Rohan Sharma",  role: "Food Blogger, Gangtok",  rating: 5, text: "Euphoria has completely redefined dining in Sikkim. The Beef Wellington was impeccable — perfectly pink, wrapped in the most golden pastry I've had outside Europe. The bar rivals any major city.", date: "Dec 2024", avatar: "RS", highlight: true },
  { name: "Priya Tamang",  role: "Regular Guest",           rating: 5, text: "Celebrated our anniversary here and the team went above and beyond. Rooftop was decorated beautifully, cocktails were creative, staff made us feel like royalty.", date: "Nov 2024", avatar: "PT" },
  { name: "Arjun Pradhan", role: "Corporate Client",        rating: 5, text: "Hosted our year-end dinner at Euphoria. Event planning was seamless, food exceptional, every team member was professional. Truly world-class venue.", date: "Dec 2024", avatar: "AP" },
  { name: "Meena Chettri", role: "Birthday Celebrant",      rating: 5, text: "My 30th at Euphoria was magical. The party room was stunning, custom cocktail menu was incredible. Mr. Anand himself came to wish me! A night I'll never forget.", date: "Oct 2024", avatar: "MC", highlight: true },
  { name: "Bikash Rai",    role: "Travel Influencer",       rating: 5, text: "If you're visiting Sikkim and want a premium night out, Euphoria is the only address you need. Live music, cocktails, and rooftop view come together beautifully.", date: "Sep 2024", avatar: "BR" },
  { name: "Sunita Gurung", role: "Food Enthusiast",         rating: 5, text: "The Lobster Risotto was transcendent. Sticky Toffee Pudding for dessert was sinfully good. Euphoria is my favorite restaurant in all of Sikkim.", date: "Nov 2024", avatar: "SG" },
];

const stats = [
  { value: "500+", label: "Happy Guests" },
  { value: "4.9★", label: "Average Rating" },
  { value: "200+", label: "Reviews" },
  { value: "100%", label: "Would Return" },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>
      {/* Header */}
      <div className="pt-32 pb-14 px-4 text-center relative overflow-hidden" style={{ background: "#0d0d0d" }}>
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
          <span className="tag-fire mb-5 inline-flex">Guest Stories</span>
          <h1 className="section-title mb-4">What Our <span className="text-fire-shimmer italic">Guests Say</span></h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            Real experiences from real guests
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-10 px-4" style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div className="hidden md:block w-px" style={{ background: "rgba(255,125,6,0.18)" }} />}
              <div className="text-center">
                <div className="font-display font-bold text-4xl text-fire-grad mb-1" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight:900 }}>{s.value}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{s.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Masonry */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="break-inside-avoid card rounded-2xl p-7 mb-5 hover:-translate-y-0.5 transition-all duration-300"
              style={{ borderColor: t.highlight ? "rgba(250,249,139,0.2)" : undefined }}>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-sm text-fire-grad">★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,125,6,0.1)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                  style={{ background: "rgba(255,125,6,0.1)", color: "#ff9f1c", border: "1px solid rgba(255,125,6,0.25)", fontFamily: "'Playfair Display',serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{t.role} · {t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ background: "#0d0d0d" }}>
        <h2 className="font-display font-bold text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
          Create Your Story
        </h2>
        <p className="text-base mb-8" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
          Join hundreds of guests who've experienced the Euphoria magic.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/booking" className="btn-fire" style={{ padding: "0.875rem 2.25rem" }}>Book a Table</Link>
          <Link to="/party-booking" className="btn-outline-fire" style={{ padding: "0.875rem 2.25rem" }}>Host an Event</Link>
        </div>
      </section>
    </div>
  );
}