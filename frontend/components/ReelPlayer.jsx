"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Compass,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Play,
  ChevronUp,
  ChevronDown,
  Music,
} from "lucide-react";
// adjust this import path if your component location differs:
import BottomNav from "./BottomNav";
import reelsData from "../data/reelsData";


/* =========================================
   CONSTANTS FOR CTA / NAV SIZING
   ========================================= */
import ItineraryCard from "./ItineraryCard";

/* =========================================
   CONSTANTS FOR CTA / NAV SIZING
   ========================================= */
const CTA_HEIGHT = 72; // px - height of the "Book This Trip" button area
const BOTTOM_NAV_HEIGHT = 64; // px - estimated BottomNav height on mobile

/* =========================================
   3. REEL ITEM & PLAYER
   ========================================= */

const ReelItem = ({ reel, isActive, isMuted, toggleMute, isMobile }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

  // Handle Flip Triggers
  const handleOpenItinerary = (e) => {
    e.stopPropagation();
    setIsFlipped(true);
  };

  const handleCloseItinerary = () => {
    setIsFlipped(false);
  };

  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
    }

    if (videoRef.current) {
      if (isActive && !isPaused && !isFlipped) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => console.log("Autoplay prevented:", error));
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPaused, isFlipped]);

  return (
    // RESPONSIVE CONTAINER:
    // Mobile: w-full h-full (fills screen)
    // Desktop (md): Fixed width 400px, max-height 90vh (prevents overflow on small laptops)
    <div className="relative w-full h-full md:w-[400px] md:h-[700px] md:max-h-[90vh] group perspective-1000 transition-all duration-300">
      <div
        className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 backface-hidden w-full h-full bg-black rounded-none md:rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <video
            ref={videoRef}
            src={reel.video}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onClick={() => setIsPaused(!isPaused)}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

          {/* Mute Button - Positioned safely */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="absolute top-12 md:top-6 right-4 md:right-6 z-40 p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>
          )}

          {/* Side Controls */}
          <div className="absolute right-2 md:right-4 bottom-24 md:bottom-24 flex flex-col gap-5 md:gap-6 items-center z-30">
            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 md:p-3 bg-white/10 backdrop-blur-md rounded-full"><Heart size={24} className="text-white" /></div>
              <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{reel.likes || "0"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 md:p-3 bg-white/10 backdrop-blur-md rounded-full"><MessageCircle size={24} className="text-white" /></div>
              <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{reel.comments || "0"}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="p-2.5 md:p-3 bg-white/10 backdrop-blur-md rounded-full"><Share2 size={24} className="text-white" /></div>
              <span className="text-xs font-bold text-white shadow-black drop-shadow-md">Share</span>
            </div>

            {/* Compass Button */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <button
                onClick={handleOpenItinerary}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all cursor-pointer border border-white/20"
              >
                <Compass size={24} className="text-white" />
              </button>
              <span className="text-[10px] md:text-xs font-bold text-white shadow-black drop-shadow-md">Itinerary</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-6 md:pb-8 text-white z-20">
            <div className="flex items-center gap-3 mb-3 pr-12">
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-800 shrink-0">
                <img src={reel.avatar || "https://github.com/shadcn.png"} alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm text-white drop-shadow-md truncate">@{reel.username || "user"}</h3>
                <div className="flex items-center gap-1 text-xs opacity-80 truncate">
                  <MapPin size={10} /> <span className="truncate">{reel.place}</span>
                </div>
              </div>
              <button className="bg-white/20 px-3 py-1 rounded-md text-xs font-bold backdrop-blur-sm ml-auto hover:bg-white/30 transition shrink-0">Follow</button>
            </div>
            <p className="text-sm opacity-90 line-clamp-2 mb-2 pr-12">{reel.title}</p>
            <div className="flex items-center gap-2 text-xs opacity-75">
              <Music size={12} /> <span className="w-40 truncate">Original Audio • {reel.username}</span>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 w-full h-full rounded-none md:rounded-2xl overflow-hidden bg-white z-50"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <ItineraryCard reel={reel} onClose={handleCloseItinerary} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   MAIN EXPORT
   ========================================= */
export default function ReelPlayer() {
  const [activeReelId, setActiveReelId] = useState(reelsData[0]?.id || 1);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // detect mobile to control BottomNav / CTA offsets
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq ? mq.matches : false);
    if (mq && mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq && mq.addListener) mq.addListener(handler);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener("change", handler);
      else if (mq && mq.removeListener) mq.removeListener(handler);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.6,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveReelId(Number(entry.target.dataset.id));
        }
      });
    }, options);

    const sections = document.querySelectorAll(".reel-section");
    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const scrollToReel = (direction) => {
    if (!containerRef.current) return;
    const currentIndex = reelsData.findIndex((r) => r.id === activeReelId);
    let nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex >= 0 && nextIndex < reelsData.length) {
      const nextReel = document.querySelector(`[data-id="${reelsData[nextIndex].id}"]`);
      nextReel?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black w-full h-[100dvh] flex items-center justify-center relative">
      <div
        ref={containerRef}
        className="w-full md:w-[450px] h-[100dvh] md:h-full bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide no-scrollbar"
      >
        {reelsData.map((reel) => (
          <div
            key={reel.id}
            data-id={reel.id}
            className="reel-section w-full h-[100dvh] md:h-full snap-start flex items-center justify-center md:py-8"
          >
            <ReelItem
              reel={reel}
              isActive={activeReelId === reel.id}
              isMuted={isMuted}
              toggleMute={() => setIsMuted(!isMuted)}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>

      {/* Desktop up/down nav */}
      <div className="hidden md:flex fixed right-10 flex-col gap-4 text-white/50 z-50">
        <button onClick={() => scrollToReel("up")} className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition"><ChevronUp /></button>
        <button onClick={() => scrollToReel("down")} className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition"><ChevronDown /></button>
      </div>

      {/* Mobile BottomNav + safe stacking */}
      {isMobile && (
        <>
          {/* The CTA is inside ItineraryCard and positioned above BottomNav via CSS inline bottom offset.
              This BottomNav is the app's bottom nav and sits at the very bottom. */}
          <div
            className="fixed left-0 right-0 bottom-0 z-50 md:hidden"
            style={{
              height: `${BOTTOM_NAV_HEIGHT}px`,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
              background: "transparent",
            }}
          >
            <div className="w-full h-full">
              <BottomNav />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
