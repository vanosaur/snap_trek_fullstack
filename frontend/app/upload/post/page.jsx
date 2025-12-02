"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for redirection
import { ImagePlus, Loader2, CheckCircle } from "lucide-react";

export default function UploadPostPage({ onUploadSuccess, onClose }) {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  
  // Status: 'idle' | 'uploading' | 'success'
  const [status, setStatus] = useState("idle"); 
  const router = useRouter();

  async function uploadToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    
    // ✅ 1. FIXED: Your Real Preset
    data.append("upload_preset", "snap-trek-fullstack"); 

    const res = await fetch(
      // ✅ 2. FIXED: Your Real Cloud Name
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
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(image);

      // 2. Save to Backend
      const res = await fetch(
        "https://snap-trek-fullstack.onrender.com/api/post-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caption,
            location,
            imageUrl,
            authorId: 1, // Ideally replace this with real user ID later
          }),
        }
      );

      if (res.ok) {
        // ✅ 3. Show Success View
        setStatus("success");

        // ✅ 4. Redirect after 1.5 seconds
        setTimeout(() => {
          // If this is used as a Modal (prop exists)
          if (onUploadSuccess) {
            onUploadSuccess();
            if (onClose) onClose();
          } 
          // If this is used as a Page (no prop), redirect to home
          else {
            router.push("/feed"); // Adjust this path if your feed is at /feed
          }
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
      <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center px-4">
        <div className="bg-zinc-900 border border-white/10 p-10 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-white">Post Uploaded!</h2>
          <p className="text-white/60 mt-2">Taking you to the feed...</p>
        </div>
      </div>
    );
  }

  // --- RENDER FORM VIEW ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Upload Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
           
           {/* Image Input */}
           <label className="border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition group">
             {preview ? (
               <img src={preview} className="w-full h-64 object-cover rounded-lg" />
             ) : (
               <>
                 <ImagePlus className="w-12 h-12 text-white/50 group-hover:text-blue-400 transition" />
                 <p className="mt-2 text-white/50 group-hover:text-white transition">Click to upload or drag an image</p>
               </>
             )}
             <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e.target.files[0])} />
           </label>

           {/* Text Inputs */}
           <input className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 focus:border-blue-500 outline-none transition" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
           <input className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 focus:border-blue-500 outline-none transition" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

           {/* Submit Button */}
           <button disabled={status === "uploading"} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70 transition">
             {status === "uploading" ? <><Loader2 className="animate-spin" /> Uploading...</> : "Upload Post"}
           </button>
        </form>
      </div>
    </div>
  );
}