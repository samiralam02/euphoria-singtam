import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import StoryViewer from "./StoryViewer";
import { getActiveStory } from "../services/api";

const navLinks = [
  { label: "Home",          to: "/" },
  { label: "About",         to: "/about" },
  { label: "Gallery",       to: "/gallery" },
  { label: "Menu",          to: "/menu" },
  { label: "Table Booking", to: "/booking" },
  { label: "Party Booking", to: "/party-booking" },
  { label: "Contact",       to: "/contact" },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [open,          setOpen]          = useState(false);
  const [activeStories, setActiveStories] = useState(() => {
    try {
      const cached = localStorage.getItem('euphoria_active_stories');
      if (!cached) return [];
      const parsed = JSON.parse(cached);
      // Only use cache if at least one story is still not expired
      return parsed.filter(s => new Date() < new Date(s.expiresAt));
    } catch { return []; }
  });
  const [viewedIds,      setViewedIds]      = useState(() => JSON.parse(localStorage.getItem('euphoria_viewed_stories') || '[]'));
  const [storyOpen,     setStoryOpen]     = useState(false);
  const location = useLocation();

  // Scroll listener
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location]);

  // Fetch active stories — show cached ring instantly, refresh every 30s
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await getActiveStory();
        const stories = res.data.stories || [];
        setActiveStories(stories);
        // Cache for instant ring on next page load
        localStorage.setItem('euphoria_active_stories', JSON.stringify(stories));
      } catch {
        // On error keep showing cached stories so ring doesn't flicker
      }
    };
    fetchStory();
    const interval = setInterval(fetchStory, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const allViewed = activeStories.length > 0 && activeStories.every(s => viewedIds.includes(s._id));

  const handleLogoClick = (e) => {
    if (activeStories.length > 0) {
      e.preventDefault();
      setStoryOpen(true);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background:     scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:   scrolled ? "1px solid rgba(255,125,6,0.18)" : "none",
          padding:        scrolled ? "0.5rem 0" : "1rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* ── Logo + Brand + Story Ring ── */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2.5"
            aria-label="Euphoria Singtam — Home"
          >
            {/* Logo with optional story ring */}
            <div className="relative flex-shrink-0">
              {activeStories.length > 0 && (
                <>
                  {/* Animated gradient ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      inset: "-3px",
                      background: allViewed
                        ? "linear-gradient(135deg, #6b7280, #9ca3af)"
                        : "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #f09433)",
                      backgroundSize: "300% 300%",
                      animation: allViewed ? "none" : "storyRing 2.5s linear infinite",
                      borderRadius: "50%",
                      zIndex: 0,
                    }}
                  />
                  {/* White gap ring */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      inset: "-1px",
                      background: scrolled ? "rgba(8,8,8,0.96)" : "rgba(8,8,8,0.5)",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  />
                </>
              )}
              <img
                src="/eulogo.png"
                alt="Euphoria Singtam logo - premium bar restaurant Singtam Sikkim"
                loading="eager"
                decoding="async"
                className="relative"
                style={{
                  height: scrolled ? "clamp(2rem, 6vw, 2.8rem)" : "clamp(2.4rem, 8vw, 3.4rem)",
                  width: "auto",
                  transition: "height 0.3s ease",
                  borderRadius: "50%",
                  zIndex: 2,
                  cursor: "pointer",
                  filter: activeStories.length > 0
                    ? allViewed
                      ? "drop-shadow(0 0 6px rgba(156,163,175,0.5))"
                      : "drop-shadow(0 0 10px rgba(220,39,67,0.5))"
                    : "drop-shadow(0 2px 8px rgba(255,125,6,0.2))",
                }}
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col leading-tight">
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: scrolled ? "1rem" : "1.1rem",
                  transition: "font-size 0.3s ease",
                  background: "linear-gradient(135deg, #faf98b, #ff7d06)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.01em",
                }}
              >
                Euphoria
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Singtam
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden xl:flex items-center gap-6">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-200 relative group ${
                      isActive ? "text-fire-grad" : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                        style={{
                          width: isActive ? "100%" : "0%",
                          background: "linear-gradient(to right, #faf98b, #ff7d06)",
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Book a Table CTA ── */}
          <div className="hidden xl:block">
            <Link
              to="/booking"
              className="btn-fire"
              style={{ padding: "0.45rem 1.2rem", fontSize: "0.8rem" }}
            >
              Book a Table
            </Link>
          </div>

          {/* ── Hamburger ── */}
          <button
            onClick={() => setOpen(o => !o)}
            className="xl:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #faf98b, #ff7d06)",
                  transform: open
                    ? i === 0 ? "rotate(45deg) translate(3px,4px)"
                      : i === 1 ? "scaleX(0)"
                      : "rotate(-45deg) translate(3px,-4px)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className="xl:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "36rem" : "0",
            opacity:   open ? 1 : 0,
            background: "rgba(8,8,8,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: open ? "1px solid rgba(255,125,6,0.18)" : "none",
          }}
        >
          <ul className="flex flex-col gap-1 px-6 py-5">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className={({ isActive }) =>
                    `block py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "text-fire-grad" : "text-white/55 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-3">
              <Link to="/booking" className="btn-fire w-full text-center text-sm">
                Book a Table
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Story ring keyframe — injected inline */}
      <style>{`
        @keyframes storyRing {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* ── Story Viewer ── */}
      {storyOpen && activeStories.length > 0 && (
        <StoryViewer
          stories={activeStories}
          onClose={() => {
            setStoryOpen(false);
            const ids = activeStories.map(s => s._id);
            const merged = [...new Set([...viewedIds, ...ids])];
            setViewedIds(merged);
            localStorage.setItem('euphoria_viewed_stories', JSON.stringify(merged));
          }}
        />
      )}
    </>
  );
}