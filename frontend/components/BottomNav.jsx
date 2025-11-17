"use client";
import Link from "next/link";

export default function BottomNav() {
  const tabs = [
    { label: "Home", icon: "🏠", href: "/" },
    { label: "Reels", icon: "🎞", href: "/reels" },
    { label: "Create", icon: "➕", href: "/create" },
    { label: "Profile", icon: "👤", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-black border-t border-white/5 z-40">
      <div className="max-w-full mx-auto px-4">
        <div className="h-16 flex items-center justify-around">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href}>
              <div className="flex flex-col items-center text-sm text-white">
                <div className="text-2xl">{t.icon}</div>
                <div className="text-[10px]">{t.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
