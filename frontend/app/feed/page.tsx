"use client";

import { useRouter } from "next/navigation";
import DesktopSidebar from "../../components/DesktopSidebar";
import HomeFeedDesktop from "../../components/HomeFeedDesktop";
import BottomNav from "../../components/BottomNav";


export default function Home() {
  const router = useRouter();
  return (
    
    // Added md:flex-row so sidebar and content sit side-by-side on desktop
    <div className="bg-black min-h-screen text-white flex flex-col md:flex-row">

      {/* --- MOBILE ONLY: Bottom Navigation --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 border-t border-gray-800 bg-black">
        <BottomNav />
      </div>

      {/* --- DESKTOP ONLY: Left Sidebar --- */}
      <aside className="hidden md:block w-[250px] lg:w-[300px] border-r border-gray-800 min-h-screen sticky top-0 h-screen overflow-y-auto">
        <DesktopSidebar active="home" onCreateClick={() => {
          router.push("/upload");
        }} />
      </aside>

      {/* --- VISIBLE ON ALL SCREENS: Main Feed --- */}
      {/* Added mb-20 for mobile so content isn't hidden behind the BottomNav */}
      <main className="flex-1 flex justify-center px-4 py-6 mb-20 md:mb-0">
        <div className="w-full max-w-[650px]">
          {/* Even though it is named HomeFeedDesktop, we reuse it for mobile for now */}
          <HomeFeedDesktop onCreateClick={() => {}} />
        </div>
      </main>

      {/* --- DESKTOP ONLY: Right Spacing --- */}
      <div className="hidden xl:flex w-[220px]" />

    </div>
  );
}