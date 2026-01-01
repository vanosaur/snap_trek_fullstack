"use client";

import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, Share2 } from "lucide-react";
import { useState } from "react";

export default function PostCardDesktop({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  /* -------------------------------
     Fix fields coming from backend
  --------------------------------*/
  const username = post.author?.name || "Unknown User";
  const userHandle = post.author?.username || username.replace(/\s+/g, '').toLowerCase(); 
  const avatar = post.author?.avatar || "/avatar-default.png";
  const imageUrl = post.imageUrl;
  const caption = post.caption || "";
  const location = post.location || "Unknown location";
  
  // Format Time
  const date = new Date(post.createdAt);
  const timeAgo = (() => {
      const seconds = Math.floor((new Date() - date) / 1000);
      let interval = seconds / 31536000;
      if (interval > 1) return Math.floor(interval) + "y ago";
      interval = seconds / 2592000;
      if (interval > 1) return Math.floor(interval) + "mo ago";
      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + "d ago";
      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + "h ago";
      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + "m ago";
      return Math.floor(seconds) + "s ago";
  })();

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  return (
    <article className="glass-card mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="w-12 h-12 p-[2px] rounded-full bg-gradient-to-tr from-teal-400 to-purple-600">
            <img
            src={avatar}
            alt={username}
            className="w-full h-full rounded-full object-cover border-2 border-black"
            />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
             <div className="text-base font-bold text-white truncate">{username}</div>
             <div className="text-xs text-zinc-500 font-medium">@{userHandle}</div>
             <div className="w-1 h-1 bg-zinc-600 rounded-full" />
             <div className="text-xs text-zinc-500">{timeAgo}</div>
          </div>
          <div className="text-xs text-teal-400 font-medium flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {location}
          </div>
        </div>
        <button className="text-zinc-400 p-2 hover:text-white hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="w-full bg-black/50 relative group">
        <div className="relative w-full aspect-square overflow-hidden bg-zinc-900 border-y border-white/5">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Heart overlay on like (optional, implementing simple overlay for now) */}
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${liked ? "opacity-0" : "opacity-0"}`}>
             <Heart size={80} className="text-white fill-white drop-shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={handleLike}
                    className="p-2.5 rounded-full hover:bg-white/10 transition-all active:scale-90 group"
                >
                    <Heart
                    className={`w-7 h-7 transition-colors duration-300 ${
                        liked ? "text-pink-500 fill-pink-500" : "text-white group-hover:text-pink-400"
                    }`}
                    />
                </button>

                <button className="p-2.5 rounded-full hover:bg-white/10 transition-all active:scale-90 group">
                    <MessageCircle className="w-7 h-7 text-white group-hover:text-teal-400 transition-colors" />
                </button>

                <button className="p-2.5 rounded-full hover:bg-white/10 transition-all active:scale-90 group">
                    <Send className="w-7 h-7 text-white group-hover:text-blue-400 transition-colors -rotate-45 translate-x-0.5" />
                </button>
            </div>

            <button
                onClick={() => setSaved(!saved)}
                className="p-2.5 rounded-full hover:bg-white/10 transition-all active:scale-90 group"
            >
                <Bookmark
                className={`w-7 h-7 transition-colors duration-300 ${
                    saved ? "text-yellow-400 fill-yellow-400" : "text-white group-hover:text-yellow-300"
                }`}
                />
            </button>
        </div>

        {/* Likes Count */}
        <div className="font-bold text-white text-sm mb-2 px-1">
           {likesCount.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="text-sm text-zinc-300 px-1 leading-relaxed">
          <span className="font-bold text-white mr-2 hover:underline cursor-pointer">
            {username}
          </span>
          {caption}
        </div>

        {/* View Comments */}
        <button className="text-zinc-500 text-sm mt-2 px-1 hover:text-zinc-300 transition-colors">
            View all comments
        </button>
        
        {/* Add Comment */}
        <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
             <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-[1px]">
                 <div className="w-full h-full rounded-full bg-black" />
             </div>
             <input 
                type="text" 
                placeholder="Add a comment..." 
                className="bg-transparent text-sm w-full focus:outline-none text-white placeholder:text-zinc-600"
             />
             <button className="text-teal-400 text-sm font-bold opacity-0 hover:opacity-100 transition-opacity">Post</button>
        </div>
      </div>
    </article>
  );
}
