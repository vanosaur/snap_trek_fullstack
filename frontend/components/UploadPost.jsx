"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, CheckCircle } from "lucide-react";

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
    data.append("upload_preset", "snap-trek-fullstack"); // Your Real Preset

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dgynhfgjw/image/upload`, // Your Real Cloud Name
      { method: "POST", body: data }
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
      const imageUrl = await uploadToCloudinary(image);

      const res = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption,
          location,
          imageUrl,
          authorId: 1, 
        }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          // If inside a Modal (Home Feed)
          if (onUploadSuccess) {
            onUploadSuccess();
            if (onClose) onClose();
          } 
          // If on a Standalone Page
          else {
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
      <div className="w-full h-full flex items-center justify-center p-10 bg-zinc-900 rounded-2xl border border-white/10">
        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-white">Post Uploaded!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">Upload Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
         <label className="border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition group">
           {preview ? (
             <img src={preview} className="w-full h-64 object-cover rounded-lg" />
           ) : (
             <>
               <ImagePlus className="w-12 h-12 text-white/50 group-hover:text-blue-400 transition" />
               <p className="mt-2 text-white/50 group-hover:text-white transition">Click to upload</p>
             </>
           )}
           <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e.target.files[0])} />
         </label>

         <input className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 outline-none text-white" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
         <input className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 outline-none text-white" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

         <div className="flex gap-3">
             {onClose && (
                <button type="button" onClick={onClose} className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold text-white transition">Cancel</button>
             )}
             <button disabled={status === "uploading"} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white flex items-center justify-center gap-2">
               {status === "uploading" ? <Loader2 className="animate-spin" /> : "Share Post"}
             </button>
         </div>
      </form>
    </div>
  );
}