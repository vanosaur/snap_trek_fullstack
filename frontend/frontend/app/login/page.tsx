"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, Loader2, Mail, Lock } from "lucide-react";

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
        router.push("/feed");
      }, 2000);

    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-blue-500/30">

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
      </div>

      {/* --- SUCCESS POPUP OVERLAY --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center max-w-xs mx-4 border-green-500/20"
            >
              {/* Checkmark Icon */}
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <CheckCircle className="w-8 h-8 text-green-400" />
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center mr-3 group-hover:bg-zinc-800 transition-colors border border-zinc-800">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="glass-panel rounded-3xl p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Welcome Back</h2>
            <p className="text-zinc-400 text-sm">Enter your credentials to access your feed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="adventure@snaptrek.com"
                  value={form.email}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || showSuccessPopup}
              className="glass-button w-full font-bold py-4 rounded-xl mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading && !showSuccessPopup ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Logging in...
                </>
              ) : "Login"}
            </button>

            <div className="mt-8 text-center">
              <p className="text-zinc-500 text-sm">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors hover:underline decoration-blue-500/30 underline-offset-4">
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