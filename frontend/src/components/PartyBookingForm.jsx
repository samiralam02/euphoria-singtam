import React, { useState, useRef, useEffect } from "react";
import { createPartyBooking } from "../services/api";
import { LuChevronDown, LuCircleCheck } from "react-icons/lu";
import { GiBalloons, GiCrystalBall } from "react-icons/gi";
import { MdBusinessCenter } from "react-icons/md";

const init = { name:"", phone:"", email:"", eventType:"", numberOfGuests:"", date:"", time:"", decorationRequired:"No", specialRequest:"", _hp:"" };
const slots = ["12:00 PM","01:00 PM","02:00 PM","06:00 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM","09:00 PM","10:00 PM"];

const eventTypes = [
  { value: "Birthday",        label: "Birthday Party",   Icon: GiBalloons,       color: "#ff9f1c" },
  { value: "Private Party",   label: "Private Party",    Icon: GiCrystalBall,    color: "#faf98b" },
  { value: "Corporate Event", label: "Corporate Event",  Icon: MdBusinessCenter, color: "#ffb129" },
];

function EventTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = eventTypes.find(e => e.value === value);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="input-fire flex items-center justify-between gap-3 text-left"
        style={{ cursor: "pointer" }}
      >
        {selected ? (
          <span className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: `${selected.color}15` }}>
              <selected.Icon size={13} style={{ color: selected.color }} />
            </span>
            <span style={{ color: "rgba(255,245,225,0.85)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem" }}>
              {selected.label}
            </span>
          </span>
        ) : (
          <span style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem" }}>
            Select event type…
          </span>
        )}
        <LuChevronDown
          size={14}
          style={{
            color: "#4a4540",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden mt-1"
          style={{
            background: "#131110",
            border: "1px solid rgba(255,125,6,0.22)",
            boxShadow: "0 20px 48px rgba(0,0,0,0.8)",
          }}
        >
          {eventTypes.map(e => (
            <button
              key={e.value}
              type="button"
              onClick={() => { onChange(e.value); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{
                background: value === e.value ? `${e.color}08` : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
              onMouseOver={ev => { if (value !== e.value) ev.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              onMouseOut={ev  => { if (value !== e.value) ev.currentTarget.style.background = "transparent"; }}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${e.color}12` }}
              >
                <e.Icon size={14} style={{ color: e.color }} />
              </span>
              <span
                className="text-sm flex-1"
                style={{ color: value === e.value ? e.color : "rgba(255,245,225,0.65)", fontFamily: "'DM Sans',sans-serif" }}
              >
                {e.label}
              </span>
              {value === e.value && (
                <LuCircleCheck size={13} style={{ color: e.color, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const Lbl = ({ children }) => (
  <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block"
    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
    {children}
  </label>
);

export default function PartyBookingForm() {
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError]     = useState(null);

  const onChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (error) setError(null); };

  const onSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccess(null);
    try { const r = await createPartyBooking(form); setSuccess(r.data.message); setForm(init); }
    catch (err) { setError(err.response?.data?.message || "Something went wrong."); }
    finally { setLoading(false); }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="_hp" value={form._hp} onChange={onChange} tabIndex="-1" autoComplete="off"
        style={{ position:"absolute", left:"-9999px", width:"1px", height:"1px", opacity:0, pointerEvents:"none" }} aria-hidden="true" />

      {success && (
        <div className="flex gap-3 p-4 rounded-lg" style={{ background:"rgba(74,222,128,0.07)", border:"1px solid rgba(74,222,128,0.25)" }}>
          <span style={{ color:"#4ade80" }}>✓</span>
          <div>
            <p className="text-sm font-bold" style={{ color:"#4ade80", fontFamily:"'DM Sans',sans-serif" }}>Check Your Email!</p>
            <p className="text-sm mt-0.5" style={{ color:"rgba(74,222,128,0.7)", fontFamily:"'DM Sans',sans-serif" }}>{success}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg" style={{ background:"rgba(248,113,113,0.07)", border:"1px solid rgba(248,113,113,0.25)" }}>
          <p className="text-sm" style={{ color:"#f87171", fontFamily:"'DM Sans',sans-serif" }}>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Lbl>Full Name *</Lbl><input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your name" required className="input-fire" /></div>
        <div><Lbl>Phone *</Lbl><input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" required className="input-fire" /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Lbl>Email *</Lbl><input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" required className="input-fire" /></div>
        <div>
          <Lbl>Event Type *</Lbl>
          {/* Hidden input so form validation still works */}
          <input type="text" name="eventType" value={form.eventType} required readOnly
            style={{ position:"absolute", opacity:0, pointerEvents:"none", width:"1px", height:"1px" }} />
          <EventTypeDropdown
            value={form.eventType}
            onChange={(val) => setForm(p => ({ ...p, eventType: val }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Lbl>No. of Guests *</Lbl><input type="number" name="numberOfGuests" value={form.numberOfGuests} onChange={onChange} placeholder="30" min="1" max="200" required className="input-fire" /></div>
        <div><Lbl>Date *</Lbl><input type="date" name="date" value={form.date} onChange={onChange} min={today} required className="input-fire" style={{ colorScheme:"dark" }} /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Lbl>Start Time *</Lbl>
          <select name="time" value={form.time} onChange={onChange} required className="input-fire">
            <option value="">Select time</option>
            {slots.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <Lbl>Decoration Required?</Lbl>
          <div className="flex gap-5 mt-3">
            {["Yes", "No"].map(opt => (
              <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                <div className="w-5 h-5 rounded flex items-center justify-center transition-all"
                  style={{ border:`2px solid ${form.decorationRequired===opt?"#ff7d06":"rgba(255,125,6,0.25)"}`, background:form.decorationRequired===opt?"rgba(255,125,6,0.12)":"transparent" }}>
                  <input type="radio" name="decorationRequired" value={opt} checked={form.decorationRequired===opt} onChange={onChange} className="sr-only" />
                  {form.decorationRequired===opt && <div className="w-2.5 h-2.5 rounded-sm" style={{ background:"#ff7d06" }} />}
                </div>
                <span className="text-sm font-medium" style={{ color:"rgba(255,255,255,0.75)", fontFamily:"'DM Sans',sans-serif" }}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Lbl>Special Requests <span style={{ textTransform:"none", letterSpacing:"normal", fontWeight:400, color:"rgba(255,255,255,0.25)" }}>(optional)</span></Lbl>
        <textarea name="specialRequest" value={form.specialRequest} onChange={onChange} placeholder="Theme, arrangements, dietary needs…" rows={3} className="input-fire resize-none" />
      </div>

      <button type="submit" disabled={loading} className="btn-fire w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontSize:"0.9rem" }}>
        {loading
          ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Sending…</span>
          : "Request Event Booking"}
      </button>
    </form>
  );
}