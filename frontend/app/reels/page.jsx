"use client";

import { useState } from "react";

// COMPONENTS
import ReelPlayer from "../../components/ReelPlayer";
import ItineraryPanel from "../../components/ItineraryPanel";
import DesktopSidebar from "../../components/DesktopSidebar";
import BottomNav from "../../components/BottomNav";

export default function ReelsPage() {
  const [activeItinerary, setActiveItinerary] = useState(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white relative overflow-hidden font-sans selection:bg-teal-500/30">
      
      {/* BACKGROUND AMBIANCE */}
      <div className="fixed top-[-20%] left-[-20%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ===== MOBILE VERSION ===== */}
      <div className="md:hidden w-full relative z-10">
        <ReelPlayer
          onOpenItinerary={(reel) => {
            console.log("📌 Open itinerary for:", reel.place);
            setActiveItinerary(reel);
          }}
        />

        {/* MOBILE BOTTOM NAV */}
        <BottomNav active="reels" />

        {/* ITINERARY PANEL */}
        <ItineraryPanel
          open={!!activeItinerary}
          onClose={() => setActiveItinerary(null)}
          data={activeItinerary}
        />
      </div>

      {/* ===== DESKTOP VERSION ===== */}
      <div className="hidden md:flex w-full h-screen relative z-10">

        {/* LEFT SIDEBAR */}
        <div className="w-[280px] xl:w-[320px] flex-shrink-0">
          <DesktopSidebar active="reels" />
        </div>

        {/* CENTER FEED */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="w-full max-w-[600px] mx-auto relative">
            <ReelPlayer
              onOpenItinerary={(reel) => {
                console.log("PC 📌 Open itinerary for:", reel.place);
                setActiveItinerary(reel);
              }}
            />
          </div>

          {/* ITINERARY PANEL (Desktop overlay) */}
          <ItineraryPanel
            open={!!activeItinerary}
            onClose={() => setActiveItinerary(null)}
            data={activeItinerary}
          />
        </div>

        {/* RIGHT EMPTY COLUMN */}
        <div className="hidden xl:flex w-[320px] flex-shrink-0" />
      </div>
    </div>
  );
}
