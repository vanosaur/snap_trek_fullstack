// Location: /frontend/app/upload/page.tsx

"use client"; // This component must be a client component

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <h3>Upload a new image for your post:</h3>

      <CldUploadWidget
        // 1. Tell the widget which preset to use
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        
        // 2. This function runs when the upload is successful
        onSuccess={(result) => {
          // The result is an object with info. We only need the secure_url
          if (result.event === "success" && result.info) {
            const secureUrl = (result.info as { secure_url: string }).secure_url;
            console.log("Image uploaded! URL:", secureUrl);
            setImageUrl(secureUrl);
          }
        }}
      >
        {/* This is the button that opens the widget */}
        {({ open }) => {
          return (
            <button onClick={() => open()}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      {/* Show the image if it's been uploaded */}
      {imageUrl && (
        <div>
          <p>Image uploaded:</p>
          <img src={imageUrl} alt="Uploaded post" width={300} />
        </div>
      )}
    </div>
  );
}