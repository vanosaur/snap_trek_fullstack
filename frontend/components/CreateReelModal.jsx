"use client";

import { useState } from "react";
import { X, Video, MapPin, Sparkles, Loader2, Send, IndianRupee, Clock } from "lucide-react";
import api from "../utils/api";

export default function CreateReelModal({ isOpen, onClose, onUploadSuccess }) {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    video_url: "",
    image_url: "",
    price: "",
    duration: "5 Days",
    highlights: [],
    itinerary_days: [],
    stay: { type: "", description: "" }
  });

  if (!isOpen) return null;

  const handleAiGenerate = async () => {
    if (!formData.place) {
      alert("Please enter a location first (e.g., 'Bali' or 'Manali')");
      return;
    }

    setAiLoading(true);
    try {
      const res = await api.post("/ai/generate-itinerary", { 
        location: formData.place,
        theme: formData.title || "Adventure"
      });
      
      const data = res.data;
      setFormData(prev => ({
        ...prev,
        title: prev.title || data.title,
        price: data.price,
        duration: data.duration,
        highlights: data.highlights,
        itinerary_days: data.itinerary_days,
        stay: data.stay
      }));
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("AI Generation failed. You can still fill the details manually.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.video_url || !formData.image_url || !formData.place) {
      alert("Please fill in the required fields (Video, Image, Location)");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reels", formData);
      alert("Reel created successfully!");
      if (onUploadSuccess) onUploadSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create reel:", error);
      alert("Failed to create reel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Video className="text-teal-400" size={24} />
                    Create New Reel
                </h2>
                <p className="text-xs text-zinc-500 mt-1">Share your adventure with the SnapTrek community</p>
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
                <X size={24} />
            </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/40">
            
            {/* Essential Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 ml-1">VIDEO URL</label>
                    <input 
                        type="url" 
                        placeholder="https://cloudinary.com/video..."
                        value={formData.video_url}
                        onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-zinc-700 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-sm"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 ml-1">THUMBNAIL URL</label>
                    <input 
                        type="url" 
                        placeholder="https://cloudinary.com/image..."
                        value={formData.image_url}
                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-zinc-700 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-sm"
                        required
                    />
                </div>
            </div>

            {/* Title & Location with AI Action */}
            <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-xs font-bold text-teal-400 ml-1 flex items-center gap-1">
                            <MapPin size={12} /> DESTINATION
                        </label>
                        <input 
                            type="text" 
                            placeholder="Where is this? (e.g. Bali, Indonesia)"
                            value={formData.place}
                            onChange={(e) => setFormData({...formData, place: e.target.value})}
                            className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-zinc-700 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-sm"
                            required
                        />
                    </div>
                    <button 
                        type="button"
                        onClick={handleAiGenerate}
                        disabled={aiLoading || !formData.place}
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-purple-500/20"
                    >
                        {aiLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        {aiLoading ? "Thinking..." : "AI Plan"}
                    </button>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 ml-1 uppercase">Trip Title</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Magical 5 Days in Bali"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="glass-input w-full px-4 py-3 rounded-xl text-white placeholder-zinc-700 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            {/* Generated Details or Loading Skeletons */}
            {(formData.itinerary_days.length > 0 || aiLoading) && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                    {aiLoading ? (
                        /* AI Loading Skeletons */
                        <div className="space-y-4 animate-pulse">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-white/5 rounded-xl" />
                                <div className="h-12 bg-white/5 rounded-xl" />
                            </div>
                            <div className="h-20 bg-white/5 rounded-xl" />
                            <div className="space-y-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-14 bg-white/5 rounded-xl" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Actual AI Data */
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-400 ml-1 flex items-center gap-1 uppercase">
                                        <IndianRupee size={12} /> Est. Price
                                    </label>
                                    <input 
                                        type="number" 
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        className="glass-input w-full px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-400 ml-1 flex items-center gap-1 uppercase">
                                        <Clock size={12} /> Duration
                                    </label>
                                    <input 
                                        type="text" 
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                        className="glass-input w-full px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-teal-500/50 outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 ml-1 uppercase">Highlights</label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.highlights.map((h, i) => (
                                        <span key={i} className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-[10px] text-teal-400 font-bold">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary Summary */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-zinc-400 ml-1 uppercase">AI Generated Itinerary</label>
                                <div className="space-y-2">
                                    {formData.itinerary_days.map((day, i) => (
                                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-xs font-black text-black">
                                                {day.day}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h5 className="text-sm font-bold text-white truncate">{day.title}</h5>
                                                <p className="text-[10px] text-zinc-500 truncate">{day.activities?.join(", ")}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Submit */}
            <div className="pt-4 sticky bottom-0 bg-gradient-to-t from-black via-black to-transparent pb-2">
                <button 
                    type="submit" 
                    disabled={loading || aiLoading}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
                    {loading ? "CREATING TREK..." : "PUBLISH REEL"}
                </button>
            </div>

        </form>
      </div>
    </div>
  );
}
