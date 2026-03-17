import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); if (error) setError(null); };

  const onSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await adminLogin(form);
      const { token, username, email } = res.data.admin;
      localStorage.setItem("euphoriaAdminToken", token);
      localStorage.setItem("euphoriaAdminInfo", JSON.stringify({ username, email }));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: "#080808" }}>
      {/* Warm ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full" style={{ width: "500px", height: "500px", top: "-120px", left: "-200px", background: "radial-gradient(circle, rgba(255,125,6,0.08) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: "400px", height: "400px", bottom: "-100px", right: "-150px", background: "radial-gradient(circle, rgba(255,125,6,0.06) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite 3s" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,125,6,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,125,6,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-display font-bold text-4xl text-fire-grad tracking-wide mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
            Euphoria Singtam
          </div>
          <div className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans',sans-serif" }}>
            Admin Portal
          </div>
        </div>

        <div className="card rounded-2xl p-8">
          <h1 className="font-display font-bold text-2xl text-white text-center mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Welcome Back
          </h1>
          <p className="text-sm text-center mb-8" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            Sign in to manage your bookings
          </p>

          {error && (
            <div className="p-4 rounded-lg mb-5" style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.25)" }}>
              <p className="text-sm" style={{ color: "#f87171", fontFamily: "'DM Sans',sans-serif" }}>{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                Email
              </label>
              <input type="email" name="email" value={form.email} onChange={onChange} placeholder="admin@euphoriasingtam.com" required className="input-fire" />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>
                Password
              </label>
              <input type="password" name="password" value={form.password} onChange={onChange} placeholder="••••••••" required className="input-fire" />
            </div>
            <button type="submit" disabled={loading} className="btn-fire w-full py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontSize: "0.9rem" }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Signing In…
                </span>
              ) : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-xs transition-colors hover:text-fire-light" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>← Back to Website</a>
        </p>
      </div>
    </div>
  );
}