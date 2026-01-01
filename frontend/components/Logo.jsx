import React from "react";

export default function Logo({ className = "w-12 h-12", mobile = false }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="SnapTrek Logo"
        className="w-full h-full object-contain drop-shadow-lg filter hover:brightness-110 transition-all duration-300"
      />
    </div>
  );
}
