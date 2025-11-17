"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-6 gap-6 fixed">
      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-6">SnapTrek</h1>

      <Link href="/" className="flex items-center gap-3 text-lg">
        <HomeIcon /> Home
      </Link>

      <Link href="/search" className="flex items-center gap-3 text-lg">
        <SearchIcon /> Search
      </Link>

      <Link href="/explore" className="flex items-center gap-3 text-lg">
        <ExploreIcon /> Explore
      </Link>

      <Link href="/reels" className="flex items-center gap-3 text-lg">
        <ReelsIcon /> Reels
      </Link>

      <Link href="/create" className="flex items-center gap-3 text-lg">
        <CreateIcon /> Create
      </Link>

      <Link href="/profile" className="flex items-center gap-3 text-lg">
        <ProfileIcon /> Profile
      </Link>
    </div>
  );
}

/* ---- ICONS ---- */
function HomeIcon() {
  return (
    <svg className="w-6 h-6" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M3 9.5L12 3l9 6.5V20H3V9.5z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-6 h-6" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg className="w-6 h-6" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 2l9 4-9 16-9-16 9-4z" />
    </svg>
  );
}

function ReelsIcon() {
  return (
    <svg className="w-6 h-6" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M6 3h12v18l-6-3-6 3V3z" />
    </svg>
  );
}

function CreateIcon() {
  return (
    <svg className="w-6 h-6" stroke="currentColor" fill="none" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ProfileIcon() {
  return <div className="w-6 h-6 rounded-full bg-gray-300"></div>;
}
