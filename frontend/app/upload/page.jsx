"use client";

import { ImagePlus, Film, Camera, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UploadOptions() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
            <Link href="/feed" className="p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </Link>
            <div className="flex flex-col items-end">
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Studio</span>
                <span className="text-white font-black italic tracking-tighter">SnapTrek</span>
            </div>
        </div>

        <div className="backdrop-blur-3xl bg-white/[0.03] border border-white/10 p-10 rounded-[40px] shadow-2xl text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-teal-500/20 mx-auto mb-6 transform -rotate-6">
              <Camera className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl font-black mb-2 tracking-tight">Create</h1>
            <p className="text-zinc-500 mb-10 text-sm">Choose what to share with your fellow trekkers</p>

            <div className="flex flex-col gap-4">
                {/* Upload Photo Post */}
                <Link
                    href="/upload/post"
                    className="group relative w-full overflow-hidden p-6 rounded-3xl bg-white/[0.05] border border-white/10 hover:border-teal-500/50 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-3 bg-teal-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <ImagePlus className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-white">Photo Post</span>
                        <span className="block text-xs text-zinc-500">Capture a static moment</span>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto text-zinc-600 group-hover:text-teal-400 transition-colors" />
                </Link>

                {/* Upload Travel Reel */}
                <Link
                    href="/upload/reel"
                    className="group relative w-full overflow-hidden p-6 rounded-3xl bg-white/[0.05] border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <Film className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-white">Travel Reel</span>
                        <span className="block text-xs text-zinc-500">Share a dynamic story</span>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto text-zinc-600 group-hover:text-blue-400 transition-colors" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
    );
}

