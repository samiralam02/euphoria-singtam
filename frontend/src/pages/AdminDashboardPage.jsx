import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllBookings, getAllPartyBookings,
  updateBookingStatus, updatePartyBookingStatus,
  deleteBooking, deletePartyBooking,
  getAllStories, createStory, deleteStory,
} from "../services/api";
import { LuImagePlus, LuTrash2, LuClock, LuCircleCheck, LuSparkles } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";

/* ── Status badge ─────────────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  return (
    <span
      className={`badge status-${status}`}
      style={{ padding: "0.2rem 0.65rem", fontSize: "0.7rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}
    >
      {status}
    </span>
  );
}

/* ── Booking row ──────────────────────────────────────────────────────────── */
function BookingRow({ booking, onStatus, onDelete, isParty }) {
  const [upd, setUpd] = useState(false);
  const [del, setDel] = useState(false);

  const doStatus = async (s) => { setUpd(true); await onStatus(booking._id, s); setUpd(false); };
  const doDelete = async () => {
    if (!window.confirm("Delete this booking?")) return;
    setDel(true); await onDelete(booking._id); setDel(false);
  };

  const date = new Date(booking.date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <tr
      className="border-b transition-colors"
      style={{ borderColor: "rgba(255,125,6,0.07)" }}
      onMouseOver={e => e.currentTarget.style.background = "rgba(255,125,6,0.02)"}
      onMouseOut={e  => e.currentTarget.style.background = "transparent"}
    >
      <td className="px-5 py-4">
        <div className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>{booking.name}</div>
        <div className="text-xs" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{booking.email}</div>
        <div className="text-xs" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{booking.phone}</div>
      </td>
      <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans',sans-serif" }}>
        {isParty ? booking.eventType : `${booking.numberOfGuests} guests`}
        {isParty && <div className="text-xs mt-0.5" style={{ color: "#7a7060" }}>{booking.numberOfGuests} guests</div>}
      </td>
      <td className="px-5 py-4 text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans',sans-serif" }}>
        <div>{date}</div>
        <div className="text-xs" style={{ color: "#7a7060" }}>{booking.time}</div>
      </td>
      {isParty && (
        <td className="px-5 py-4 text-sm" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
          {booking.decorationRequired ? "✓ Yes" : "— No"}
        </td>
      )}
      <td className="px-5 py-4"><StatusBadge status={booking.status} /></td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          {booking.status !== "confirmed" && (
            <button onClick={() => doStatus("confirmed")} disabled={upd}
              className="text-xs px-3 py-1 rounded font-semibold transition-all disabled:opacity-50"
              style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.25)", fontFamily: "'DM Sans',sans-serif" }}>
              Confirm
            </button>
          )}
          {booking.status !== "cancelled" && (
            <button onClick={() => doStatus("cancelled")} disabled={upd}
              className="text-xs px-3 py-1 rounded font-semibold transition-all disabled:opacity-50"
              style={{ background: "rgba(248,113,113,0.08)", color: "#f87171", border: "1px solid rgba(248,113,113,0.25)", fontFamily: "'DM Sans',sans-serif" }}>
              Cancel
            </button>
          )}
          <button onClick={doDelete} disabled={del}
            className="text-xs px-3 py-1 rounded transition-all disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.03)", color: "#4a4540", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "'DM Sans',sans-serif" }}>
            {del ? "…" : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const [tab,           setTab]           = useState("bookings");
  const [bookings,      setBookings]      = useState([]);
  const [partyBookings, setPartyBookings] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [filter,        setFilter]        = useState("all");

  // Story state
  const [stories,        setStories]        = useState([]);
  const [storyCaption,   setStoryCaption]   = useState("");
  const [storyDuration,  setStoryDuration]  = useState("24");
  const [storyPreview,   setStoryPreview]   = useState(null);
  const [storyMediaData, setStoryMediaData] = useState(null);
  const [storyMediaType, setStoryMediaType] = useState("image");
  const [storyUploading, setStoryUploading] = useState(false);
  const [storyMsg,       setStoryMsg]       = useState(null);
  const fileInputRef = useRef(null);

  const navigate   = useNavigate();
  const adminInfo  = JSON.parse(localStorage.getItem("euphoriaAdminInfo") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("euphoriaAdminToken");
    localStorage.removeItem("euphoriaAdminInfo");
    navigate("/admin/login");
  };

  /* ── Fetch bookings ── */
  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [bR, pR] = await Promise.all([getAllBookings(), getAllPartyBookings()]);
      setBookings(bR.data.bookings);
      setPartyBookings(pR.data.partyBookings);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
      else setError("Failed to load data.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  /* ── Fetch stories ── */
  const fetchStories = useCallback(async () => {
    try {
      const res = await getAllStories();
      setStories(res.data.stories || []);
    } catch {}
  }, []);

  useEffect(() => { fetchStories(); }, [fetchStories]);

  /* ── Booking handlers ── */
  const handleStatus = async (id, status) => {
    try {
      if (tab === "bookings") { await updateBookingStatus(id, status); setBookings(p => p.map(b => b._id === id ? { ...b, status } : b)); }
      else { await updatePartyBookingStatus(id, status); setPartyBookings(p => p.map(b => b._id === id ? { ...b, status } : b)); }
    } catch { alert("Failed to update."); }
  };

  const handleDelete = async (id) => {
    try {
      if (tab === "bookings") { await deleteBooking(id); setBookings(p => p.filter(b => b._id !== id)); }
      else { await deletePartyBooking(id); setPartyBookings(p => p.filter(b => b._id !== id)); }
    } catch { alert("Failed to delete."); }
  };

  /* ── Story handlers ── */
  const ALLOWED_IMAGES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  const ALLOWED_VIDEOS = ["video/mp4", "video/webm", "video/quicktime"];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = ALLOWED_IMAGES.includes(file.type);
    const isVideo = ALLOWED_VIDEOS.includes(file.type);

    if (!isImage && !isVideo) {
      setStoryMsg({ type: "error", text: "Only JPEG, PNG, WebP, GIF images or MP4/WebM/MOV videos are allowed." });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const maxBytes = isVideo ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setStoryMsg({ type: "error", text: `File too large. Max ${isVideo ? "20MB for videos" : "5MB for images"}.` });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setStoryMsg(null);
    setStoryMediaType(isVideo ? "video" : "image");
    const reader = new FileReader();
    reader.onload = (ev) => { setStoryMediaData(ev.target.result); setStoryPreview(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleStorySubmit = async () => {
    if (!storyMediaData) return;
    setStoryUploading(true); setStoryMsg(null);
    try {
      await createStory({ mediaData: storyMediaData, mediaType: storyMediaType, caption: storyCaption, duration: storyDuration });
      setStoryMsg({ type: "success", text: "Story published! The logo ring is now live on the website." });
      setStoryPreview(null); setStoryMediaData(null); setStoryCaption(""); setStoryDuration("24");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchStories();
    } catch (err) {
      setStoryMsg({ type: "error", text: err.response?.data?.message || "Upload failed. Try a smaller file." });
    } finally { setStoryUploading(false); }
  };

  const handleStoryDelete = async (id) => {
    if (!window.confirm("Delete this story?")) return;
    try { await deleteStory(id); fetchStories(); }
    catch { alert("Failed to delete story."); }
  };

  /* ── Derived ── */
  const activeStoryCount = stories.filter(s => new Date() < new Date(s.expiresAt)).length;

  const current  = tab === "bookings" ? bookings : partyBookings;
  const filtered = filter === "all" ? current : current.filter(b => b.status === filter);
  const counts   = {
    all:       current.length,
    pending:   current.filter(b => b.status === "pending").length,
    confirmed: current.filter(b => b.status === "confirmed").length,
    cancelled: current.filter(b => b.status === "cancelled").length,
  };

  const stats = [
    { label: "Table Bookings", value: bookings.length,      sub: `${bookings.filter(b => b.status==="pending").length} pending` },
    { label: "Party Bookings", value: partyBookings.length, sub: `${partyBookings.filter(b => b.status==="pending").length} pending` },
    { label: "Confirmed",      value: [...bookings,...partyBookings].filter(b => b.status==="confirmed").length, sub: "Total confirmed" },
    { label: "Total Guests",   value: [...bookings,...partyBookings].reduce((s,b) => s+(b.numberOfGuests||0), 0), sub: "Across all bookings" },
  ];

  /* ── Tabs config ── */
  const tabs = [
    { id: "bookings", label: "Table Bookings" },
    { id: "party",    label: "Party Bookings" },
    { id: "story",    label: "Stories",       special: true },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* ── Header ── */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between"
        style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,125,6,0.18)" }}>
        <div className="flex items-center gap-3">
          <img src="/eulogo.png" alt="Euphoria Singtam" style={{ height: "2rem", width: "auto" }} />
          <div>
            <div className="font-bold text-base text-fire-grad" style={{ fontFamily: "'Playfair Display',serif" }}>
              Euphoria Singtam
            </div>
            <div className="text-xs" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {adminInfo.username || "Admin"}
            </div>
            <div className="text-xs" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{adminInfo.email}</div>
          </div>
          <button onClick={handleLogout} className="btn-ghost-fire text-xs">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={s.label} className="card rounded-xl p-5"
              style={{ borderColor: i === 0 || i === 1 ? "rgba(255,125,6,0.2)" : undefined }}>
              <div className="font-black text-3xl text-fire-grad mb-1"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>{s.value}</div>
              <div className="text-sm font-semibold text-white" style={{ fontFamily: "'DM Sans',sans-serif" }}>{s.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {tabs.map(t => {
            const isActive = tab === t.id;
            if (t.special) {
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setFilter("all"); }}
                  className="relative flex items-center gap-2 px-5 py-2 text-sm font-semibold tracking-wide rounded transition-all duration-200 overflow-hidden"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    background: isActive
                      ? "linear-gradient(135deg,#ff7d06,#faf98b)"
                      : "rgba(255,125,6,0.06)",
                    color: isActive ? "#0f0f0f" : "#ff9f1c",
                    border: isActive ? "none" : "1px solid rgba(255,125,6,0.35)",
                    boxShadow: isActive ? "0 4px 18px rgba(255,125,6,0.35)" : "none",
                  }}
                >
                  <HiSparkles size={13} />
                  {t.label}
                  {/* Live dot if story is active */}
                  {activeStoryCount > 0 && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full text-white font-black"
                      style={{ background: "#f87171", fontSize: "0.55rem", lineHeight: 1 }}>
                      {activeStoryCount}
                    </span>
                  )}
                </button>
              );
            }
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setFilter("all"); }}
                className="px-5 py-2 text-sm font-semibold tracking-wide rounded transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  background: isActive ? "linear-gradient(135deg,#ff7d06,#faf98b)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#0f0f0f" : "rgba(255,255,255,0.4)",
                  border: isActive ? "none" : "1px solid rgba(255,125,6,0.18)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* STORY TAB                                                       */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {tab === "story" && (
          <div>
            {/* Hero banner */}
            <div className="relative rounded-2xl overflow-hidden mb-8 px-6 py-8 sm:py-10 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,125,6,0.12) 0%, rgba(250,249,139,0.06) 50%, rgba(255,125,6,0.08) 100%)",
                border: "1px solid rgba(255,125,6,0.25)",
              }}>
              {/* Glow orb */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.15) 0%, transparent 65%)" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)" }}>
                    <HiSparkles size={15} style={{ color: "#0f0f0f" }} />
                  </div>
                  <span className="text-xs font-bold tracking-[0.15em] uppercase"
                    style={{ color: "#ff9f1c", fontFamily: "'DM Sans',sans-serif" }}>
                    Story Feature
                  </span>
                </div>
                <h2 className="font-bold text-2xl sm:text-3xl text-white mb-2"
                  style={{ fontFamily: "'Playfair Display',serif" }}>
                  Share the <span className="text-fire-grad italic">Euphoria Moment</span>
                </h2>
                <p className="text-sm max-w-md mx-auto"
                  style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
                  Every great night deserves to be seen. Post a photo or video — your logo glows with a fire ring and visitors can tap to watch the story live.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
                  {[
                    { icon: "🔥", text: "Logo gets a fire ring" },
                    { icon: "👆", text: "Tap to view full screen" },
                    { icon: "⏱️", text: "Auto-expires after set time" },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-1.5 text-xs"
                      style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}>
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* ── Upload card ── */}
              <div className="card rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4"
                  style={{ background: "rgba(255,125,6,0.05)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)", boxShadow: "0 4px 14px rgba(255,125,6,0.35)" }}>
                    <LuImagePlus size={18} style={{ color: "#0f0f0f" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Playfair Display',serif" }}>
                      Post a New Story
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
                      Photo or short video · appears instantly
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {storyMsg && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl"
                      style={{
                        background: storyMsg.type === "success" ? "rgba(74,222,128,0.07)" : "rgba(248,113,113,0.07)",
                        border: `1px solid ${storyMsg.type === "success" ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}`,
                      }}>
                      {storyMsg.type === "success"
                        ? <LuCircleCheck size={15} style={{ color: "#4ade80", flexShrink: 0, marginTop: "1px" }} />
                        : <span style={{ color: "#f87171", fontSize: "0.9rem" }}>⚠</span>}
                      <p className="text-sm" style={{ color: storyMsg.type === "success" ? "#4ade80" : "#f87171", fontFamily: "'DM Sans',sans-serif" }}>
                        {storyMsg.text}
                      </p>
                    </div>
                  )}

                  {/* File picker */}
                  <div>
                    <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                      Choose Photo or Video *
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                      onChange={handleFileSelect}
                      className="input-fire text-sm"
                      style={{ cursor: "pointer", paddingTop: "0.65rem" }}
                    />
                    <p className="text-xs mt-1.5" style={{ color: "#3a3530", fontFamily: "'DM Sans',sans-serif" }}>
                      Max 5 MB for images · 20 MB for videos
                    </p>
                  </div>

                  {/* Preview */}
                  {storyPreview && (
                    <div className="relative rounded-xl overflow-hidden"
                      style={{ height: "200px", background: "#050505", border: "1px solid rgba(255,125,6,0.2)" }}>
                      {storyMediaType === "video"
                        ? <video src={storyPreview} className="w-full h-full object-contain" muted />
                        : <img src={storyPreview} alt="Story preview" className="w-full h-full object-contain" />}
                      <button
                        onClick={() => { setStoryPreview(null); setStoryMediaData(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(0,0,0,0.75)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                        ✕
                      </button>
                      <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ background: "rgba(255,125,6,0.8)", color: "#0f0f0f", fontFamily: "'DM Sans',sans-serif" }}>
                        Preview
                      </span>
                    </div>
                  )}

                  {/* Caption */}
                  <div>
                    <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                      Caption <span style={{ textTransform: "none", letterSpacing: "normal", fontWeight: 400, color: "rgba(255,255,255,0.2)" }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={storyCaption}
                      onChange={e => setStoryCaption(e.target.value)}
                      placeholder="Tonight at Euphoria — live music, great vibes…"
                      className="input-fire"
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 flex items-center gap-1.5"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                      <LuClock size={11} /> Story expires after
                    </label>
                    <select value={storyDuration} onChange={e => setStoryDuration(e.target.value)} className="input-fire">
                      <option value="6">6 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                    </select>
                  </div>

                  <button
                    onClick={handleStorySubmit}
                    disabled={!storyMediaData || storyUploading}
                    className="btn-fire w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {storyUploading
                      ? <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Publishing…
                        </span>
                      : <span className="flex items-center gap-2">
                          <LuImagePlus size={15} /> Publish Story
                        </span>}
                  </button>
                </div>
              </div>

              {/* ── Published stories list ── */}
              <div className="card rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4"
                  style={{ borderBottom: "1px solid rgba(255,125,6,0.1)" }}>
                  <div>
                    <h3 className="font-bold text-base text-white" style={{ fontFamily: "'Playfair Display',serif" }}>
                      Published Stories
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
                      {activeStoryCount > 0
                        ? `${activeStoryCount} currently live on website`
                        : "No active story right now"}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(255,125,6,0.1)", color: "#ff9f1c", border: "1px solid rgba(255,125,6,0.25)", fontFamily: "'DM Sans',sans-serif" }}>
                    {stories.length} total
                  </span>
                </div>

                <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: "32rem" }}>
                  {stories.length === 0 && (
                    <div className="text-center py-14">
                      <div className="text-3xl mb-3">📸</div>
                      <p className="text-sm" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
                        No stories posted yet
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#3a3530", fontFamily: "'DM Sans',sans-serif" }}>
                        Post your first story to light up the logo!
                      </p>
                    </div>
                  )}

                  {stories.map(s => {
                    const isLive  = new Date() < new Date(s.expiresAt);
                    const expires = new Date(s.expiresAt);
                    const timeStr = expires.toLocaleString("en-IN", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    });
                    return (
                      <div
                        key={s._id}
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                        style={{
                          background: isLive ? "rgba(255,125,6,0.04)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${isLive ? "rgba(255,125,6,0.22)" : "rgba(255,255,255,0.05)"}`,
                        }}
                      >
                        {/* Thumb */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
                          style={{ border: `1px solid ${isLive ? "rgba(255,125,6,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                          {s.mediaType === "video"
                            ? <video src={s.mediaData} className="w-full h-full object-cover" muted />
                            : <img src={s.mediaData} alt="story thumbnail" className="w-full h-full object-cover" />}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isLive ? "status-confirmed" : "status-cancelled"}`}
                              style={{ fontSize: "0.58rem" }}>
                              {isLive ? "🔴 LIVE" : "EXPIRED"}
                            </span>
                            <span className="text-xs capitalize"
                              style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>{s.mediaType}</span>
                          </div>
                          {s.caption && (
                            <p className="text-xs truncate mb-0.5"
                              style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
                              "{s.caption}"
                            </p>
                          )}
                          <p className="text-xs"
                            style={{ color: "#3a3530", fontFamily: "'DM Sans',sans-serif" }}>
                            {isLive ? "⏱ Expires" : "Expired"}: {timeStr}
                          </p>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleStoryDelete(s._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
                          style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.18)", color: "#f87171" }}
                          onMouseOver={e => e.currentTarget.style.background = "rgba(248,113,113,0.18)"}
                          onMouseOut={e  => e.currentTarget.style.background = "rgba(248,113,113,0.07)"}
                        >
                          <LuTrash2 size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* BOOKINGS TAB (table + party)                                   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {tab !== "story" && (
          <>
            {/* Filters */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {["all", "pending", "confirmed", "cancelled"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs font-semibold tracking-wide px-4 py-1.5 rounded-full transition-all"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    background: filter === f ? "rgba(255,125,6,0.12)" : "rgba(255,255,255,0.03)",
                    color: filter === f ? "#ff9f1c" : "#4a4540",
                    border: filter === f ? "1px solid rgba(255,125,6,0.4)" : "1px solid rgba(255,125,6,0.1)",
                  }}>
                  {f} ({counts[f]})
                </button>
              ))}
              <button onClick={fetchData} className="ml-auto btn-ghost-fire text-xs">↻ Refresh</button>
            </div>

            {/* Table */}
            {loading ? (
              <div className="card rounded-2xl p-20 text-center">
                <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
                  style={{ borderColor: "rgba(255,125,6,0.2)", borderTopColor: "#ff7d06" }} />
                <p className="text-sm" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>Loading bookings…</p>
              </div>
            ) : error ? (
              <div className="card rounded-2xl p-12 text-center">
                <p style={{ color: "#f87171", fontFamily: "'DM Sans',sans-serif" }}>{error}</p>
                <button onClick={fetchData} className="btn-outline-fire mt-4 text-sm">Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="card rounded-2xl p-16 text-center">
                <p className="text-lg" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
                  No {filter === "all" ? "" : filter} bookings found.
                </p>
              </div>
            ) : (
              <div className="card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr style={{ background: "rgba(255,125,6,0.04)", borderBottom: "1px solid rgba(255,125,6,0.12)" }}>
                        {["Guest", tab === "party" ? "Event" : "Guests", "Date & Time", ...(tab === "party" ? ["Decor"] : []), "Status", "Actions"].map(h => (
                          <th key={h} className="px-5 py-4 text-left text-xs font-bold tracking-widest uppercase"
                            style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(b => (
                        <BookingRow
                          key={b._id}
                          booking={b}
                          onStatus={handleStatus}
                          onDelete={handleDelete}
                          isParty={tab === "party"}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}