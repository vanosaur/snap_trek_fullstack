"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowLeft, Loader2, Mail, Lock, User } from "lucide-react";
import Logo from "../../components/Logo";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Popups
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showExistsPopup, setShowExistsPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);

      // Success Flow
      setShowSuccessPopup(true);
      setTimeout(() => {
        router.push("/feed");
      }, 2000);

    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Signup failed";
      const status = err.response?.status;
      const errorLower = errorMsg.toLowerCase();

      if (
        status === 409 ||
        errorLower.includes("exist") ||
        errorLower.includes("taken") ||
        errorLower.includes("duplicate") ||
        errorLower.includes("registered")
      ) {
        setShowExistsPopup(true);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
        setLoading(false);
        return;
      }

      alert(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-teal-500/30">

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      {/* --- 1. SUCCESS POPUP --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 rounded-[2rem] flex flex-col items-center text-center max-w-xs mx-4 border-green-500/20"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Account Created!</h3>
              <p className="text-zinc-400 text-sm">Redirecting to feed...</p>
              <div className="w-full h-1 bg-zinc-800 rounded-full mt-6 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5 }} className="h-full bg-green-500" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 2. ALREADY EXISTS POPUP --- */}
      <AnimatePresence>
        {showExistsPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 rounded-[2rem] flex flex-col items-center text-center max-w-xs mx-4 border-blue-500/20"
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <AlertCircle className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Account Exists</h3>
              <p className="text-zinc-400 text-sm">This email is already registered.</p>
              <p className="text-blue-400 text-xs mt-2 animate-pulse">Redirecting to Login...</p>

              <div className="w-full h-1 bg-zinc-800 rounded-full mt-6 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.0 }} className="h-full bg-blue-500" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MAIN SIGNUP FORM --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 transition-colors group">
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
          {/* Decor Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

          <div className="mb-8 text-center flex flex-col items-center">
            <div className="mb-6">
              <Logo className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Join SnapTrek</h2>
            <p className="text-zinc-400 text-sm">Start your adventure today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Trekker"
                  value={form.name}
                  onChange={handleChange}
                  className="glass-input w-full h-12 rounded-xl !pl-16 pr-4 text-white placeholder-zinc-500 outline-none transition-all focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@snaptrek.com"
                  value={form.email}
                  onChange={handleChange}
                  className="glass-input w-full h-12 rounded-xl !pl-16 pr-4 text-white placeholder-zinc-500 outline-none transition-all focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-teal-400 transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="glass-input w-full h-12 rounded-xl !pl-16 pr-4 text-white placeholder-zinc-500 outline-none transition-all focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || showSuccessPopup || showExistsPopup}
              className="btn-primary w-full mt-4 flex items-center justify-center"
            >
              {loading && !showSuccessPopup && !showExistsPopup ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Checking...
                </>
              ) : "Create Account"}
            </button>

            <div className="mt-8 text-center">
              <p className="text-zinc-500 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-teal-400 font-bold hover:text-teal-300 transition-colors hover:underline decoration-teal-500/30 underline-offset-4">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}