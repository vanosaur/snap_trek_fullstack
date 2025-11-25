"use client";

import DesktopSidebar from "../../components/DesktopSidebar";
import BottomNav from "../../components/BottomNav";
import ChatInterface from "../../components/ChatInterface";

export default function ChatPage() {
    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-teal-500/30 overflow-hidden">

            {/* BACKGROUND AMBIANCE */}
            <div className="fixed top-[-20%] left-[-20%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            {/* MOBILE LAYOUT */}
            <div className="md:hidden w-full h-screen relative z-10 flex flex-col">
                <div className="flex-1 overflow-hidden">
                    <ChatInterface />
                </div>
                <BottomNav />
            </div>

            {/* DESKTOP LAYOUT */}
            <div className="hidden md:flex relative z-10 h-screen">
                <div className="w-[280px] xl:w-[320px] flex-shrink-0">
                    <DesktopSidebar active="chat" />
                </div>

                <div className="flex-1 flex items-center justify-center p-6">
                    <ChatInterface />
                </div>
            </div>
        </div>
    );
}
