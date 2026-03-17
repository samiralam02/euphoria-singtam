import React, { useState } from "react";
import { createBooking } from "../services/api";

const init = { name:"", phone:"", email:"", numberOfGuests:"", date:"", time:"", specialRequest:"", _hp:"" };
const slots = ["12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM","08:30 PM","09:00 PM","09:30 PM","10:00 PM"];

const Lbl = ({ children }) => (
  <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block" style={{color:"rgba(255,255,255,0.4)",fontFamily:"'DM Sans',sans-serif"}}>
    {children}
  </label>
);

export default function BookingForm() {
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onChange = (e) => { setForm(p=>({...p,[e.target.name]:e.target.value})); if(error) setError(null); };

  const onSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccess(null);
    try { const r = await createBooking(form); setSuccess(r.data.message); setForm(init); }
    catch(err) { setError(err.response?.data?.message || "Something went wrong."); }
    finally { setLoading(false); }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, bots fill this */}
      <input type="text" name="_hp" value={form._hp} onChange={onChange} tabIndex="-1" autoComplete="off"
        style={{position:"absolute",left:"-9999px",width:"1px",height:"1px",opacity:0,pointerEvents:"none"}} aria-hidden="true" />

      {success && (
        <div className="flex gap-3 p-4 rounded-lg" style={{background:"rgba(74,222,128,0.07)",border:"1px solid rgba(74,222,128,0.25)"}}>
          <span style={{color:"#4ade80",fontSize:"1.1rem"}}>✓</span>
          <div>
            <p className="text-sm font-bold" style={{color:"#4ade80",fontFamily:"'DM Sans',sans-serif"}}>Check Your Email!</p>
            <p className="text-sm mt-0.5" style={{color:"rgba(74,222,128,0.7)",fontFamily:"'DM Sans',sans-serif"}}>{success}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg" style={{background:"rgba(248,113,113,0.07)",border:"1px solid rgba(248,113,113,0.25)"}}>
          <p className="text-sm" style={{color:"#f87171",fontFamily:"'DM Sans',sans-serif"}}>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Lbl>Full Name *</Lbl><input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your name" required className="input-fire" /></div>
        <div><Lbl>Phone *</Lbl><input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" required className="input-fire" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Lbl>Email *</Lbl><input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" required className="input-fire" /></div>
        <div><Lbl>Guests *</Lbl><input type="number" name="numberOfGuests" value={form.numberOfGuests} onChange={onChange} placeholder="2" min="1" max="50" required className="input-fire" /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Lbl>Date *</Lbl><input type="date" name="date" value={form.date} onChange={onChange} min={today} required className="input-fire" style={{colorScheme:"dark"}} /></div>
        <div>
          <Lbl>Time *</Lbl>
          <select name="time" value={form.time} onChange={onChange} required className="input-fire">
            <option value="">Select time</option>
            {slots.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <Lbl>Special Requests <span style={{textTransform:"none",letterSpacing:"normal",fontWeight:400,color:"rgba(255,255,255,0.25)"}}>(optional)</span></Lbl>
        <textarea name="specialRequest" value={form.specialRequest} onChange={onChange} placeholder="Dietary needs, seating preferences, special occasions…" rows={3} className="input-fire resize-none" />
      </div>
      <button type="submit" disabled={loading} className="btn-fire w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed" style={{fontSize:"0.9rem"}}>
        {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Confirming…</span> : "Confirm Reservation"}
      </button>
    </form>
  );
}