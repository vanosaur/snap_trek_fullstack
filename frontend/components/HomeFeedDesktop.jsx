"use client";

import { useState, useEffect } from "react";
import StoriesBar from "./StoriesBar";
import PostCardDesktop from "./PostCardDesktop";
import UploadPost from "./UploadPost"; // Ensure this import matches the new file location
import { Plus, Camera, X } from "lucide-react"; // Added X for close button

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
  const [posts, setPosts] = useState(DUMMY_POSTS); // Initialize with dummy data
  const [loading, setLoading] = useState(false); // No loading state needed for mock
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Define fetch function if we want to mix real data later, but for now use Mock
  async function fetchPosts() {
     // Optional: Check backend, if empty keep dummy
     try {
       /* 
       const res = await fetch("https://snap-trek-fullstack.onrender.com/api/postfeed");
       const data = await res.json();
       if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
       }
       */
     } catch (err) {
       console.error(err);
     }
  }

  useEffect(() => {
    // fetchPosts(); 
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

          <button
            onClick={() => setIsUploadOpen(true)} 
            className="w-9 h-9 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 active:scale-90 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 pb-24 md:pb-10">

        {/* Stories Section (Unified for Mobile & Desktop) */}
        <div className="mb-8">
           <StoriesBar />
        </div>

        {/* Posts Section */}
        <div className="space-y-8">
          {posts.map((p) => (
             <PostCardDesktop key={p.id} post={p} />
          ))}
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