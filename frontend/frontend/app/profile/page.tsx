"use client";

import DesktopSidebar from "../../components/DesktopSidebar";
import BottomNav from "../../components/BottomNav";
import ProfileView from "../../components/ProfileView";

export default function ProfilePage() {
    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-teal-500/30">

            {/* BACKGROUND AMBIANCE */}
            <div className="fixed top-[-20%] left-[-20%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            {/* MOBILE LAYOUT */}
            <div className="md:hidden w-full relative z-10">
                <ProfileView />
                <BottomNav />
            </div>

            {/* DESKTOP LAYOUT */}
            <div className="hidden md:flex relative z-10">
                <div className="w-[280px] xl:w-[320px] flex-shrink-0">
                    <DesktopSidebar active="profile" onCreateClick={() => { }} />
                </div>

                <div className="flex-1 flex justify-center pt-8">
                    <div className="w-full max-w-[900px] mx-auto">
                        <ProfileView />
                    </div>
                </div>

                {/* Right Spacer/Panel if needed later */}
                <div className="hidden xl:flex w-[80px] flex-shrink-0" />
            </div>
        </div>
    );
}
