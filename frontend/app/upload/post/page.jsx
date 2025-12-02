"use client";

import UploadPost from "../../../components/UploadPost"; // Import the component

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Just render the component. No props needed here. */}
      <UploadPost />
    </div>
  );
}