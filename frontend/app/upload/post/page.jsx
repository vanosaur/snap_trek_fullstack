"use client";

import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

export default function UploadPost() {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  async function uploadToCloudinary(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
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
    if (!image) return alert("Please upload an image");

    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(image);

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

      const data = await res.json();
      alert("Post uploaded!");
    } catch (error) {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl">
        
        <h1 className="text-3xl font-semibold mb-6 text-center">Upload Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* IMAGE UPLOAD BOX */}
          <label
            className="border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
          >
            {preview ? (
              <img
                src={preview}
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <>
                <ImagePlus className="w-12 h-12 text-white/50" />
                <p className="mt-2 text-white/50">
                  Click to upload or drag an image
                </p>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageSelect(e.target.files[0])}
            />
          </label>

          {/* INPUTS */}
          <input
            className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 focus:border-blue-500 outline-none transition"
            placeholder="Caption"
            onChange={(e) => setCaption(e.target.value)}
          />

          <input
            className="w-full p-3 bg-zinc-800/60 rounded-lg border border-white/10 focus:border-blue-500 outline-none transition"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Uploading...
              </>
            ) : (
              "Upload Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
