// frontend/components/PostCard.jsx
"use client";

import { useState } from "react";

function IconHeart({ filled }) {
  return (
    <svg
      className={`w-6 h-6 ${filled ? "text-red-500" : "text-gray-700"}`}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function IconComment() {
  return (
    <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}

function IconBookmark() {
  return (
    <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked((v) => !v);

  return (
    <article className="bg-white border rounded-sm">
      {/* header */}
      <div className="flex items-center gap-3 px-3 py-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">{post.username}</div>
              <div className="text-xs text-gray-500">{post.location}</div>
            </div>
            <div className="text-xs text-gray-400">•••</div>
          </div>
        </div>
      </div>

      {/* image */}
      <div className="w-full h-[420px] md:h-[520px] bg-gray-100">
        <img
          src={post.image}
          alt={post.caption || post.location}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* actions */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-4">
          <button aria-label="like" onClick={toggleLike} className="transform active:scale-95">
            <IconHeart filled={liked} />
          </button>
          <button aria-label="comment" className="transform active:scale-95">
            <IconComment />
          </button>
          <button aria-label="share" className="transform active:scale-95">
            <IconShare />
          </button>
        </div>

        <button aria-label="bookmark" className="transform active:scale-95">
          <IconBookmark />
        </button>
      </div>

      {/* likes + caption */}
      <div className="px-3 pb-3">
        <div className="text-sm font-semibold">{liked ? (post.likes ?? 0) + 1 : post.likes ?? 0} likes</div>
        <div className="mt-1 text-sm">
          <span className="font-semibold mr-2">{post.username}</span>
          <span className="text-gray-700">{post.caption}</span>
        </div>
      </div>
    </article>
  );
}
