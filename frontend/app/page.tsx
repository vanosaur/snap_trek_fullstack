'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // For smooth entrance animations

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-black flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* --- BACKGROUND AMBIANCE (Blue Theme) --- */}
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* --- TOP SECTION: ANIMATED MASONRY --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[55%] flex-shrink-0"
        >
          <div className="grid grid-cols-2 gap-3 p-4 pt-8 h-full align-top">
            
            {/* Column 1 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-col gap-3"
            >
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg shadow-black/50 group">
                <Image 
                  src="https://images.unsplash.com/photo-1519681393798-2f929251a6ad?auto=format&fit=crop&w=600&q=80" 
                  alt="Snowy Trek" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"/>
              </div>
              <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-lg shadow-black/50 group">
                <Image 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" 
                  alt="Sandy Beach" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
            </motion.div>

            {/* Column 2 (Staggered) */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col gap-3 mt-12"
            >
              <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-lg shadow-black/50 group">
                <Image 
                  src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=600&q=80" 
                  alt="Green Valley" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg shadow-black/50 group">
                <Image 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80" 
                  alt="Forest Adventure" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
            </motion.div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none"></div>
        </motion.div>

        {/* --- BOTTOM SECTION: CONTENT --- */}
        <div className="flex-1 flex flex-col items-center px-8 pb-10 z-10">
          
          {/* Logo Animation */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
            className="mb-6 p-4 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-800/50 shadow-xl"
          >
            <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">📷</span> 
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-400 mb-3 tracking-tight">
              Capture & Explore
            </h1>
            
            <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8 max-w-[280px] mx-auto">
              Embark on new journeys, photograph unforgettable moments, and connect with adventurers.
            </p>

            {/* Pagination Dots (Blue Active Dot) */}
            <div className="flex justify-center space-x-2 mb-8">
              <motion.div 
                animate={{ width: [6, 24, 6] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="h-1.5 bg-blue-500 rounded-full"
              />
              <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="w-full space-y-4 mt-auto"
          >
            <Link href="/signup" className="block w-full group">
              <div className="relative w-full">
                {/* Button Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <button className="relative w-full bg-black border border-blue-500/50 text-white font-bold py-4 rounded-full shadow-2xl group-active:scale-[0.98] transition-transform">
                  Create Account
                </button>
              </div>
            </Link>

            <Link href="/login" className="block w-full">
              <button className="w-full bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md border border-zinc-800 text-zinc-300 font-semibold py-4 rounded-full transition-all active:scale-[0.98]">
                Login
              </button>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}