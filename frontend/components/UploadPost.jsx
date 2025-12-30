"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, CheckCircle } from "lucide-react";
import api from "../utils/api";

export default function UploadPost({ onUploadSuccess, onClose }) {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); 
  const router = useRouter();

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
      if (!imageUrl) throw new Error("Image upload failed. Please try again.");

      const res = await api.post("/posts", {
        caption,
        location,
        imageUrl,
        // authorId is now handled by backend from JWT
      });

      if (res.status === 201 || res.status === 200) {
        setStatus("success");
        setTimeout(() => {
          if (onUploadSuccess) {
            onUploadSuccess();
            if (onClose) onClose();
          } else {
            router.push("/feed");
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

  if (status === "success") {
    return (
      <div className="w-full max-w-lg aspect-square flex items-center justify-center p-10 bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Post Shared!</h2>
          <p className="text-zinc-400">Your trip moment is now live.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl w-full max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent italic">Share Your Journey</h1>
        {onClose && (
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="relative group">
           <label className={`relative block overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer 
            ${preview ? 'border-teal-500/50 ring-4 ring-teal-500/10' : 'border-white/10 hover:border-teal-500/50 hover:bg-white/5'} 
            aspect-video flex items-center justify-center`}>
              
             {preview ? (
               <img src={preview} className="w-full h-full object-cover" alt="Preview" />
             ) : (
               <div className="flex flex-col items-center gap-3">
                 <div className="p-4 bg-teal-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <ImagePlus className="w-10 h-10 text-teal-400" />
                 </div>
                 <div className="text-center">
                   <p className="text-white font-medium">Drop your photo here</p>
                   <p className="text-zinc-500 text-sm">SVG, PNG, JPG or GIF</p>
                 </div>
               </div>
             )}
             <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e.target.files[0])} />
             
             {preview && (
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                 <p className="text-white font-semibold flex items-center gap-2">
                   <ImagePlus className="w-5 h-5" /> Change Photo
                 </p>
               </div>
             )}
           </label>
         </div>

         <div className="space-y-4">
           <div className="relative">
             <input 
               className="w-full p-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-white focus:border-teal-500/50 focus:bg-white/10 transition-all" 
               placeholder="Write a captivating caption..." 
               value={caption} 
               onChange={(e) => setCaption(e.target.value)} 
             />
           </div>
           
           <div className="relative">
             <input 
               className="w-full p-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-white focus:border-teal-500/50 focus:bg-white/10 transition-all" 
               placeholder="Where was this taken?" 
               value={location} 
               onChange={(e) => setLocation(e.target.value)} 
             />
           </div>
         </div>

         <div className="pt-4">
           <button 
             disabled={status === "uploading" || !image} 
             className={`w-full py-4 rounded-2xl font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-xl
               ${status === "uploading" || !image 
                 ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                 : "bg-gradient-to-r from-teal-500 to-blue-600 hover:shadow-teal-500/25"}
             `}
           >
             {status === "uploading" ? (
               <>
                 <Loader2 className="animate-spin w-5 h-5" />
                 <span>Uploading your Trek...</span>
               </>
             ) : (
               <>
                 <span>Share with the World</span>
               </>
             )}
           </button>
         </div>
      </form>
    </div>
  );
}