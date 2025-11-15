"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import api from  "../../utils/api"; 
import { useRouter } from "next/navigation"; // <-- To redirect

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [itinerary, setItinerary] = useState(""); // We'll use a simple text area for now

  const router = useRouter();

  // --- This function runs when the upload is successful ---
  const onUploadSuccess = (result: any) => {
    if (result.event === "success" && result.info) {
      const secureUrl = result.info.secure_url;
      console.log("Image uploaded! URL:", secureUrl);
      setImageUrl(secureUrl); // Save the URL to state
    }
  };

  // --- This function runs when the user hits "Submit" ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first!");
      return;
    }

    try {
      const postData = {
        imageUrl,
        caption,
        location,
        // In a real app, you'd parse this JSON, but text is fine for now
        itinerary: { details: itinerary }, 
      };

      // Use the api instance to send the data
      // The token will be attached automatically by the interceptor
      const response = await api.post("/posts", postData);

      console.log("Post created:", response.data);
      alert("Post created successfully!");
      
      // Redirect to the home page to see the new post
      router.push("/"); 

    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Are you logged in?");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a New Post</h2>
      
      {/* 1. UPLOAD WIDGET */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={onUploadSuccess}
      >
        {({ open }) => {
          return (
            <button onClick={() => open()} type="button">
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Show the image preview */}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Image uploaded:</p>
          <img src={imageUrl} alt="Uploaded post" width={300} />
        </div>
      )}

      {/* 2. POST FORM */}
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Caption:</label><br />
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Location:</label><br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Itinerary Details:</label><br />
          <textarea
            value={itinerary}
            onChange={(e) => setItinerary(e.target.value)}
            style={{ width: "300px", height: "100px" }}
          />
        </div>
        
        <button type="submit" disabled={!imageUrl}>
          Create Post
        </button>
      </form>
    </div>
  );
}