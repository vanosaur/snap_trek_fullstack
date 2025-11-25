"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Film, PlusSquare, User, MessageCircle } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", icon: Home, href: "/feed" },
    { label: "Reels", icon: Film, href: "/reels" },
    { label: "Chat", icon: MessageCircle, href: "/chat" }, // Changed Create to Chat as per sidebar
    { label: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 pb-safe">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"></div>
      
      <div className="relative max-w-full mx-auto px-2">
        <div className="h-[70px] flex items-center justify-around">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = pathname === t.href;
            
            return (
              <Link key={t.href} href={t.href} className="group relative w-16 flex flex-col items-center justify-center">
                {isActive && (
                    <div className="absolute -top-4 w-10 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-b-full shadow-[0_0_15px_rgba(20,184,166,0.7)] animate-in fade-in duration-300" />
                )}
                
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 text-teal-400' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform`} />
                </div>
                
                <span className={`text-[10px] font-bold mt-1 transition-colors ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
