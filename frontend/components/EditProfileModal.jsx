"use client";

import { useState, useRef } from "react";
import { X, Camera, Loader2 } from "lucide-react";
import api from "../utils/api";

export default function EditProfileModal({ user, onClose, onUpdateSuccess }) {
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  // Cloudinary Upload Logic (Reused)
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setAvatar(url);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.put("/auth/profile", {
        name,
        username,
        bio,
        avatar,
      });
      
      onUpdateSuccess(res.data); // Update the parent state
      onClose();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update profile. Server might be unreachable.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Edit Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-white/50 hover:text-white">
                <X size={20} />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
                <div 
                    className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 cursor-pointer group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <img src={avatar || "https://ui-avatars.com/api/?name=User"} alt="Avatar" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                         <Camera className="text-white" size={24} />
                    </div>
                    {uploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Loader2 className="animate-spin text-white" />
                        </div>
                    )}
                </div>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-3 text-blue-400 text-sm font-semibold hover:text-blue-300">
                    Change Profile Photo
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                <div>
                   <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Name</label> 
                   <input 
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                   />
                </div>
                <div>
                   <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Username</label> 
                   <input 
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                   />
                </div>
                <div>
                   <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1 block">Bio</label> 
                   <textarea 
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition resize-none h-24"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Write a little bit about yourself..."
                   />
                </div>
            </div>

            {/* Actions */}
            <button 
                type="submit" 
                disabled={saving || uploading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
                {saving ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
        </form>

      </div>
    </div>
  );
}
