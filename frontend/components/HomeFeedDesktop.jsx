"use client";

import { useState, useEffect } from "react";
import StoriesBar from "./StoriesBar";
import PostCardDesktop from "./PostCardDesktop";
import UploadPost from "../app/upload/post/page.jsx"; // 1. IMPORT THE UPLOAD COMPONENT
import { Plus, Camera, X } from "lucide-react"; // Added X for close button

export default function HomeFeedDesktop({ onCreateClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false); // <--- 2. ADD MODAL STATE

  // 3. DEFINE FETCH FUNCTION (Reusable)
  async function fetchPosts() {
    try {
      const res = await fetch("https://snap-trek-fullstack.onrender.com/api/postfeed");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }

  // Load on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="w-full h-full overflow-y-auto no-scrollbar relative">

      {/* Mobile sticky header */}
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

          {/* UPDATE: Button now opens local modal */}
          <button
            onClick={() => setIsUploadOpen(true)} 
            className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 active:scale-90 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 pb-24 md:pb-10">

        {/* Stories (Mobile) */}
        <div className="md:hidden mb-8 flex items-center gap-4">
          <button 
             onClick={() => setIsUploadOpen(true)} // <-- Update trigger
             className="w-16 h-16 rounded-full border-2 border-dashed border-teal-500/50 flex items-center justify-center text-teal-500 bg-teal-500/10 shrink-0"
          >
            <Plus className="w-6 h-6" />
          </button>

          <div className="flex-1 overflow-x-auto no-scrollbar">
            <StoriesBar mobile />
          </div>
        </div>

        {/* Stories (Desktop) */}
        <div className="hidden md:block mb-10">
          <div className="glass-panel p-4 rounded-2xl">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsUploadOpen(true)} // <-- Update trigger
                className="w-16 h-16 rounded-full border-2 border-dashed border-teal-500/50 flex items-center justify-center text-teal-500 bg-teal-500/10 hover:bg-teal-500/20 transition-colors shrink-0"
              >
                <Plus className="w-6 h-6" />
              </button>
              <StoriesBar />
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-8">
          {loading && (
            <div className="text-white text-center py-10 opacity-60">
              Loading posts...
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-white text-center py-10 opacity-60">
              No posts yet. Be the first to upload!
            </div>
          )}

          {!loading &&
            posts.map((p) => (
              <PostCardDesktop key={p.id || p._id} post={p} />
            ))
          }
        </div>
      </div>

      {/* 4. ADD THE UPLOAD MODAL OVERLAY */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg">
            
            {/* Close Button */}
            <button 
                onClick={() => setIsUploadOpen(false)}
                className="absolute top-4 right-4 z-[60] text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            >
                <X size={20} />
            </button>

            {/* The Upload Component */}
            <UploadPost 
              onClose={() => setIsUploadOpen(false)} 
              onUploadSuccess={() => {
                fetchPosts(); // <--- REFRESH THE FEED AUTOMATICALLY
                setIsUploadOpen(false); 
              }} 
            />
          </div>
        </div>
      )}

    </main>
  );
}