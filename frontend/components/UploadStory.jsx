"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Loader2, CheckCircle, X, Image as ImageIcon, Sparkles } from "lucide-react";
import api from "../utils/api";

export default function UploadStory({ onUploadSuccess, onClose }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function uploadToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "snap-trek-fullstack");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dgynhfgjw/image/upload`,
      { method: "POST", body: data }
    );
    const result = await res.json();
    return result.secure_url;
  }

  const handleImageSelect = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setStatus("uploading");

    try {
      const imageUrl = await uploadToCloudinary(image);

      const res = await api.post("/stories", {
        imageUrl,
      });

      if (res.status === 201) {
        setStatus("success");
        setTimeout(() => {
          if (onUploadSuccess) onUploadSuccess();
          if (onClose) onClose();
        }, 1500);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Error uploading story");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-md backdrop-blur-3xl bg-white/[0.05] border border-white/10 p-12 rounded-[40px] shadow-2xl text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-teal-500/20">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Story Live!</h2>
        <p className="text-gray-400">Your adventure is now shared with the world.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md backdrop-blur-3xl bg-white/[0.03] border border-white/10 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-20 w-60 h-60 bg-teal-500/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-24 -right-20 w-60 h-60 bg-blue-600/10 rounded-full blur-[80px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Add to Story</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div 
            onClick={() => fileInputRef.current.click()}
            className="group relative aspect-[9/16] w-full max-w-[280px] mx-auto rounded-[32px] overflow-hidden cursor-pointer bg-white/[0.02] border-2 border-dashed border-white/10 hover:border-teal-500/50 transition-all duration-500 ease-out hover:scale-[1.02]"
          >
            {preview ? (
              <img src={preview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-teal-400 transition-colors duration-300">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                  <Camera className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium">Capture the moment</span>
                <span className="text-xs opacity-50 mt-1">Tap to select media</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleImageSelect(e.target.files[0])} 
            />
          </div>

          <div className="flex gap-4">
            {onClose && (
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 py-4 px-6 rounded-2xl bg-white/[0.05] border border-white/5 text-white font-semibold hover:bg-white/[0.08] transition-all"
              >
                Discard
              </button>
            )}
            <button 
              disabled={!image || status === "uploading"} 
              className="flex-[2] relative group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-xl shadow-teal-500/20"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                {status === "uploading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sharing...</span>
                  </>
                ) : (
                  <span>Share with Friends</span>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}