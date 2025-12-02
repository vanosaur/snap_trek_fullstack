"use client";

import { useState } from "react";
import { ImagePlus, Loader2, CheckCircle } from "lucide-react";

export default function UploadPost({ onUploadSuccess, onClose }) {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // States: 'idle' | 'uploading' | 'success'
  const [status, setStatus] = useState("idle"); 

async function uploadToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    
    // 1. YOUR REAL UPLOAD PRESET (From screenshot)
    data.append("upload_preset", "snap-trek-fullstack"); 

    const res = await fetch(
      // 2. YOUR REAL CLOUD NAME (From screenshot)
      `https://api.cloudinary.com/v1_1/dgynhfgjw/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  }

  const handleImageSelect = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setStatus("uploading");

    try {
      // 1. Upload Image
      const imageUrl = await uploadToCloudinary(image);

      // 2. Save Post to DB
      const res = await fetch(
        "https://snap-trek-fullstack.onrender.com/api/post-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caption,
            location,
            imageUrl,
            authorId: 1, 
          }),
        }
      );

      if (res.ok) {
        // 3. SHOW SUCCESS STATE (The "Popup kinda")
        setStatus("success");

        // 4. WAIT 1.5 SECONDS -> THEN GO TO FEED
        setTimeout(() => {
          if (onUploadSuccess) onUploadSuccess(); // Closes modal & refreshes feed
        }, 1500);
      } else {
        setStatus("idle");
        alert("Server error, please try again.");
      }
      
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Upload failed");
    }
  };

  // --- RENDER SUCCESS VIEW ---
  if (status === "success") {
    return (
      <div className="bg-zinc-900 border border-white/10 p-10 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-white">Post Uploaded!</h2>
        <p className="text-white/60 mt-2">Taking you to your feed...</p>
      </div>
    );
  }

  // --- RENDER FORM VIEW ---
  return (
    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
      
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Selection */}
        <label className="border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition group">
          {preview ? (
            <img src={preview} className="w-full h-64 object-cover rounded-lg" alt="Preview" />
          ) : (
            <>
              <ImagePlus className="w-12 h-12 text-white/50 group-hover:text-blue-400 transition" />
              <p className="mt-2 text-white/50 group-hover:text-white transition">Click to upload image</p>
            </>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => handleImageSelect(e.target.files[0])} 
          />
        </label>

        {/* Caption */}
        <input
          className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 focus:border-blue-500 outline-none transition text-white"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* Location */}
        <input
          className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 focus:border-blue-500 outline-none transition text-white"
          placeholder="Add location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Actions */}
        <div className="flex gap-3">
            <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold text-white transition"
            >
                Cancel
            </button>
            <button
                disabled={status === "uploading" || !image}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                {status === "uploading" ? (
                <>
                    <Loader2 className="animate-spin" /> Uploading...
                </>
                ) : (
                "Share Post"
                )}
            </button>
        </div>
      </form>
    </div>
  );
}