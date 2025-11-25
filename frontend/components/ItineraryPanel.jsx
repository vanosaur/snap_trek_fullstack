"use client";

import { 
  X, 
  ChevronLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function ItineraryPanel({ open, onClose, data }) {
  // Safety check: if no data, don't render
  if (!data) return null;

  return (
    <>
      {/* ---- BACKDROP (Darkens the background) ---- */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ---- MAIN PANEL (The Slide-up Sheet) ---- */}
      <div
        className={`fixed bottom-0 right-0 md:right-0 w-full md:w-[600px] h-[96vh] md:h-screen bg-black/90 backdrop-blur-2xl text-white z-[9999] overflow-hidden flex flex-col shadow-2xl md:border-l border-white/10 transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) ${
          open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"
        }`}
      >
        
        {/* ==== SCROLLABLE CONTENT AREA ==== */}
        <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
          
          {/* 1. HERO SECTION */}
          <div className="relative h-[350px] w-full group">
            <img
              src={data.image}
              className="w-full h-full object-cover"
              alt={data.place}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Top Nav Bar */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
              <button
                onClick={onClose}
                className="w-10 h-10 glass-panel rounded-full flex items-center justify-center border border-white/10 transition-all hover:scale-110"
              >
                <ChevronLeft className="text-white" size={24} />
              </button>

              <div className="flex gap-3">
                <ActionButton icon={<Heart size={20} />} />
                <ActionButton icon={<Share2 size={20} />} />
              </div>
            </div>

            {/* Title Block (Bottom of Image) */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
              <h1 className="text-4xl font-bold leading-tight mb-2 text-shadow-lg">
                {data.place}
              </h1>
              <div className="flex items-center gap-2 text-gray-300 font-medium">
                <MapPin size={16} className="text-teal-400" />
                {data.location || "Unknown Location"}
              </div>
            </div>
          </div>

          {/* 2. CONTENT CONTAINER */}
          <div className="px-6 py-6 space-y-8">

            {/* STATS GRID (The 3 black boxes) */}
            <div className="grid grid-cols-3 gap-3">
              <StatBox icon={<Calendar size={18} />} label="Duration" value={data.duration} />
              <StatBox icon={<Users size={18} />} label="Seats" value={`${data.seats || 4} Left`} />
              <StatBox icon={<Star size={18} />} label="Rating" value={data.rating || "5.0"} />
            </div>

            {/* PRICE BANNER (Gradient) */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 p-6 shadow-lg shadow-teal-900/20 flex justify-between items-center">
              <div>
                <p className="text-teal-100 text-xs font-bold uppercase tracking-wider mb-1">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">${data.price}</span>
                  <span className="text-sm text-teal-100 opacity-80">/USD</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm animate-pulse">
                <Sparkles className="text-white" size={24} />
              </div>
            </div>

            {/* HIGHLIGHTS */}
            <div>
              <h3 className="text-xl font-bold mb-4">Trip Highlights</h3>
              <div className="glass-panel border border-white/5 rounded-2xl p-5 space-y-3">
                {data.highlights && data.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="min-w-[20px] mt-0.5">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-teal-400" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DAY BY DAY ITINERARY (The Timeline) */}
            <div>
               <h3 className="text-xl font-bold mb-4">Day by Day Itinerary</h3>
               <div className="space-y-4 relative">
                  {/* Connecting Line (Optional visual) */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/10 z-0" />

                  {data.itinerary && data.itinerary.map((day, i) => (
                    <div key={i} className="glass-panel border border-white/5 p-5 rounded-2xl flex gap-4 relative overflow-hidden group hover:border-white/10 transition-colors z-10">
                       
                       {/* Number Circle */}
                       <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                             {i + 1}
                          </div>
                       </div>

                       <div className="flex-1">
                          <h4 className="font-bold text-lg text-white mb-1">{day.title}</h4>
                          <p className="text-gray-400 text-sm mb-3 leading-relaxed">{day.desc}</p>
                          
                          {/* Activities */}
                          <ul className="space-y-1.5">
                             {day.activities?.map((act, j) => (
                                <li key={j} className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                                   {act}
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* STAY OPTIONS */}
            {data.stay && (
              <div>
                 <h3 className="text-xl font-bold mb-4">Stay Options</h3>
                 <div className="group glass-panel border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
                    <div className="h-48 w-full overflow-hidden relative">
                       <img src={data.stay.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Hotel" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                       <div className="absolute bottom-3 left-4">
                          <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium border border-white/10">
                            ⭐ {data.stay.rating}
                          </span>
                       </div>
                    </div>
                    <div className="p-5 flex justify-between items-end">
                       <div>
                          <h4 className="font-bold text-lg mb-1">{data.stay.name}</h4>
                          <p className="text-gray-400 text-xs max-w-[200px]">{data.stay.desc}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-bold text-white">${data.stay.price}</p>
                          <p className="text-xs text-gray-500">/night</p>
                       </div>
                    </div>
                 </div>
              </div>
            )}

          </div>
        </div>

        {/* ==== FIXED BOTTOM FOOTER (Buttons) ==== */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 flex gap-3 z-50">
           <button className="flex-1 py-4 rounded-xl border border-white/20 font-bold text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide">
              Save for Later
           </button>
           <button className="flex-[2] py-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 font-bold text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all text-sm uppercase tracking-wide transform active:scale-[0.98]">
              Book This Trip
           </button>
        </div>

      </div>
    </>
  );
}

/* ---- SUB COMPONENTS ---- */
function ActionButton({ icon }) {
  return (
    <button className="w-10 h-10 glass-panel hover:bg-white/20 rounded-full flex items-center justify-center border border-white/10 transition-all hover:scale-110 text-white">
      {icon}
    </button>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <div className="glass-panel border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors">
      <div className="text-teal-400">{icon}</div>
      <div className="text-center">
         <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-0.5">{label}</p>
         <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}