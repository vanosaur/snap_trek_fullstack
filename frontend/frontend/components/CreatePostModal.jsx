"use client";

import { useState } from "react";
import { X, Image as ImageIcon, MapPin, Send, Loader2 } from "lucide-react";
import axios from "axios";

export default function CreatePostModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    caption: "",
    location: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image || !formData.caption) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to create a post");
        return;
      }

      await axios.post("http://localhost:8080/api/posts", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Reset and close
      setFormData({ image: "", caption: "", location: "" });
      onClose();
      // Ideally trigger a feed refresh here, but for now we'll just close
      window.location.reload(); // Simple way to refresh feed
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Create New Post</h2>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
                <X size={20} />
            </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Image Input */}
            <div className="space-y-2">
                <div className="relative group">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                    <input 
                        type="url" 
                        placeholder="Image URL (https://...)"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm"
                        required
                        autoFocus
                    />
                </div>
            </div>

            {/* Preview */}
            {formData.image && (
                <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 bg-black/20 relative">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                </div>
            )}

            {/* Caption */}
            <div className="space-y-2">
                <textarea 
                    placeholder="Write a caption..." 
                    value={formData.caption}
                    onChange={(e) => setFormData({...formData, caption: e.target.value})}
                    className="glass-input w-full p-4 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all min-h-[100px] resize-none text-sm"
                    required
                />
            </div>

            {/* Location */}
            <div className="space-y-2">
                <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-teal-400 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Location (Optional)"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="glass-input w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Submit */}
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {loading ? "Sharing..." : "Share Post"}
            </button>

        </form>
      </div>
    </div>
  );
}
