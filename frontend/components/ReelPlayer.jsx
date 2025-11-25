"use client";

import { useEffect, useRef, useState } from "react";
// Ensure this path matches your project structure
import reelsData from "../data/reelsData"; 
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Play,
  MapPin,
  ChevronUp,
  ChevronDown,
  Compass,
  Volume2,
  VolumeX,
  X, 
  Map, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Music
} from "lucide-react";

/* =========================================
   COMPONENT 1: THE BACK (ITINERARY CARD)
   ========================================= */
/* =========================================
   COMPONENT 1: THE BACK (ITINERARY CARD)
   ========================================= */
const ItineraryCard = ({ reel, onClose }) => {
  
  const stopScroll = (e) => e.stopPropagation();

  return (
    <div 
      className="w-full h-full bg-white text-black p-6 flex flex-col relative overflow-y-auto overscroll-y-contain touch-pan-y"
      onWheel={stopScroll}
      onTouchMove={stopScroll}
      onClick={stopScroll} 
    >
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-shrink-0 relative z-10">
        <div>
          <h3 className="font-bold text-xl leading-tight">Trip to {reel.place}</h3>
          <p className="text-zinc-500 text-xs mt-1">3 Days • $450 Budget</p>
        </div>
        
        <button 
          onClick={(e) => { 
            e.preventDefault();
            e.stopPropagation(); 
            onClose(); 
          }} 
          className="relative z-50 p-2 bg-zinc-100 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer active:scale-90"
        >
          <X size={20} />
        </button>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-48 bg-teal-50 rounded-xl mb-6 border-2 border-dashed border-teal-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
          <Map className="text-teal-300 mb-2 group-hover:scale-110 transition-transform" size={40} />
          <span className="text-teal-600 font-bold text-sm z-10">Interactive Map View</span>
          
          <div className="absolute top-8 left-12 w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-lg" />
          <div className="absolute bottom-10 right-16 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg" />
      </div>

      {/* Timeline Itinerary */}
      <div className="space-y-6 flex-1 pb-4">
        {[1, 2, 3, 4, 5].map((day) => (
          <div key={day} className="relative pl-6 border-l-2 border-zinc-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-2 border-white shadow-sm" />
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              Day {day} <span className="text-zinc-400 font-normal text-xs">Oct {12+day}</span>
            </h4>
            
            <div className="space-y-3">
               <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 flex gap-3 hover:bg-zinc-100 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-zinc-200 rounded-md overflow-hidden flex-shrink-0">
                      <img src={`https://images.unsplash.com/photo-${1550000000000 + day * 100}?w=100&h=100&fit=crop`} className="w-full h-full object-cover" alt="thumb" />
                  </div>
                  <div>
                      <p className="font-bold text-xs">Activity #{day}</p>
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1"><Clock size={10} /> 9:00 AM</p>
                  </div>
               </div>
               <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-100 flex gap-3 hover:bg-zinc-100 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-zinc-200 rounded-md overflow-hidden flex-shrink-0">
                      <img src={`https://images.unsplash.com/photo-${1550000000000 + day * 200}?w=100&h=100&fit=crop`} className="w-full h-full object-cover" alt="thumb" />
                  </div>
                  <div>
                      <p className="font-bold text-xs">Evening Spot</p>
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1"><DollarSign size={10} /> Free Entry</p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA - FIX APPLIED HERE */}
      {/* Added 'pb-24' (padding bottom) so the button sits higher up on mobile */}
      <div className="mt-4 pt-4 border-t border-zinc-100 flex-shrink-0 bg-white sticky bottom-0 pb-24 md:pb-0 z-20">
          <button className="w-full bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
              Book This Trip <ChevronRight size={16} />
          </button>
      </div>
    </div>
  );
};

/* =========================================
   COMPONENT 2: THE 3D FLIP ITEM (Full Logic)
   ========================================= */
const ReelItem = ({ reel, isActive, isMuted, toggleMute, setParentScrollLock }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // LOGIC: Open Itinerary -> Lock Main Feed
  const handleOpenItinerary = (e) => {
    e.stopPropagation();
    setIsFlipped(true);
    setParentScrollLock(true); 
  };

  // LOGIC: Close Itinerary -> Unlock Main Feed
  const handleCloseItinerary = () => {
    setIsFlipped(false);
    setParentScrollLock(false); 
  };

  // Safety: If user scrolls away fast, ensure lock is released
  useEffect(() => {
    if (!isActive && isFlipped) {
      handleCloseItinerary();
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-full md:w-[450px] md:h-[calc(100vh-40px)] perspective-1000 group">
      <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* === FRONT FACE (VIDEO) === */}
        <div 
            className={`absolute inset-0 backface-hidden w-full h-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border-x border-white/5 md:border-none 
            ${isFlipped ? 'pointer-events-none z-0' : 'z-10'}`}
        >
           {/* Video Player */}
           <video
                src={reel.video}
                className="w-full h-full object-cover pointer-events-none"
                autoPlay={isActive}
                muted={isMuted}
                loop
                playsInline
                ref={(ref) => {
                    if (ref) {
                        if (isPaused || !isActive) ref.pause();
                        else ref.play().catch(() => {});
                    }
                }}
           />

           {/* Gradients & Overlays */}
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
           <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

           {/* Play/Pause Area */}
           <div className="absolute inset-0 z-10 cursor-pointer pointer-events-auto" onClick={() => setIsPaused(!isPaused)} />
           
           {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 bg-black/30 backdrop-blur-[2px]">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                    <Play className="fill-white text-white ml-1" size={32} />
                  </div>
                </div>
           )}

           {/* Mute Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); toggleMute(); }}
             className="absolute top-6 right-6 z-40 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-all pointer-events-auto"
           >
             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </button>

           {/* === FLIP BUTTON (THE TRIGGER) === */}
           <button 
                onClick={handleOpenItinerary}
                className="absolute bottom-24 right-4 z-50 glass-panel p-3 rounded-full border border-teal-500/30 bg-black/20 backdrop-blur-md hover:bg-teal-500 hover:text-white transition-all group/btn shadow-lg pointer-events-auto"
            >
                <Compass size={24} className="text-white group-hover/btn:animate-spin-slow group-hover/btn:text-white" />
                <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none border border-white/10">
                    Flip to Itinerary
                </span>
           </button>

           {/* Right Actions */}
           <div className="absolute right-4 bottom-40 flex flex-col gap-6 z-30 pb-4 items-center pointer-events-auto">
             <ActionButton icon={<Heart size={28} />} count="12k" />
             <ActionButton icon={<MessageCircle size={28} />} count="340" />
             <ActionButton icon={<Bookmark size={28} />} />
             <ActionButton icon={<Share2 size={28} />} />
             <div className="mt-2 w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center animate-spin-slow overflow-hidden">
                <img src={reel.avatar || "https://github.com/shadcn.png"} className="w-full h-full object-cover opacity-80" alt="music" />
             </div>
           </div>
           
           {/* Caption Area */}
           <div className="absolute bottom-0 left-0 w-full px-6 pb-20 md:pb-8 z-20 text-white pointer-events-none pr-20">
             <div className="flex items-center gap-3 mb-3 pointer-events-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-[1.5px] cursor-pointer">
                     <img src={reel.avatar || "https://github.com/shadcn.png"} alt="User" className="w-full h-full rounded-full object-cover border-2 border-black" />
                </div>
                <div className="flex flex-col leading-tight">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm hover:underline cursor-pointer shadow-black drop-shadow-md">{reel.username}</span>
                        <button className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded hover:bg-white/40 transition-colors">Follow</button>
                    </div>
                    <span className="text-xs text-zinc-300 flex items-center gap-1 mt-0.5"><MapPin size={10} className="text-teal-400" /> {reel.place}</span>
                </div>
             </div>
             
             <h2 className="text-sm leading-snug mb-2 font-normal text-zinc-100 drop-shadow-md line-clamp-2">
                  {reel.title} <span className="text-zinc-400">...more</span>
             </h2>

             {/* Music Tag */}
             <div className="flex items-center gap-2 text-xs font-medium text-white/90 mb-3">
                 <Music size={12} />
                 <div className="w-32 overflow-hidden whitespace-nowrap">
                      <p className="animate-marquee">Original Audio • {reel.username}</p>
                 </div>
             </div>
           </div>
        </div>

        {/* === BACK FACE (ITINERARY) === */}
        <div 
            className={`absolute inset-0 backface-hidden w-full h-full rounded-2xl overflow-hidden rotate-y-180 shadow-2xl 
            ${isFlipped ? 'z-20' : 'z-0'}`}
        >
            {isFlipped && (
                <ItineraryCard reel={reel} onClose={handleCloseItinerary} />
            )}
        </div>

      </div>
    </div>
  );
};

/* =========================================
   COMPONENT 3: MAIN PLAYER (FEED LOGIC)
   ========================================= */
export default function ReelPlayer() {
  const containerRef = useRef(null);
  const reelRefs = useRef([]);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // STATE: Locks the main feed when Itinerary is open
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrollLocked) return; 
      if (e.key === "ArrowDown") scrollToReel(activeIndex + 1);
      if (e.key === "ArrowUp") scrollToReel(activeIndex - 1);
      if (e.key === "m") setIsMuted((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isScrollLocked]);

  const scrollToReel = (index) => {
    if (index < 0 || index >= reelsData.length) return;
    reelRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // Intersection Observer
  useEffect(() => {
    reelRefs.current = reelRefs.current.slice(0, reelsData.length);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.6 }
    );
    reelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-black flex overflow-hidden">
      
      {/* Scroll Container */}
      <div
        ref={containerRef}
        // KEY LOGIC: "overflow-hidden" kills the snap scroll, locking the user in place
        className={`w-full h-[100dvh] bg-transparent scroll-smooth z-10 no-scrollbar 
          ${isScrollLocked ? "overflow-hidden" : "overflow-y-scroll snap-y snap-mandatory"}`}
      >
        {reelsData.map((reel, idx) => (
          <div
            key={reel.id}
            data-index={idx}
            ref={(el) => (reelRefs.current[idx] = el)}
            className="snap-start w-full h-[100dvh] flex justify-center items-center relative md:gap-8"
          >
            {/* The 3D Item Component */}
            <ReelItem 
                reel={reel} 
                isActive={idx === activeIndex} 
                isMuted={isMuted}
                toggleMute={() => setIsMuted(!isMuted)}
                setParentScrollLock={setIsScrollLocked}
            />

            {/* Desktop Navigation Arrows (Hide when locked) */}
            {!isScrollLocked && (
              <div className="hidden md:flex flex-col gap-4 z-50 ml-4">
                  <button onClick={() => scrollToReel(idx - 1)} className="p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white/50 hover:text-white border border-white/5 transition-all hover:scale-110">
                      <ChevronUp size={24} />
                  </button>
                  <button onClick={() => scrollToReel(idx + 1)} className="p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white/50 hover:text-white border border-white/5 transition-all hover:scale-110">
                      <ChevronDown size={24} />
                  </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Helper UI --- */
function ActionButton({ icon, count }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group">
      <div className="p-3 rounded-full glass-panel border border-white/5 group-hover:bg-white/20 transition-all active:scale-90 shadow-lg">
        <div className="text-white group-hover:text-teal-400 transition-colors drop-shadow-md">{icon}</div>
      </div>
      {count && (
        <span className="text-white text-xs font-bold drop-shadow-md opacity-90">
          {count}
        </span>
      )}
    </div>
  );
}