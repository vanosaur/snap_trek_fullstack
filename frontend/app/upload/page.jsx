"use client";

import { ImagePlus, Film } from "lucide-react";

export default function UploadOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">

        <h1 className="text-3xl font-semibold mb-6">Create</h1>

        <div className="flex flex-col gap-4">

          {/* Upload Photo Post */}
          <a
            href="/upload/post"
            className="group w-full bg-blue-600/80 hover:bg-blue-600 p-4 rounded-xl flex items-center justify-center gap-3 transition-all border border-white/20 hover:border-blue-300 hover:scale-[1.02]"
          >
            <ImagePlus className="w-5 h-5 opacity-90 group-hover:opacity-100" />
            <span className="font-medium">Upload Photo Post</span>
          </a>

          {/* Upload Travel Reel */}
          <a
            href="/upload/reel"
            className="group w-full bg-purple-600/80 hover:bg-purple-700 p-4 rounded-xl flex items-center justify-center gap-3 transition-all border border-white/20 hover:border-purple-300 hover:scale-[1.02]"
          >
            <Film className="w-5 h-5 opacity-90 group-hover:opacity-100" />
            <span className="font-medium">Upload Travel Reel</span>
          </a>

        </div>
      </div>
    </div>
  );
}
