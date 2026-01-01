"use client";

import Link from "next/link";
import { Home, Film, MessageCircle, User, PlusSquare, Camera } from "lucide-react";
import Logo from "./Logo";

export default function DesktopSidebar({ active = "home", onCreateClick }) {
  const menu = [
    { key: "home", label: "Home", href: "/feed", icon: Home },
    { key: "reels", label: "Reels", href: "/reels", icon: Film },
    { key: "chat", label: "Chat", href: "/chat", icon: MessageCircle },
    { key: "profile", label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-full px-4 py-6 sticky top-0">
      <div className="glass-panel rounded-[2.5rem] p-6 h-full flex flex-col relative overflow-hidden">
        
        {/* Background Glow Blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/20 blur-[80px] rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="mb-12 px-2 relative z-10">
          <Link href="/" className="inline-flex items-center gap-4 group">
            <Logo className="w-12 h-12" />
            <div>
              <div className="text-white text-2xl font-bold tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-blue-500 transition-all">SnapTrek</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">Social App</div>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="space-y-3 flex-1 relative z-10">
          {menu.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.key;
            return (
              <Link key={m.key} href={m.href} className="block group">
                <div
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer border
                  ${isActive 
                    ? "bg-white/10 border-white/10 text-white shadow-lg shadow-black/20 translate-x-1" 
                    : "border-transparent text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" : "group-hover:text-white"}`} />
                  <span className={`font-semibold text-sm ${isActive ? "text-white" : ""}`}>{m.label}</span>
                  
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_8px_currentColor]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Create Button */}
        <div className="mt-6 relative z-10">
          <button 
            onClick={onCreateClick}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border border-white/10"
          >
            <div className="bg-white/20 p-1 rounded-md">
                 <PlusSquare className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <span>Create Post</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
