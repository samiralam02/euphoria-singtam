import React, { useEffect, useRef, useState, useCallback } from "react";
import { LuX, LuVolume2, LuVolumeX, LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function StoryViewer({ stories, onClose }) {
  const [index,    setIndex]    = useState(0);
  const [progress, setProgress] = useState(0);
  const [muted,    setMuted]    = useState(true);  // start muted — browsers require it
  const intervalRef = useRef(null);
  const videoRef    = useRef(null);

  const story    = stories[index];
  const total    = stories.length;
  const DURATION = story?.mediaType === "video" ? 15000 : 5000;

  // ── Go to next story or close ──────────────────────────────────────────────
  const goNext = useCallback(() => {
    clearInterval(intervalRef.current);
    if (index < total - 1) {
      setIndex(i => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [index, total, onClose]);

  // ── Go to previous story ───────────────────────────────────────────────────
  const goPrev = useCallback(() => {
    clearInterval(intervalRef.current);
    if (index > 0) {
      setIndex(i => i - 1);
      setProgress(0);
    }
  }, [index]);

  // ── Progress bar ticker ────────────────────────────────────────────────────
  useEffect(() => {
    if (!story) return;
    setProgress(0);
    // For video, wait for it to be ready before starting timer
    if (story.mediaType === "video") return; // video uses timeupdate instead
    const step = 100 / (DURATION / 50);
    intervalRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(intervalRef.current); goNext(); return 100; }
        return p + step;
      });
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, [index, story?.mediaType]);

  // ── Video progress sync ────────────────────────────────────────────────────
  const onVideoTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    if (v.currentTime >= v.duration) goNext();
  };

  // ── Apply mute to video when it mounts / muted state changes ──────────────
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, index]);

  // ── Close on Escape, arrow keys ───────────────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  goNext();
      if (e.key === "ArrowLeft")   goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev, onClose]);

  if (!story) return null;

  const timeLeft = () => {
    const ms = new Date(story.expiresAt) - new Date();
    const h  = Math.floor(ms / 3600000);
    const m  = Math.floor((ms % 3600000) / 60000);
    if (h > 0) return `${h}h left`;
    if (m > 0) return `${m}m left`;
    return "Expiring soon";
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* ── Prev arrow (desktop) ── */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); goPrev(); }}
          className="hidden md:flex absolute left-6 w-10 h-10 rounded-full items-center justify-center z-20 transition-all"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
          onMouseOut={e  => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
        >
          <LuChevronLeft size={20} style={{ color: "#fff" }} />
        </button>
      )}

      {/* ── Next arrow (desktop) ── */}
      {index < total - 1 && (
        <button
          onClick={e => { e.stopPropagation(); goNext(); }}
          className="hidden md:flex absolute right-6 w-10 h-10 rounded-full items-center justify-center z-20 transition-all"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
          onMouseOut={e  => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
        >
          <LuChevronRight size={20} style={{ color: "#fff" }} />
        </button>
      )}

      {/* ── Story card ── */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(420px, 95vw)",
          height: "min(750px, 92vh)",
          borderRadius: "1.25rem",
          background: "#050505",
          border: "1px solid rgba(255,125,6,0.2)",
          boxShadow: "0 0 80px rgba(255,125,6,0.15)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Progress bars (one per story) ── */}
        <div className="absolute top-0 left-0 right-0 z-20 px-3 pt-3 flex gap-1">
          {stories.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.25)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                  background: "linear-gradient(to right, #faf98b, #ff7d06)",
                  transition: i === index ? "none" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Header ── */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-6 pb-4"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
              style={{ border: "2px solid #ff9f1c" }}>
              <img src="/eulogo.png" alt="Euphoria Singtam" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Euphoria Singtam
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}>
                {timeLeft()} {total > 1 && `· ${index + 1} / ${total}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound toggle — only show for videos */}
            {story.mediaType === "video" && (
              <button
                onClick={() => setMuted(m => !m)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.12)" }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
                onMouseOut={e  => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
                title={muted ? "Unmute" : "Mute"}
              >
                {muted
                  ? <LuVolumeX size={15} style={{ color: "#fff" }} />
                  : <LuVolume2  size={15} style={{ color: "#ff9f1c" }} />}
              </button>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.12)" }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
              onMouseOut={e  => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >
              <LuX size={16} style={{ color: "#fff" }} />
            </button>
          </div>
        </div>

        {/* ── Tap zones (mobile: left = prev, right = next) ── */}
        <div className="absolute inset-0 z-10 flex md:hidden">
          <div className="flex-1 h-full cursor-pointer" onClick={goPrev} />
          <div className="flex-1 h-full cursor-pointer" onClick={goNext} />
        </div>

        {/* ── Media ── */}
        <div className="flex-1 flex items-center justify-center" style={{ background: "#050505" }}>
          {story.mediaType === "video" ? (
            <video
              ref={videoRef}
              key={story._id}
              src={story.mediaData}
              autoPlay
              muted={muted}
              playsInline
              onTimeUpdate={onVideoTimeUpdate}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              key={story._id}
              src={story.mediaData}
              alt="Euphoria Singtam story"
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* ── Caption ── */}
        {story.caption && (
          <div
            className="absolute bottom-0 left-0 right-0 z-20 px-5 py-5"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)" }}
          >
            <p className="text-sm text-white leading-relaxed"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {story.caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}