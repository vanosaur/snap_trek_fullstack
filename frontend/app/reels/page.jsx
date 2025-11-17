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
    <div className="bg-black min-h-screen text-white relative overflow-hidden">

      {/* ===== MOBILE VERSION ===== */}
      <div className="md:hidden w-full relative">
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
      <div className="hidden md:flex w-full h-screen">

        {/* LEFT SIDEBAR */}
        <div className="w-[300px]">
          <DesktopSidebar active="reels" />
        </div>

        {/* CENTER FEED */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="w-full max-w-[630px] mx-auto relative">
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
        <div className="hidden xl:block w-[200px]" />
      </div>
    </div>
  );
}
