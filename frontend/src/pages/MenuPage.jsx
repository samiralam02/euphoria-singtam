import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuArrowRight, LuLeaf, LuFlame } from "react-icons/lu";
import { HiSparkles } from "react-icons/hi2";
import { GiWineGlass, GiForkKnifeSpoon } from "react-icons/gi";
import { TbBottle } from "react-icons/tb";
import { PiCakeDuotone } from "react-icons/pi";

// ── Unsplash images per dish ──────────────────────────────────────────────────
const menu = {
  Starters: [
    { name:"Bruschetta al Pomodoro", desc:"Toasted sourdough, Roma tomatoes, basil oil, aged balsamic",   price:"₹380",   veg:true,  img:"https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=75&auto=format&fit=crop" },
    { name:"Crispy Calamari",        desc:"Battered squid rings, garlic aioli, fresh lemon zest",         price:"₹520",   veg:false, img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=75&auto=format&fit=crop" },
    { name:"Stuffed Mushrooms",      desc:"Wild mushrooms, herb cream cheese, toasted pine nuts",         price:"₹420",   veg:true,  img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=75&auto=format&fit=crop" },
    { name:"Chicken Liver Pâté",     desc:"Smooth pâté, pickled onions, artisan sourdough toast",         price:"₹480",   veg:false, img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=75&auto=format&fit=crop" },
  ],
  Signatures: [
    { name:"Beef Wellington",        desc:"Tender fillet, mushroom duxelles, prosciutto, golden puff pastry", price:"₹1,850", veg:false, sig:true, img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=75&auto=format&fit=crop" },
    { name:"Lobster Risotto",        desc:"Ceylon lobster, saffron Arborio, Parmesan cream, micro herbs",    price:"₹2,200", veg:false, sig:true, img:"https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=75&auto=format&fit=crop" },
    { name:"Veg Combo",              desc:"Seasonal vegetables, aromatic dal, fragrant rice, artisan bread", price:"₹650",   veg:true,  img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=75&auto=format&fit=crop" },
    { name:"Non Veg Combo",          desc:"Grilled proteins, braised curry, biryani rice, condiments",       price:"₹950",   veg:false, img:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=75&auto=format&fit=crop" },
    { name:"Pan Seared Salmon",      desc:"Norwegian salmon, lemon butter, wilted spinach, capers",          price:"₹1,450", veg:false, img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=75&auto=format&fit=crop" },
    { name:"Wild Mushroom Pasta",    desc:"Pappardelle, mixed wild mushrooms, truffle oil, Parmesan",        price:"₹780",   veg:true,  img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=75&auto=format&fit=crop" },
  ],
  Desserts: [
    { name:"Sticky Toffee Pudding",  desc:"Warm date sponge cake, butterscotch sauce, vanilla cream",   price:"₹580", veg:true, sig:true, img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=75&auto=format&fit=crop" },
    { name:"Crème Brûlée",           desc:"Classic vanilla custard, caramelized sugar crust",           price:"₹480", veg:true, img:"https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=75&auto=format&fit=crop" },
    { name:"Chocolate Lava Cake",    desc:"Dark chocolate fondant, vanilla gelato, raspberry coulis",   price:"₹550", veg:true, img:"https://images.unsplash.com/photo-1617305855058-336d24456869?w=600&q=75&auto=format&fit=crop" },
    { name:"Tiramisu",               desc:"Espresso-soaked ladyfingers, silky mascarpone cream",        price:"₹520", veg:true, img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=75&auto=format&fit=crop" },
  ],
  Cocktails: [
    { name:"Euphoria Sling",     desc:"Gin, hibiscus, elderflower, fresh lime, sparkling water", price:"₹550", veg:true, img:"https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=75&auto=format&fit=crop" },
    { name:"Sikkim Mule",        desc:"Bourbon, cardamom syrup, ginger beer, fresh lime",        price:"₹480", veg:true, img:"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=75&auto=format&fit=crop" },
    { name:"Golden Hour",        desc:"Aged rum, passion fruit, vanilla, turmeric, smoked salt", price:"₹580", veg:true, img:"https://images.unsplash.com/photo-1543253687-c931c8e01820?w=600&q=75&auto=format&fit=crop" },
    { name:"Himalayan Negroni",  desc:"Gin, Himalayan bitter, sweet vermouth, orange zest",      price:"₹620", veg:true, img:"https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=600&q=75&auto=format&fit=crop" },
    { name:"Rooftop Sunrise",    desc:"Tequila, fresh orange, grenadine, lime, chili salt rim",  price:"₹520", veg:true, img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=75&auto=format&fit=crop" },
    { name:"Virgin Euphoria",    desc:"Mango, ginger, mint, lime, sparkling water — alcohol free",price:"₹280", veg:true, img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=75&auto=format&fit=crop" },
  ],
  "Bar & Spirits": [
    { name:"House Red Wine",    desc:"Curated Old & New World reds by the glass",         price:"₹380", veg:true, img:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=75&auto=format&fit=crop" },
    { name:"House White Wine",  desc:"Crisp Sauvignon Blanc & Chardonnay by the glass",   price:"₹360", veg:true, img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75&auto=format&fit=crop" },
    { name:"Single Malt Scotch",desc:"12-year aged single malt Scotch whisky",            price:"₹750", veg:true, img:"https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=75&auto=format&fit=crop" },
    { name:"Premium Bourbon",   desc:"Kentucky straight bourbon, neat or on the rocks",   price:"₹680", veg:true, img:"https://images.unsplash.com/photo-1520218519063-2e9b8c7e4b23?w=600&q=75&auto=format&fit=crop" },
    { name:"Craft Beer",        desc:"Local & imported craft beers on draught",           price:"₹320", veg:true, img:"https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=75&auto=format&fit=crop" },
  ],
};

const cats = Object.keys(menu);

const tabIcons = {
  Starters:      GiForkKnifeSpoon,
  Signatures:    LuFlame,
  Desserts:      PiCakeDuotone,
  Cocktails:     GiWineGlass,
  "Bar & Spirits": TbBottle,
};

function DishCard({ item }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-400 hover:-translate-y-1"
      style={{
        background: "#111",
        border: item.sig ? "1px solid rgba(255,125,6,0.35)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: item.sig ? "0 0 30px rgba(255,125,6,0.06)" : "none",
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        {imgOk ? (
          <img loading="lazy" decoding="async"
            src={item.img}
            alt={`${item.name} - Euphoria Singtam menu Singtam Sikkim`}
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "#1a1a1a" }}>
            <GiForkKnifeSpoon size={40} style={{ color: "#3a3530" }} />
          </div>
        )}

        {/* Gradient over image */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.3) 50%, rgba(10,8,5,0.1) 100%)" }}
        />

        {/* Veg / Non-veg dot — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", border: `1px solid ${item.veg ? "rgba(74,222,128,0.35)" : "rgba(248,113,113,0.35)"}` }}>
          <LuLeaf size={11} style={{ color: item.veg ? "#4ade80" : "#f87171" }} />
          <span className="text-xs font-semibold" style={{ color: item.veg ? "#4ade80" : "#f87171", fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.04em" }}>
            {item.veg ? "VEG" : "NON-VEG"}
          </span>
        </div>

        {/* Signature badge — top right */}
        {item.sig && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,125,6,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,125,6,0.4)" }}>
            <HiSparkles size={10} style={{ color: "#ff9f1c" }} />
            <span className="text-xs font-bold" style={{ color: "#ff9f1c", fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Signature
            </span>
          </div>
        )}

        {/* Price pill — bottom right, overlapping image/content */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full"
          style={{ background: "linear-gradient(135deg,#ff7d06,#faf98b)", boxShadow: "0 4px 14px rgba(255,125,6,0.4)" }}>
          <span className="font-display font-bold text-sm" style={{ color: "#0f0f0f", fontFamily: "'DM Sans',sans-serif", fontWeight:800 }}>{item.price}</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        <h3
          className="font-display font-semibold text-base mb-1.5 text-white group-hover:text-fire-grad transition-colors duration-300"
          style={{ fontFamily: "'Playfair Display',serif" }}
        >
          {item.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>{item.desc}</p>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [active, setActive] = useState("Signatures");
  const TabIcon = tabIcons[active];

  return (
    <div className="min-h-screen page-enter" style={{ background: "#080808" }}>

      {/* ── Header ── */}
      <div className="pt-32 pb-14 px-4 text-center relative overflow-hidden" style={{ background: "#0d0d0d" }}>
        <img loading="lazy" decoding="async"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=65&auto=format&fit=crop"
          alt="Euphoria Singtam menu food spread continental cuisine Sikkim"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.7) 60%, #0d0d0d 100%)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,125,6,0.08) 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <span className="tag-fire mb-5 inline-flex gap-1.5 items-center">
            <GiForkKnifeSpoon size={12} /> Culinary Arts
          </span>
          <h1 className="section-title mb-3">
            Our <span className="text-fire-grad italic">Menu</span>
          </h1>
          <p className="text-base max-w-sm mx-auto" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            Global flavors, local roots
          </p>
        </div>
      </div>

      {/* ── Sticky Category Tabs ── */}
      <div
        className="sticky top-16 z-30 px-4 py-4"
        style={{ background: "rgba(9,8,6,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,125,6,0.1)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {cats.map(c => {
            const Icon = tabIcons[c];
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-300 px-4 py-2 rounded-full"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  background: isActive ? "linear-gradient(135deg,#ff7d06,#faf98b)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#0f0f0f" : "rgba(255,255,255,0.4)",
                  border: isActive ? "none" : "1px solid rgba(255,125,6,0.18)",
                  boxShadow: isActive ? "0 4px 16px rgba(250,249,139,0.2)" : "none",
                }}
              >
                <Icon size={13} />
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Items Grid ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,125,6,0.1)", border: "1px solid rgba(255,125,6,0.2)" }}>
            <TabIcon size={16} style={{ color: "#ff9f1c" }} />
          </div>
          <h2 className="font-display font-semibold text-2xl text-white" style={{ fontFamily: "'Playfair Display',serif" }}>{active}</h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,125,6,0.25), transparent)" }} />
          <span className="text-xs font-semibold" style={{ color: "#4a4540", fontFamily: "'DM Sans',sans-serif" }}>
            {menu[active].length} items
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menu[active].map(item => <DishCard key={item.name} item={item} />)}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-10 pt-6" style={{ borderTop: "1px solid rgba(255,125,6,0.07)" }}>
          <div className="flex items-center gap-2">
            <LuLeaf size={13} style={{ color: "#4ade80" }} />
            <span className="text-xs" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>Vegetarian</span>
          </div>
          <div className="flex items-center gap-2">
            <LuLeaf size={13} style={{ color: "#f87171" }} />
            <span className="text-xs" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>Non-Vegetarian</span>
          </div>
          <div className="flex items-center gap-2">
            <HiSparkles size={13} style={{ color: "#ff9f1c" }} />
            <span className="text-xs" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>Chef's Signature</span>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-16 px-4 text-center relative overflow-hidden" style={{ background: "#0d0d0d" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,100,0,0.07) 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <p className="font-display text-xl text-white mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Ready to taste it in person?
          </p>
          <p className="text-sm mb-8" style={{ color: "#7a7060", fontFamily: "'DM Sans',sans-serif" }}>
            Reserve your table and let us take care of the rest
          </p>
          <Link to="/booking" className="btn-fire" style={{ padding: "0.875rem 2.5rem" }}>
            Reserve a Table <LuArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}