"use client";

import { useState } from "react";

import ReelPlayer from "../../components/ReelPlayer";
import ItineraryCard from "../../components/ItineraryCard";
import DesktopSidebar from "../../components/DesktopSidebar";
import BottomNav from "../../components/BottomNav";

export default function ReelsPage() {
  const [activeItinerary, setActiveItinerary] = useState(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white">

      {/* MOBILE */}
      <div className="md:hidden">
        <ReelPlayer onOpenItinerary={(reel) => setActiveItinerary(reel)} />
        <BottomNav active="reels" />
        {activeItinerary && (
          <ItineraryCard
            reel={activeItinerary}
            onClose={() => setActiveItinerary(null)}
          />
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex w-full h-screen">
        
        {/* Sidebar */}
        <div className="w-[280px]">
          <DesktopSidebar active="reels" />
        </div>

        {/* Center Feed */}
        <div className="flex-1 flex justify-center items-center relative">
          <ReelPlayer onOpenItinerary={(r) => setActiveItinerary(r)} />
          
          {activeItinerary && (
            <div className="absolute right-0 top-0 h-full w-[380px] bg-white">
              <ItineraryCard
                reel={activeItinerary}
                onClose={() => setActiveItinerary(null)}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
