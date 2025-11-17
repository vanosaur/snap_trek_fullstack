"use client";

import StoriesBar from "./StoriesBar";
import PostCardDesktop from "./PostCardDesktop";
import postsData from "../data/postsData";

export default function HomeFeedDesktop() {
  return (
    <main className="w-full h-full overflow-y-auto bg-black">
      {/* Mobile sticky header (visible only below md) */}
      <div className="md:hidden sticky top-0 z-30 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-violet-400 to-purple-300 bg-clip-text text-transparent">
            TravelSnaps
          </h1>
          <button className="px-3 py-1 rounded-lg bg-pink-600 text-black font-semibold">+ Post</button>
        </div>
      </div>

      <div className="px-4 pt-4 pb-24"> {/* pb-24 ensures bottom-nav won't overlap */}
        {/* Stories (mobile) */}
        <div className="md:hidden mb-6 flex items-center gap-4">
          <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-2xl bg-transparent">
            +
          </button>

          <div className="flex-1 overflow-x-auto">
            <StoriesBar mobile />
          </div>
        </div>

        {/* Desktop story (md+) */}
        <div className="hidden md:block mb-6">
          <div className="px-4">
            <div className="flex items-center gap-4">
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-xl bg-transparent">+</button>
              <StoriesBar />
            </div>
          </div>
        </div>

        {/* Posts: mobile -> PostCardMobile, desktop uses same component (responsive) */}
        <div className="space-y-8">
          {postsData.map((p) => (
            <PostCardDesktop key={p.id} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
