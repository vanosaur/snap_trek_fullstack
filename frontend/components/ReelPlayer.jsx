"use client";

import { useEffect, useRef, useState } from "react";
import reelsData from "../data/reelsData";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Volume2,
  Play,
  MapPin,
  ChevronUp,
  ChevronDown
} from "lucide-react";

export default function ReelPlayer({
  onActiveChange = () => {},
  onOpenItinerary = () => {},
}) {
  const containerRef = useRef(null);
  const reelRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // ---- SWIPE STATE ----
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  /* --------------------------
      KEYBOARD & MOUSE WHEEL SUPPORT
  --------------------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") scrollToReel(activeIndex + 1);
      if (e.key === "ArrowUp") scrollToReel(activeIndex - 1);
      if (e.key === " ") setIsPlaying((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const scrollToReel = (index) => {
    if (index < 0 || index >= reelsData.length) return;
    reelRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  /* --------------------------
      INTERSECTION OBSERVER
  --------------------------- */
  useEffect(() => {
    reelRefs.current = reelRefs.current.slice(0, reelsData.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
            onActiveChange(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.6 }
    );
    reelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [onActiveChange]);

  /* --------------------------
        TOUCH HANDLERS
  --------------------------- */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = touchStartX.current - currentX;
    const diffY = touchStartY.current - currentY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      isSwiping.current = true;
      if (diffX > 0) setSwipeOffset(-diffX);
    }
  };

  const handleTouchEnd = (e, reel) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (isSwiping.current && diffX > 80) onOpenItinerary(reel);
    setSwipeOffset(0);
    isSwiping.current = false;
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black flex overflow-hidden">
      
      {/* === DESKTOP BACKGROUND BLUR === */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-30 blur-3xl pointer-events-none">
         {reelsData[activeIndex] && (
             <video 
                src={reelsData[activeIndex].video} 
                className="w-full h-full object-cover"
                autoPlay muted loop 
             />
         )}
      </div>

      {/* === MAIN SCROLL CONTAINER === */}
      <div
        ref={containerRef}
        className="w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory bg-transparent scroll-smooth z-10 no-scrollbar"
      >
        {reelsData.map((reel, idx) => (
          <div
            key={reel.id}
            data-index={idx}
            ref={(el) => (reelRefs.current[idx] = el)}
            className="snap-start w-full h-[100dvh] flex justify-center items-center relative"
          >
            {/* ======= RESPONSIVE FRAME ======= */}
            <div
              className="relative w-full h-full md:w-[400px] md:h-[calc(100vh-40px)] md:max-h-[850px] md:rounded-2xl bg-zinc-900 overflow-hidden shadow-2xl ring-1 ring-white/10"
              style={{
                transform: `translateX(${swipeOffset}px)`,
                touchAction: "pan-y",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, reel)}
            >
              {/* ======= VIDEO ======= */}
              <video
                src={reel.video}
                autoPlay
                loop
                muted={!isPlaying}
                playsInline
                className="absolute w-full h-full object-cover pointer-events-none"
              />

              {/* ===== SWIPE HINT ===== */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 transition-opacity duration-200"
                style={{ opacity: Math.abs(swipeOffset) > 40 ? 1 : 0 }}
              >
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    ITINERARY <span className="text-pink-500">→</span>
                  </span>
                </div>
              </div>

              {/* ===== PLAY/PAUSE TOGGLE ===== */}
              <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
              />
              
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 bg-black/10">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="fill-white text-white ml-1" size={40} />
                  </div>
                </div>
              )}

              {/* ===== DESKTOP ONLY: CLICKABLE ITINERARY BUTTON ===== */}
              <button 
                onClick={(e) => {
                    e.stopPropagation(); // Prevents video from pausing
                    onOpenItinerary(reel);
                }}
                className="hidden md:flex absolute bottom-38 ml-4 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-1 rounded-full font-bold text-xs items-center gap-1 transition-all hover:scale-105"
              >
                <span>View Itinerary</span>
                <MapPin size={14} />
              </button>

              {/* ===== RIGHT ACTION BUTTONS ===== */}
              <div className="absolute right-3 bottom-44 md:bottom-56 flex flex-col gap-5 z-30 pb-4">
                <ActionButton icon={<Heart size={28} />} count="12k" />
                <ActionButton icon={<MessageCircle size={28} />} count="340" />
                <ActionButton icon={<Bookmark size={28} />} />
                <ActionButton icon={<Share2 size={28} />} />
              </div>

              {/* ===== BOTTOM INFO (CAPTION) ===== */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-20 px-4 z-20 text-white pointer-events-none pb-20 md:pb-4">
                
                <div className="flex items-center gap-3 mb-3 pointer-events-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 p-[2px]">
                     <div className="w-full h-full rounded-full bg-gray-800 border border-black/50 overflow-hidden">
                        <div className="w-full h-full bg-zinc-700" />
                     </div>
                  </div>
                  <span className="font-semibold tracking-wide text-shadow text-sm md:text-base">
                    {reel.username}
                  </span>
                  <button className="text-xs font-bold border border-white/60 px-3 py-1 rounded-lg hover:bg-white hover:text-black transition-colors">
                    Follow
                  </button>
                </div>
                
                <h2 className="font-bold text-lg leading-tight mb-2 pr-12 drop-shadow-md">
                  {reel.title}
                </h2>
                
                <div className="flex items-center gap-2 opacity-90 text-sm mb-3 font-medium">
                  <MapPin size={14} className="text-pink-500" /> {reel.place}
                </div>
                
                <div className="flex flex-wrap gap-2 opacity-90">
                   {["#travel", "#fyp", "#explore"].map(tag => (
                      <span key={tag} className="text-xs font-semibold">{tag}</span>
                   ))}
                </div>
              </div> {/* End of Bottom Info */}
              
            </div> {/* 👈 ⭐ THIS WAS MISSING (Closes Responsive Frame) */}

            {/* === DESKTOP NAV ARROWS === */}
            <div className="hidden md:flex flex-col gap-4 absolute right-10 top-1/2 -translate-y-1/2 z-50">
                <button onClick={() => scrollToReel(idx - 1)} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-110">
                    <ChevronUp />
                </button>
                <button onClick={() => scrollToReel(idx + 1)} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all hover:scale-110">
                    <ChevronDown />
                </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- UI COMPONENTS ---- */
function ActionButton({ icon, count }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group">
      <div className="p-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 group-hover:bg-black/40 transition-all active:scale-90">
        <div className="text-white group-hover:text-pink-500 transition-colors">{icon}</div>
      </div>
      {count && (
        <span className="text-white text-xs font-bold drop-shadow-md">
          {count}
        </span>
      )}
    </div>
  );
}