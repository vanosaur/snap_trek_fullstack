// frontend/components/DesktopSidebar.jsx
"use client";

import Link from "next/link";

export default function DesktopSidebar({ active = "home" }) {
  const menu = [
    { key: "home", label: "Home", href: "/" },
    { key: "reels", label: "Reels", href: "/reels" },
    { key: "chat", label: "Chat", href: "/chat" },
    { key: "profile", label: "Profile", href: "/profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-full px-8 py-8 bg-black/80 backdrop-blur-sm border-r border-gray-800">
      <div>
        {/* Logo (gradient) */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-violet-500 to-orange-400 shadow-xl flex items-center justify-center"
              aria-hidden
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15 8H9L12 2Z" fill="white" opacity="0.95" />
                <circle cx="12" cy="14" r="6" fill="white" opacity="0.06" />
              </svg>
            </div>
            <div>
              <div className="text-white text-2xl font-bold tracking-tight">TravelSnaps</div>
              <div className="text-xs text-gray-400">for travelers</div>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
          {menu.map((m) => (
            <Link key={m.key} href={m.href} className="group">
              <div
                className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-all cursor-pointer
                ${active === m.key ? "bg-white/6 ring-1 ring-white/10" : "hover:bg-white/3"}`}
              >
                <Icon name={m.key} active={active === m.key} />
                <span className={`font-medium ${active === m.key ? "text-white" : "text-gray-200"}`}>
                  {m.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 text-black font-semibold shadow hover:scale-[1.01] transition">
          + Create
        </button>
      </div>
    </aside>
  );
}

function Icon({ name, active }) {
  const base = "w-5 h-5";
  const fillColor = active ? "text-white" : "text-gray-300";
  switch (name) {
    case "home":
      return (
        <svg className={`${base} ${fillColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      );
    case "reels":
      return (
        <svg className={`${base} ${fillColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 3h10v4H7zM7 11h10v10H7z" />
        </svg>
      );
    case "chat":
      return (
        <svg className={`${base} ${fillColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "profile":
      return <div className={`${base} rounded-full bg-white/20`} />;
    default:
      return null;
  }
}
