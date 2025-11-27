"use client";

import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { useState } from "react";

export default function PostCardDesktop({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  /* -------------------------------
     Fix fields coming from backend
  --------------------------------*/

  // user info
  const username = post.author?.name || "Unknown User";

  // avatar fallback
  const avatar = post.author?.avatar || "/avatar-default.png";

  // image from backend
  const imageUrl = post.imageUrl;

  // caption
  const caption = post.caption || "";

  // location
  const location = post.location || "Unknown location";

  // likes (backend doesn't support likes yet, so mock it)
  const likes = post.likes || 0;

  // time from createdAt
  const time = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <article className="bg-[#0f0f10] border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-2 py-3">
        <img
          src={avatar}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">{username}</div>
          <div className="text-xs text-gray-400">{location}</div>
        </div>
        <button className="text-gray-400 p-2 hover:text-white">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 6v.01M12 12v.01M12 18v.01" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="w-full bg-gray-900">
        <div className="relative w-full aspect-square">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 rounded-md hover:bg-white/5 transition"
          >
            <Heart
              className={`w-6 h-6 ${
                liked ? "text-pink-500 fill-pink-500" : "text-white"
              }`}
            />
          </button>

          <button className="p-2 rounded-md hover:bg-white/5 transition">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>

          <button className="p-2 rounded-md hover:bg-white/5 transition">
            <Send className="w-6 h-6 text-white" />
          </button>

          <div className="ml-auto">
            <button
              onClick={() => setSaved(!saved)}
              className="p-2 rounded-md hover:bg-white/5 transition"
            >
              <Bookmark
                className={`w-6 h-6 ${
                  saved ? "text-white fill-white" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mt-3">
          {liked ? likes + 1 : likes} likes
        </p>

        {/* Caption */}
        <p className="text-sm mt-2">
          <span className="font-semibold mr-2">
            {username.split(" ")[0]}
          </span>
          {caption}
        </p>

        {/* Time */}
        <p className="text-xs text-gray-400 mt-2">{time}</p>
      </div>
    </article>
  );
}
