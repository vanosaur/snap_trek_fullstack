"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  MapPin, 
  Link as LinkIcon, 
  Grid, 
  Film, 
  Bookmark, 
  Settings, // Icon for the menu trigger
  Edit3, 
  LogOut,   // Icon for the logout button
  ChevronLeft 
} from "lucide-react";

/* --- MOCK DATA --- */
const USER = {
  name: "Alex Wanderer",
  username: "@alex_travels",
  bio: "🌍 Exploring the world one frame at a time.\n📸 Sony A7IV | 📍 Currently in Bali\n✨ Capturing moments that matter.",
  location: "Bali, Indonesia",
  website: "alexwanderer.com",
  stats: { posts: 142, followers: "12.5k", following: 450 },
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  banner: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
};

const POSTS = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  image: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?q=80&w=500&auto=format&fit=crop`,
}));

export default function ProfileView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");
  
  // STATE: Controls the visibility of the settings dropdown
  const [showSettings, setShowSettings] = useState(false);

  // HANDLER: Logout logic
  const handleLogout = () => {
    // 1. Clear tokens/session here
    console.log("Logging out...");
    // 2. Redirect
    router.push("/login"); // or router.push('/')
  };

  return (
    <div className="w-full min-h-screen bg-black text-white pb-32 md:pb-0 overflow-x-hidden">
      
      {/* === HEADER SECTION === */}
      <div className="relative mb-16 md:mb-20 z-20">
        
        {/* LEFT: Back Button */}
        <button onClick={() => router.back()} className="absolute top-4 left-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
            <ChevronLeft size={24} />
        </button>

        {/* RIGHT: Settings/Logout Menu */}
        <div className="absolute top-4 right-4 z-30">
            <button 
                onClick={() => setShowSettings(!showSettings)} 
                className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 transition-all active:scale-95
                ${showSettings ? "bg-white text-black" : "bg-black/50 text-white"}`}
            >
                <Settings size={20} />
            </button>

            {/* DROPDOWN MENU */}
            {showSettings && (
                <div className="absolute top-12 right-0 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 rounded-lg transition-colors text-left">
                            <Settings size={16} /> Account Settings
                        </button>
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                        >
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>

        {/* Banner */}
        <div className="h-40 md:h-64 w-full overflow-hidden rounded-b-3xl relative">
            <img src={USER.banner} alt="Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Avatar & Edit Button */}
        <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-10 flex items-end gap-6 w-full pr-8 md:pr-0">
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img src={USER.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>
            
            <div className="md:hidden flex-1 flex justify-end mb-2">
                 <button className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 active:bg-white/20">
                    <Edit3 size={14} /> Edit
                </button>
            </div>
        </div>
      </div>

      {/* === USER INFO === */}
      <div className="px-4 md:px-10 mb-8 relative z-10">
        <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{USER.name}</h1>
            <p className="text-zinc-400 font-medium mb-5">{USER.username}</p>
            
            <div className="bg-zinc-900/50 backdrop-blur-md border border-white/5 flex justify-between px-6 py-4 rounded-2xl mb-6 w-full max-w-full">
                <StatItem label="Posts" value={USER.stats.posts} />
                <StatItem label="Followers" value={USER.stats.followers} />
                <StatItem label="Following" value={USER.stats.following} />
            </div>

            <p className="text-gray-200 whitespace-pre-line leading-relaxed max-w-lg mb-4 text-sm">
                {USER.bio}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-teal-400 font-medium">
                <span className="flex items-center gap-1"><MapPin size={14} /> {USER.location}</span>
                <span className="flex items-center gap-1 hover:underline cursor-pointer"><LinkIcon size={14} /> {USER.website}</span>
            </div>
        </div>
      </div>

      {/* === TABS === */}
      <div className="px-4 md:px-10 mb-2 sticky top-0 z-10 bg-black/95 backdrop-blur-xl py-2">
        <div className="flex border-b border-white/10">
            <TabButton active={activeTab === "posts"} onClick={() => setActiveTab("posts")} icon={<Grid size={18} />} label="POSTS" />
            <TabButton active={activeTab === "reels"} onClick={() => setActiveTab("reels")} icon={<Film size={18} />} label="REELS" />
            <TabButton active={activeTab === "saved"} onClick={() => setActiveTab("saved")} icon={<Bookmark size={18} />} label="SAVED" />
        </div>
      </div>

      {/* === CONTENT GRID === */}
      <div className="px-1 md:px-10 pb-safe"> 
        <div className="grid grid-cols-3 gap-0.5 md:gap-4">
            {POSTS.map((post) => (
                <div key={post.id} className="aspect-square relative group overflow-hidden bg-zinc-900 cursor-pointer">
                    <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/* --- SUBCOMPONENTS --- */

function StatItem({ label, value }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-white">{value}</span>
            <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{label}</span>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button 
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold tracking-wide transition-all relative
            ${active ? "text-white" : "text-zinc-600"}`}
        >
            {icon}
        </button>
    );
}