"use client";

import StoriesBar from "./StoriesBar";
import PostCardDesktop from "./PostCardDesktop";
import postsData from "../data/postsData";
import { Plus, Camera } from "lucide-react";

export default function HomeFeedDesktop({ onCreateClick }) {
  return (
    <main className="w-full h-full overflow-y-auto no-scrollbar">
      {/* Mobile sticky header (visible only below md) */}
      <div className="md:hidden sticky top-0 z-30 glass-panel border-b border-white/5 rounded-none">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              SnapTrek
            </h1>
          </div>
          <button 
            onClick={onCreateClick}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 active:scale-90 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 pb-24 md:pb-10"> 
        {/* Stories (mobile) */}
        <div className="md:hidden mb-8 flex items-center gap-4">
          <button className="w-16 h-16 rounded-full border-2 border-dashed border-teal-500/50 flex items-center justify-center text-teal-500 bg-teal-500/10 shrink-0">
            <Plus className="w-6 h-6" />
          </button>

          <div className="flex-1 overflow-x-auto no-scrollbar">
            <StoriesBar mobile />
          </div>
        </div>

        {/* Desktop story (md+) */}
        <div className="hidden md:block mb-10">
          <div className="glass-panel p-4 rounded-2xl">
            <div className="flex items-center gap-4">
              <button className="w-16 h-16 rounded-full border-2 border-dashed border-teal-500/50 flex items-center justify-center text-teal-500 bg-teal-500/10 hover:bg-teal-500/20 transition-colors shrink-0">
                <Plus className="w-6 h-6" />
              </button>
              <StoriesBar />
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {postsData.map((p) => (
            <PostCardDesktop key={p.id} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
