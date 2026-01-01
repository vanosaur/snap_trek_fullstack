"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, Loader2, Mail, Lock } from "lucide-react";
import Logo from "../../components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
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
      setShowSuccessPopup(true);
      setTimeout(() => {
        router.push("/feed");
      }, 2000);
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-teal-500/30">

      {/* --- ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-blob mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
      </div>

      {/* --- SUCCESS POPUP --- */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 rounded-[2rem] flex flex-col items-center text-center max-w-xs mx-4 border-teal-500/20"
            >
              <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                <CheckCircle className="w-10 h-10 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
              <p className="text-zinc-400 text-sm">Taking you to your feed...</p>
              <div className="w-full h-1 bg-zinc-800 rounded-full mt-6 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
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
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 transition-colors group">
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-3 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold">Back to Home</span>
        </Link>

        <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
          {/* Decor Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent opacity-50" />

          <div className="mb-10 text-center flex flex-col items-center">
            <div className="mb-6">
              <Logo className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Welcome Back</h2>
            <p className="text-zinc-400 text-sm">Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="glass-input w-full h-12 rounded-xl !pl-16 pr-4 text-white placeholder-zinc-500 outline-none transition-all focus:border-neon-teal/50 focus:ring-1 focus:ring-neon-teal/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || showSuccessPopup}
              className="btn-primary w-full mt-4 flex items-center justify-center"
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
                <Link href="/signup" className="text-teal-400 font-bold hover:text-teal-300 transition-colors hover:underline decoration-teal-500/30 underline-offset-4">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}