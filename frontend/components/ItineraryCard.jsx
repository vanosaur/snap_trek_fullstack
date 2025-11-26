"use client";

import React from "react";
import {
  X,
  Map,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Users,
  BedDouble,
} from "lucide-react";

/* =========================================
   CONSTANTS FOR CTA / NAV SIZING
   ========================================= */
const CTA_HEIGHT = 72; // px - height of the "Book This Trip" button area
const BOTTOM_NAV_HEIGHT = 64; // px - estimated BottomNav height on mobile

export default function ItineraryCard({ reel, onClose, isMobile }) {
  // Normalize data structure.
  // Checks for 'itinerary' (new format) OR 'itineraryDays' (old format)
  const days = reel?.itinerary || reel?.itineraryDays || [];

  // padding bottom for scrollable area so content doesn't hide under CTA + BottomNav
  const scrollPaddingBottom = isMobile
    ? CTA_HEIGHT + BOTTOM_NAV_HEIGHT + 28 // 28 extra spacing
    : CTA_HEIGHT + 24;

  const stopScroll = (e) => e.stopPropagation();

  return (
    <div
      className="w-full h-full bg-white text-gray-900 flex flex-col relative overflow-hidden rounded-none md:rounded-2xl"
      // Prevent clicks/scrolls inside the card from affecting the parent reel
      onWheel={stopScroll}
      onTouchMove={stopScroll}
      onClick={stopScroll}
    >
      {/* --- HEADER --- */}
      <div className="p-4 md:p-5 border-b border-gray-100 flex justify-between items-start shrink-0 bg-white z-10 shadow-sm">
        <div className="flex-1 pr-2">
          <h3 className="font-bold text-lg leading-tight text-gray-900 mb-2 line-clamp-1">
            {reel.title}
          </h3>

          {/* Stats Row */}
          <div className="flex items-center gap-2 md:gap-3 text-xs text-gray-600 font-medium flex-wrap">
            <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
              <Star size={12} fill="currentColor" /> {reel.rating}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
              <Clock size={12} /> {reel.duration || `${days.length} Days`}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full">
              <Users size={12} /> {reel.seats} Seats
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer shrink-0"
        >
          <X size={20} />
        </button>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-5 overscroll-contain scrollbar-hide"
        style={{ paddingBottom: `${scrollPaddingBottom}px` }}
      >
        {/* 1. Highlights Section */}
        {reel.highlights && (
          <div className="mb-6">
            <h4 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {reel.highlights.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 md:px-3 bg-indigo-50 text-indigo-600 text-[10px] md:text-xs font-bold rounded-lg border border-indigo-100 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 2. Map Placeholder */}
        <div className="w-full h-28 md:h-32 bg-indigo-50 rounded-xl mb-6 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center shrink-0">
          <Map className="text-indigo-400 mb-2" size={24} />
          <span className="text-indigo-600 font-bold text-xs">
            Interactive Map View
          </span>
        </div>

        {/* 3. Itinerary Timeline */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
            Daily Itinerary
          </h4>
          <div className="space-y-6 pl-2">
            {days.length === 0 ? (
              <div className="text-center text-gray-400 text-sm">
                Itinerary details coming soon.
              </div>
            ) : (
              days.map((dayData, index) => {
                // If 'title' exists use it, otherwise use 'day' (e.g., "Day 1"), otherwise generic "Day X"
                const title =
                  dayData.title || dayData.day || `Day ${index + 1}`;

                // If 'desc' is missing, join the first 2 activities or use generic text
                const desc =
                  dayData.desc ||
                  (dayData.activities
                    ? `Experience ${dayData.activities
                        .slice(0, 2)
                        .join(" & ")}`
                    : "Explore the city");

                return (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-gray-100 last:border-0"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />

                    <div className="mb-1">
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-0.5">
                        Day {index + 1}
                      </span>
                      <h4 className="font-bold text-gray-800 text-sm">
                        {title}
                      </h4>
                    </div>

                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                      {desc}
                    </p>

                    {/* Activities List */}
                    <div className="space-y-2">
                      {(dayData.activities || []).map((act, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex gap-2 items-center"
                        >
                          <div className="w-6 h-6 bg-gray-200 rounded shrink-0 flex items-center justify-center text-gray-400">
                            <MapPin size={12} />
                          </div>
                          <span className="font-semibold text-xs text-gray-700">
                            {act}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 4. Stay / Accommodation Section */}
        {reel.stay && (
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <BedDouble size={16} className="text-indigo-500" /> Where you'll
              stay
            </h4>
            <div className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                <img
                  src={reel.stay.image}
                  alt="hotel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div
                  className="w-full h-full bg-gray-200 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <BedDouble size={16} className="text-gray-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">
                  {reel.stay.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {reel.stay.desc}
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs font-bold text-yellow-600">
                  <Star size={10} fill="currentColor" /> {reel.stay.rating}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER CTA --- */}
      <div
        className="absolute left-0 w-full p-4 bg-white border-t border-gray-100 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
        style={{
          // place CTA above BottomNav on mobile, at bottom on desktop.
          bottom: isMobile
            ? `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom, 0px))`
            : `env(safe-area-inset-bottom, 0px)`,
        }}
      >
        <div className="flex justify-between items-end mb-3 px-1">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Total Price
            </span>
            <span className="text-2xl font-black text-gray-900 leading-none">
              ${reel.price}
            </span>
            <span className="text-xs text-gray-400 font-medium"> / person</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
              Free Cancellation
            </span>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white font-bold py-3 md:py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 cursor-pointer active:scale-[0.98]">
          Book This Trip <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}