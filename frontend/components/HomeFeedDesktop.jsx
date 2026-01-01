"use client";

import { useState, useEffect } from "react";
import StoriesBar from "./StoriesBar";
import PostCardDesktop from "./PostCardDesktop";
import UploadPost from "./UploadPost"; // Ensure this import matches the new file location
import { Plus, Camera, X } from "lucide-react"; 
import api from "../utils/api";
import Logo from "./Logo";

// --- Dummy Data ---
const DUMMY_POSTS = [
  {
    id: "1",
    author: { name: "Vani", avatar: "https://i.pravatar.cc/150?u=vani" },
    location: "Paris, France",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    caption: "Sunset in Paris! 🗼✨ #travel #france",
    likes: 124,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    author: { name: "AlexR", avatar: "https://i.pravatar.cc/150?u=alex" },
    location: "Kyoto, Japan",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    caption: "The bamboo forest is magical. 🎍",
    likes: 89,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    author: { name: "TravelBug", avatar: "https://i.pravatar.cc/150?u=bug" },
    location: "Santorini, Greece",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4c79e42d0?auto=format&fit=crop&w=800&q=80",
    caption: "Blue domes and white walls. 🇬🇷💙",
    likes: 256,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "4",
    author: { name: "PhotoJane", avatar: "https://i.pravatar.cc/150?u=jane" },
    location: "New York City, USA",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    caption: "Concrete jungle where dreams are made of. 🗽",
    likes: 543,
    createdAt: new Date(Date.now() - 10000000).toISOString(),
  },
];

export default function HomeFeedDesktop({ onCreateClick }) {
  const [posts, setPosts] = useState([]); // Start with empty, fetch from backend
  const [loading, setLoading] = useState(true); // Loading state
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Define fetch function if we want to mix real data later, but for now use Mock
  async function fetchPosts() {
     setLoading(true);
     try {
        const res = await api.get("/posts");
        if (Array.isArray(res.data)) {
           setPosts(res.data);
        }
     } catch (err) {
        console.error("Error fetching posts:", err);
     } finally {
        setLoading(false);
     }
  }

  useEffect(() => {
    fetchPosts(); 
  }, []);

  return (
    <main className="w-full h-full overflow-y-auto no-scrollbar relative">

      {/* Mobile sticky header (Glass + Neon) */}
      <div className="md:hidden sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-9 h-9" mobile />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 tracking-tight">
              SnapTrek
            </h1>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)} 
            className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 active:scale-90 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 pt-6 pb-24 md:pb-10 max-w-2xl mx-auto">

        {/* Stories Section (Unified for Mobile & Desktop) */}
        <div className="mb-8">
           <StoriesBar />
        </div>

        {/* Posts Section */}
        <div className="space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
              <p className="text-gray-400">Loading your feed...</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((p) => (
               <PostCardDesktop key={p.id} post={p} />
            ))
          ) : (
            <div className="text-center py-20 glass-panel border-white/5 p-10 rounded-3xl">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">No Posts Yet</h3>
              <p className="text-gray-400 mt-2">Be the first to share your adventure!</p>
            </div>
          )}
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