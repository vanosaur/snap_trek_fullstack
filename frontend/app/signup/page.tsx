"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowLeft, Loader2, Mail, Lock, User } from "lucide-react";

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

      console.log("Signup Error Debug:", errorMsg);

      if (
        status === 409 ||
        errorLower.includes("exist") ||
        errorLower.includes("taken") ||
        errorLower.includes("duplicate") ||
        errorLower.includes("registered")
      ) {
        setShowExistsPopup(true);

        // Automatically redirect after 2.5 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2500);

        setLoading(false);
        return;
      }

      // Normal Error
      alert(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-blue-500/30">

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      {/* --- 1. SUCCESS POPUP --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center max-w-xs mx-4 border-green-500/20"
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
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center max-w-xs mx-4 border-blue-500/20"
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
        <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center mr-3 group-hover:bg-zinc-800 transition-colors border border-zinc-800">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="glass-panel rounded-3xl p-8 sm:p-10">

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Join SnapTrek</h2>
            <p className="text-zinc-400 text-sm">Start your adventure today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-400 ml-1 uppercase tracking-wider">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Trekker"
                  value={form.name}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 outline-none"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-zinc-600 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || showSuccessPopup || showExistsPopup}
              className="glass-button w-full font-bold py-4 rounded-xl mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
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
                <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors hover:underline decoration-blue-500/30 underline-offset-4">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}