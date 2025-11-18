"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api"; 
import Link from "next/link"; 
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for the popup

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  
  // ✨ New State: Controls the Welcome Popup visibility
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      
      // ✅ Step 1: Show the Popup instead of Alert
      setShowSuccessPopup(true);

      // ✅ Step 2: Wait 2 seconds, then go to Feed
      setTimeout(() => {
        router.push("/feed"); // Changed from /dashboard to /feed
      }, 2000);

    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
      setLoading(false); // Only stop loading if it fails
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- Background Ambiance --- */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- SUCCESS POPUP OVERLAY --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-xs mx-4"
            >
              {/* Checkmark Icon */}
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
              <p className="text-zinc-400 text-sm">Taking you to your feed...</p>
              
              {/* Loading Bar Animation */}
              <div className="w-full h-1 bg-zinc-800 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-blue-500"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MAIN LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back</h2>
            <p className="text-zinc-400 text-sm">Enter your credentials to access your feed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="adventure@snaptrek.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || showSuccessPopup} // Disable if loading OR if popup is showing
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading && !showSuccessPopup ? (
                <span className="flex items-center justify-center">
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Logging in...
                </span>
              ) : "Login"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-zinc-500 text-sm">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-400 font-semibold hover:underline decoration-blue-500 hover:text-blue-300 transition-colors">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}