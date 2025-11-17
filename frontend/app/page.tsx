"use client";

import DesktopSidebar from "../components/DesktopSidebar";
import HomeFeedDesktop from "../components/HomeFeedDesktop";
import HomeFeedMobile from "../components/HomeFeedDesktop";
import BottomNav from "../components/BottomNav";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      
      {/* MOBILE LAYOUT */}
      <div className="md:hidden w-full">
        <HomeFeedMobile />
        <BottomNav />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex">
        <div className="w-[300px]">
          <DesktopSidebar active="home" />
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[630px] mx-auto">
            <HomeFeedDesktop />
          </div>
        </div>

        <div className="hidden xl:flex w-[200px]" />
      </div>
    </div>
  );
}
