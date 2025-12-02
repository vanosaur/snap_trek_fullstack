"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, CheckCircle } from "lucide-react";

export default function UploadStory({ onUploadSuccess, onClose }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); 
  const router = useRouter();

  async function uploadToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "snap-trek-fullstack"); // ✅ Use your real preset

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dgynhfgjw/image/upload`, // ✅ Use your real Cloud Name
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

      // ✅ POST to the correct API route (Standardized)
      const res = await fetch("http://localhost:4000/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          userId: 1, // Hardcoded for now, same as Posts
        }),
      });

      if (res.ok) {
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
        alert("Failed to upload story");
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading story");
      setStatus("idle");
    }
  };

  // Success View
  if (status === "success") {
    return (
      <div className="w-full h-full flex items-center justify-center p-10 bg-zinc-900 rounded-2xl border border-white/10">
         <div className="flex flex-col items-center animate-in fade-in zoom-in">
           <CheckCircle className="w-16 h-16 text-teal-500 mb-4" />
           <h2 className="text-2xl font-bold text-white">Story Added!</h2>
         </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Add to Story</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="aspect-[9/16] w-full max-w-[250px] mx-auto border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 transition relative overflow-hidden">
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-white/50">
              <Camera className="w-10 h-10 mb-2" />
              <span className="text-sm">Tap to select</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e.target.files[0])} />
        </label>

        <div className="flex gap-3">
            {onClose && (
                <button type="button" onClick={onClose} className="flex-1 py-3 bg-zinc-800 text-white rounded-lg font-semibold">Cancel</button>
            )}
            <button disabled={status === "uploading"} className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold flex justify-center gap-2">
                {status === "uploading" ? <Loader2 className="animate-spin" /> : "Share Story"}
            </button>
        </div>
      </form>
    </div>
  );
}