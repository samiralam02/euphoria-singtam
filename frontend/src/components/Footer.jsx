import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks  = [{l:"Home",t:"/"},{l:"About",t:"/about"},{l:"Menu",t:"/menu"},{l:"Gallery",t:"/gallery"},{l:"Testimonials",t:"/testimonials"},{l:"Contact",t:"/contact"}];
  const bookLinks = [{l:"Reserve a Table",t:"/booking"},{l:"Birthday Party",t:"/party-booking"},{l:"Private Party",t:"/party-booking"},{l:"Corporate Event",t:"/party-booking"}];
  const socials   = [{l:"IG",h:"https://instagram.com"},{l:"FB",h:"https://facebook.com"},{l:"YT",h:"https://youtube.com"}];

  return (
    <footer style={{ background: "#0c0c0c", borderTop: "1px solid rgba(250,249,139,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src="/eulogo.png"
                alt="Euphoria Singtam logo bar restaurant Singtam Sikkim"
                loading="lazy"
                decoding="async"
                style={{ height: "3rem", width: "auto" }}
              />
            </Link>
            <div className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              Bar & Restaurant · Sikkim
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a7060", fontFamily: "'DM Sans', sans-serif" }}>
              Singtam's premium lounge — crafted cocktails, global plates, private event spaces, and unforgettable atmosphere.
            </p>
            <div className="flex gap-2">
              {socials.map(s => (
                <a key={s.l} href={s.h} target="_blank" rel="noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-xs font-bold rounded transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border:"1px solid rgba(250,249,139,0.2)", color:"#ff9f1c", fontFamily:"'DM Sans',sans-serif" }}
                  onMouseOver={e=>{e.currentTarget.style.background="rgba(255,125,6,0.1)"; e.currentTarget.style.borderColor="rgba(250,249,139,0.45)";}}
                  onMouseOut={e=>{e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(250,249,139,0.2)";}}
                >{s.l}</a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color:"#ff9f1c", fontFamily:"'DM Sans',sans-serif" }}>Navigate</h4>
            <ul className="space-y-2.5">
              {navLinks.map(x => (
                <li key={x.t}>
                  <Link to={x.t} className="text-sm hover:text-white transition-colors" style={{color:"#7a7060",fontFamily:"'DM Sans',sans-serif"}}>{x.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bookings */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color:"#ff9f1c", fontFamily:"'DM Sans',sans-serif" }}>Bookings</h4>
            <ul className="space-y-2.5">
              {bookLinks.map(x => (
                <li key={x.l}>
                  <Link to={x.t} className="text-sm hover:text-white transition-colors" style={{color:"#7a7060",fontFamily:"'DM Sans',sans-serif"}}>{x.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color:"#ff9f1c", fontFamily:"'DM Sans',sans-serif" }}>Find Us</h4>
            <address className="not-italic space-y-3 text-sm" style={{color:"#7a7060",fontFamily:"'DM Sans',sans-serif"}}>
              <p>1st floor of Apollo Diagnostic Centre , Near Dhamala Hardware , Singtam<br/>East Sikkim – 737134, India</p>
              <div>
                <div className="text-xs uppercase tracking-widest mb-1" style={{color:"#2e2a26"}}>Hours</div>
                <p>Mon–Thu: 11am – 11pm</p>
                <p>Fri–Sun: 12pm – 1am</p>
              </div>
              <div>
                <a href="tel:+919876543210" className="block hover:text-white transition-colors">+91 8101497215</a>
                <a href="mailto:hello@euphoriasingtam.com" className="block hover:text-white transition-colors text-xs mt-0.5">euphoriasingtam@gmail.com</a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{borderTop:"1px solid rgba(255,125,6,0.1)"}}>
          <p className="text-xs" style={{color:"#2e2a26",fontFamily:"'DM Sans',sans-serif"}}>© {year} Euphoria Singtam. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{color:"#2e2a26",fontFamily:"'DM Sans',sans-serif"}}>Owned by</span>
            <span className="text-xs font-bold text-fire-grad" style={{fontFamily:"'DM Sans',sans-serif"}}>Anand Lamichaney · Mr.@one</span>
          </div>
        </div>
      </div>
    </footer>
  );
}