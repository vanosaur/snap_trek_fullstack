"use client";

import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { useState } from "react";

export default function PostCardDesktop({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="bg-[#0f0f10] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      {/* header */}
      <div className="flex items-center gap-3 px-2 py-3">
        <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">{post.user}</div>
          <div className="text-xs text-gray-400">{post.location}</div>
        </div>
        <button className="text-gray-400 p-2 hover:text-white">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6v.01M12 12v.01M12 18v.01" /></svg>
        </button>
      </div>

      {/* image (full width, square) */}
      <div className="w-full bg-gray-900">
        <div className="relative w-full aspect-square">
          <img src={post.image} alt={post.location} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* actions */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => setLiked(!liked)} className="p-2 rounded-md hover:bg-white/5 transition">
            <Heart className={`w-6 h-6 ${liked ? "text-pink-500" : "text-white"}`} />
          </button>
          <button className="p-2 rounded-md hover:bg-white/5 transition">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 rounded-md hover:bg-white/5 transition">
            <Send className="w-6 h-6 text-white" />
          </button>

          <div className="ml-auto">
            <button onClick={() => setSaved(!saved)} className="p-2 rounded-md hover:bg-white/5 transition">
              <Bookmark className={`w-6 h-6 ${saved ? "text-white fill-current" : "text-white"}`} />
            </button>
          </div>
        </div>

        <p className="font-semibold text-sm mt-3">{liked ? post.likes + 1 : post.likes} likes</p>

        <p className="text-sm mt-2">
          <span className="font-semibold mr-2">{typeof post.user === "string" ? post.user.split(" ")[0] : ""}</span>
          {post.caption}
        </p>

        <p className="text-xs text-gray-400 mt-2">{post.time}</p>
      </div>
    </article>
  );
}
