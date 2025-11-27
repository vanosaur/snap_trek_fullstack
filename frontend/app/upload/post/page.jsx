"use client";

import { useState } from "react";

export default function UploadPost() {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          authorId: 1 // ANYONE can upload, so use default author
        })
      }
    );

    const data = await res.json();
    alert("Post uploaded!");
  };

  return (
    <div className="p-6 text-white max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Upload Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Caption"
          onChange={(e) => setCaption(e.target.value)}
        />

        <input
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button className="w-full py-3 bg-blue-600 rounded">
          Upload Post
        </button>

      </form>
    </div>
  );
}
