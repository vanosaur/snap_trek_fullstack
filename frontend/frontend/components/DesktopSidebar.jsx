"use client";

import Link from "next/link";
import { Home, Film, MessageCircle, User, PlusSquare, Camera } from "lucide-react";

export default function DesktopSidebar({ active = "home", onCreateClick }) {
  const menu = [
    { key: "home", label: "Home", href: "/feed", icon: Home },
    { key: "reels", label: "Reels", href: "/reels", icon: Film },
    { key: "chat", label: "Chat", href: "/chat", icon: MessageCircle },
    { key: "profile", label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-full px-6 py-8 sticky top-0">
      <div className="glass-panel rounded-3xl p-6 h-full flex flex-col">
        {/* Logo */}
        <div className="mb-10 px-2">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white text-xl font-bold tracking-tight group-hover:text-teal-400 transition-colors">SnapTrek</div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Social</div>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="space-y-2 flex-1">
          {menu.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.key;
            return (
              <Link key={m.key} href={m.href} className="block group">
                <div
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer
                  ${isActive 
                    ? "bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 text-white shadow-lg shadow-teal-500/5" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-teal-400" : "group-hover:text-white transition-colors"}`} />
                  <span className="font-medium text-sm">{m.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Create Button */}
        <div className="mt-6">
          <button 
            onClick={onCreateClick}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            <PlusSquare className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Create Post
          </button>
        </div>
      </div>
    </aside>
  );
}
