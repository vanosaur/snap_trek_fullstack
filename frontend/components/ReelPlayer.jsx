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
  Bookmark,
} from "lucide-react";

import BottomNav from "./BottomNav";
import ItineraryCard from "./ItineraryCard";
import api from "../utils/api";

const CTA_HEIGHT = 72;
const BOTTOM_NAV_HEIGHT = 64;

/* =========================================
   REEL ITEM COMPONENT
   ========================================= */
const ReelItem = ({
  reel,
  isActive,
  isMuted,
  toggleMute,
  isMobile,
  setIsFlippedGlobal,
  toggleLike,
  toggleSave,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

  /* OPEN flip card */
  const handleOpenItinerary = (e) => {
    e.stopPropagation();
    setIsFlipped(true);
    setIsFlippedGlobal(true);
  };

  /* CLOSE flip card */
  const handleCloseItinerary = () => {
    setIsFlipped(false);
    setIsFlippedGlobal(false);
  };

  /* Stop scroll bubbling */
  const stopScroll = (e) => {
    if (isFlipped) e.stopPropagation();
  };

  /* Video autoplay */
  useEffect(() => {
    if (!isActive && isFlipped) {
      setIsFlipped(false);
      setIsFlippedGlobal(false);
    }

    if (videoRef.current) {
      if (isActive && !isPaused && !isFlipped) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) =>
            console.log("Autoplay prevented:", error)
          );
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPaused, isFlipped]);

  return (
    <div
      className={`relative w-full h-full md:w-[400px] md:h-[700px] md:max-h-[90vh] group perspective-1000 transition-all duration-300 ${
        isFlipped ? "overflow-hidden" : ""
      }`}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 backface-hidden w-full h-full bg-black rounded-none md:rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <video
            ref={videoRef}
            src={reel.video_url || reel.video}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onClick={() => setIsPaused(!isPaused)}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

          {/* MUTE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="absolute top-12 md:top-6 right-4 md:right-6 z-40 p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* PAUSE OVERLAY */}
          {isPaused && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Play className="text-white fill-white ml-1" size={32} />
              </div>
            </div>
          )}

            {/* SIDE CONTROLS */}
          <div className="absolute right-2 md:right-4 bottom-24 md:bottom-24 flex flex-col gap-5 items-center z-30">
            {/* LIKE */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(reel.id);
                }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition"
              >
                <Heart
                  size={24}
                  className={reel.liked ? "text-red-500 fill-red-500" : "text-white"}
                />
              </button>
              <span className="text-xs font-bold text-white">
                {reel.likes || 0}
              </span>
            </div>

            {/* SAVE */}
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave(reel.id);
                }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition"
              >
                <Bookmark
                  size={24}
                  className={reel.saved ? "text-teal-400 fill-teal-400" : "text-white"}
                />
              </button>
              <span className="text-xs font-bold text-white">Save</span>
            </div>

            {/* COMMENTS */}
            <div className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                <MessageCircle size={24} className="text-white" />
              </div>
              <span className="text-xs font-bold text-white">
                {reel.comments || "0"}
              </span>
            </div>

            {/* SHARE */}
            <div className="flex flex-col items-center gap-1">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full">
                <Share2 size={24} className="text-white" />
              </div>
              <span className="text-xs font-bold text-white">Share</span>
            </div>

            {/* ITINERARY */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <button
                onClick={handleOpenItinerary}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition border border-white/20"
              >
                <Compass size={24} className="text-white" />
              </button>
              <span className="text-xs text-white">Itinerary</span>
            </div>
          </div>

          {/* BOTTOM INFO */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white z-20">
            <p className="text-sm opacity-90 line-clamp-2 mb-2">{reel.title}</p>
          </div>
        </div>

        {/* BACK — Scrollable Itinerary */}
        <div
          className="absolute inset-0 w-full h-full rounded-none md:rounded-2xl overflow-y-auto bg-white z-50"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          onWheel={stopScroll}
          onTouchMove={stopScroll}
        >
          <ItineraryCard
            reel={reel}
            onClose={handleCloseItinerary}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================
   MAIN REEL PLAYER
   ========================================= */
export default function ReelPlayer() {
  const [reels, setReels] = useState([]);
  const [activeReelId, setActiveReelId] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isFlippedGlobal, setIsFlippedGlobal] = useState(false);

  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect Mobile */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e) => setIsMobile(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Fetch REELS */
  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await api.get("/reels");
        const data = res.data; 
        setReels(data);

        if (data.length > 0) setActiveReelId(String(data[0].id));
      } catch (err) {
        console.error("Failed to load reels:", err);
      }
    }

    fetchReels();
  }, []);

  /* LIKE HANDLER */
  const handleLike = async (reelId) => {
    setReels((prev) =>
      prev.map((r) => {
        if (String(r.id) === String(reelId)) {
          const isLiked = !!r.liked;
          return {
            ...r,
            liked: !isLiked,
            likes: isLiked ? (r.likes || 0) - 1 : (r.likes || 0) + 1,
          };
        }
        return r;
      })
    );

    try {
      await api.post(`/reels/${reelId}/like`);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  /* SAVE HANDLER */
  const handleSave = async (reelId) => {
    setReels((prev) =>
      prev.map((r) => {
        if (String(r.id) === String(reelId)) {
          return { ...r, saved: !r.saved };
        }
        return r;
      })
    );

    try {
      await api.post(`/reels/${reelId}/save`);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  /* Intersection */
  useEffect(() => {
    if (!reels.length) return;

    const options = { root: containerRef.current, threshold: 0.6 };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          setActiveReelId(entry.target.dataset.id);
      });
    }, options);

    const sections = document.querySelectorAll(".reel-section");
    sections.forEach((s) => observerRef.current.observe(s));

    return () => observerRef.current?.disconnect();
  }, [reels]);

  /* Scroll to next reel */
  const scrollToReel = (direction) => {
    if (!containerRef.current) return;

    const currentIndex = reels.findIndex((r) => String(r.id) === activeReelId);
    let nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (nextIndex >= 0 && nextIndex < reels.length) {
      containerRef.current.scrollTo({
        top: nextIndex * containerRef.current.clientHeight,
        behavior: "smooth",
      });
    }
  };

  /* Loading UI */
  if (reels.length === 0) {
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Loading reels...
      </div>
    );
  }

  return (
    <div className="bg-black w-full h-[100dvh] flex items-center justify-center relative">
      <div
        ref={containerRef}
        className={`w-full md:w-[450px] h-[100dvh] bg-black snap-y snap-mandatory no-scrollbar ${
          isFlippedGlobal ? "overflow-hidden" : "overflow-y-scroll"
        }`}
      >
        {reels.map((reel) => (
          <div
            key={reel.id}
            data-id={reel.id}
            className="reel-section w-full h-[100dvh] snap-start flex items-center justify-center"
          >
            <ReelItem
              reel={reel}
              isActive={activeReelId === String(reel.id)}
              isMuted={isMuted}
              toggleMute={() => setIsMuted(!isMuted)}
              isMobile={isMobile}
              setIsFlippedGlobal={setIsFlippedGlobal}
              toggleLike={handleLike}
              toggleSave={handleSave}
            />
          </div>
        ))}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed right-10 flex-col gap-4 text-white z-50">
        <button
          onClick={() => scrollToReel("up")}
          className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition"
        >
          <ChevronUp />
        </button>
        <button
          onClick={() => scrollToReel("down")}
          className="p-4 bg-zinc-900 rounded-full hover:bg-zinc-800 transition"
        >
          <ChevronDown />
        </button>
      </div>

      {/* Mobile BottomNav */}
      {isMobile && (
        <div
          className="fixed left-0 right-0 bottom-0 z-50 md:hidden"
          style={{
            height: `${BOTTOM_NAV_HEIGHT}px`,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <BottomNav />
        </div>
      )}
    </div>
  );
}
