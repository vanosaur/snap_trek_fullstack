"use client";

import { useState, useEffect } from "react";
import { Trash2, User, MapPin, Grid } from "lucide-react";

// Change this to your live URL if deploying, or keep localhost for testing
const API_BASE_URL = "https://snap-trek-fullstack.onrender.com"; 

// TEMPORARY: using ID 1 until you have full login persistence
const CURRENT_USER_ID = 1; 

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Profile Data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/${CURRENT_USER_ID}`);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // 2. Handle Post Deletion
  async function handleDelete(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the deleted post from the screen immediately
        setProfile((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p.id !== postId),
        }));
      } else {
        alert("Could not delete post.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  if (loading) return <div className="text-white/50 text-center mt-20">Loading profile...</div>;
  if (!profile) return <div className="text-white/50 text-center mt-20">User not found.</div>;

  return (
    <div className="w-full h-full pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center pt-10 pb-8 px-4">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-teal-400 to-blue-600 p-[3px] shadow-2xl shadow-teal-500/20 mb-4">
          <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden relative">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-white/20" />
            )}
          </div>
        </div>

        {/* Name & Username */}
        <h2 className="text-2xl font-bold text-white">{profile.name || "SnapTrek User"}</h2>
        <p className="text-white/40">@{profile.username || "user" + profile.id}</p>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-6 p-4 glass-panel rounded-2xl border border-white/5 bg-white/5">
          <div className="text-center">
            <span className="block font-bold text-xl text-white">{profile.posts?.length || 0}</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Posts</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <span className="block font-bold text-xl text-white">0</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Followers</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <span className="block font-bold text-xl text-white">0</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Following</span>
          </div>
        </div>
      </div>

      {/* --- GRID HEADER --- */}
      <div className="border-t border-white/10 mt-2">
        <div className="flex justify-center gap-2 py-4 border-t border-white text-xs font-bold tracking-widest uppercase">
            <Grid size={16} />
            <span>Posts</span>
        </div>
      </div>

      {/* --- POSTS GRID --- */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-4">
        {profile.posts.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-white/30">
                No posts yet. Upload one!
            </div>
        ) : (
            profile.posts.map((post) => (
            <div key={post.id} className="relative aspect-square group bg-zinc-900 rounded-sm md:rounded-xl overflow-hidden cursor-pointer">
                {/* Image */}
                <img 
                  src={post.imageUrl} 
                  alt="Post" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(post.id);
                        }}
                        className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110"
                        title="Delete Post"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
}