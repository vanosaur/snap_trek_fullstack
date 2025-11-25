'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, ArrowRight, Compass, MapPin, Users } from "lucide-react";

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-teal-500/30 overflow-x-hidden">

      {/* --- NAVIGATION --- */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto right-0">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">SnapTrek</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Explore</a>
          <a href="#" className="hover:text-white transition-colors">Community</a>
          <a href="#" className="hover:text-white transition-colors">Stories</a>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Login
          </Link>
          <Link href="/signup">
            <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative flex-1 flex flex-col justify-center items-center text-center px-4 pt-32 pb-20">

        {/* Aurora Background Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none animate-blob mix-blend-screen" />
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-4000 mix-blend-screen" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-medium mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-500 mr-2 animate-pulse"></span>
            The #1 Community for Explorers
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Share Your Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
              With the World
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join a global community of adventurers capturing moments that matter.
            Discover hidden gems, share your stories, and inspire others.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white rounded-full font-bold text-lg shadow-lg shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 text-white rounded-full font-bold text-lg backdrop-blur-md transition-all flex items-center justify-center">
              View Gallery
            </button>
          </div>
        </motion.div>

        {/* --- FLOATING CARDS (Visual Interest) --- */}
        {/* --- FLOATING CARDS (Visual Interest) --- */}
        <div className="mt-20 w-full max-w-6xl mx-auto relative flex flex-col gap-8 items-center md:block md:h-[400px]">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative md:absolute left-0 top-10 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 md:rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10"
          >
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80"
              alt="Mountain"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2 text-xs font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Users className="w-3 h-3" /></div>
                <span>@alex_hikes</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative md:absolute left-1/2 top-0 md:-translate-x-1/2 w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-20 hover:scale-105 transition-transform duration-500"
          >
            <Image
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
              alt="Ocean"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-sm font-bold mb-1">Swiss Alps Adventure</p>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <MapPin className="w-3 h-3 text-teal-400" />
                <span>Switzerland</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative md:absolute right-0 top-10 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/10 md:rotate-[6deg] hover:rotate-0 transition-transform duration-500 z-10"
          >
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80"
              alt="Lake"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2 text-xs font-medium">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Compass className="w-3 h-3" /></div>
                <span>@sarah_travels</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-zinc-600 text-sm relative z-10">
        <p>© 2024 SnapTrek Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}