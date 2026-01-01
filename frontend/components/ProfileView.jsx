"use client";

import { useState, useEffect } from "react";
import { Trash2, User, Grid, Film, Play, Bookmark, Ticket, Calendar as CalIcon } from "lucide-react";
import EditProfileModal from "./EditProfileModal";

import api from "../utils/api"; 

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const MediaPreview = ({ image, video, alt, className }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError && image) {
    return (
      <img 
        src={image} 
        alt={alt} 
        onError={() => setImgError(true)}
        className={className}
      />
    );
  }

  // Fallback to video (showing first frame)
  if (video) {
    return (
      <video
        src={video + "#t=0.1"}
        className={className}
        muted
        playsInline
        preload="metadata"
        onMouseOver={e => e.target.play()}
        onMouseOut={(e) => {
          e.target.pause();
          e.target.currentTime = 0;
        }}
      />
    );
  }

  // Fallback to generic image if no video
  return (
    <img 
      src={FALLBACK_IMAGE} 
      alt={alt} 
      className={className}
    />
  );
};

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts"); // "posts", "reels", "saved", "bookings"
  
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  
  const [followModal, setFollowModal] = useState({ isOpen: false, title: "", users: [] });

  // 1. Fetch Profile Data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/auth/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  // 1b. Fetch Bookings when tab active
  useEffect(() => {
    if (activeTab === "bookings" && bookings.length === 0) {
      async function fetchBookings() {
        setBookingsLoading(true);
        try {
          const res = await api.get("/bookings");
          setBookings(res.data);
        } catch (err) {
          console.error("Error loading bookings:", err);
        } finally {
          setBookingsLoading(false);
        }
      }
      fetchBookings();
    }
  }, [activeTab]);

  // 2. Handle Post Deletion
  async function handleDelete(postId) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/posts/${postId}`);
      setProfile((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== postId),
      }));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete post.");
    }
  }

  // 3. Handle Reel Deletion
  async function handleDeleteReel(reelId) {
    if (!confirm("Are you sure you want to delete this reel?")) return;

    try {
      await api.delete(`/reels/${reelId}`);
      setProfile((prev) => ({
        ...prev,
        reels: prev.reels.filter((r) => r.id !== reelId.toString()),
      }));
    } catch (err) {
      console.error("Delete reel failed:", err);
      alert("Could not delete reel.");
    }
  }

  // 3b. Handle Unsave Reel (from Saved tab)
  async function handleUnsaveReel(reelId) {
    if (!confirm("Remove this reel from saved?")) return;

    try {
      await api.delete(`/reels/${reelId}/save`);
      setProfile((prev) => ({
        ...prev,
        savedReels: prev.savedReels.filter((item) => item.reel.id !== reelId.toString()),
      }));
    } catch (err) {
      console.error("Unsave reel failed:", err);
      alert("Could not unsave reel.");
    }
  }

  // 3c. Handle Delete Booking
  async function handleDeleteBooking(bookingId) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => String(b.id) !== String(bookingId)));
    } catch (err) {
      console.error("Delete booking failed:", err);
      alert("Could not delete booking.");
    }
  }

  // 4. Handle Reel Selection
  const [selectedReel, setSelectedReel] = useState(null);

  function handleReelClick(reel) {
    setSelectedReel(reel);
  }

  function closeReelModal() {
    setSelectedReel(null);
  }

  // 5. Handle Post Selection
  const [selectedPost, setSelectedPost] = useState(null);

  function handlePostClick(post) {
    setSelectedPost(post);
  }

  function closePostModal() {
    setSelectedPost(null);
  }

  // 6. Handle Follow Lists
  async function handleShowFollows(type) {
    if (!profile) return;
    const title = type === "followers" ? "Followers" : "Following";
    try {
      const res = await api.get(`/users/${profile.id}/${type}`);
      setFollowModal({ isOpen: true, title, users: res.data });
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
    }
  }

  if (loading) return <div className="text-white/50 text-center mt-20">Loading profile...</div>;
  if (!profile) return <div className="text-white/50 text-center mt-20">User not found.</div>;

  return (
    <div className="w-full h-full pb-20">
      
      {/* --- POST IMAGE MODAL --- */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center">
            <img
              src={selectedPost.imageUrl}
              alt="Post"
              className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
            />
            {/* Close Button */}
            <button
              onClick={closePostModal}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0 -z-10" onClick={closePostModal}></div>
        </div>
      )}

      {/* --- REELS VIDEO MODAL --- */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl">
            <video
              src={selectedReel.video_url}
              className="w-full h-full object-cover"
              controls
              autoPlay
              loop
              playsInline
            />
            {/* Close Button */}
            <button
              onClick={closeReelModal}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0 -z-10" onClick={closeReelModal}></div>
        </div>
      )}

      {/* --- FOLLOW LIST MODAL --- */}
      {followModal.isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-800/50">
              <h3 className="text-lg font-bold text-white">{followModal.title}</h3>
              <button 
                onClick={() => setFollowModal({ ...followModal, isOpen: false })}
                className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {followModal.users.length === 0 ? (
                <p className="text-center py-8 text-zinc-500 text-sm">No one here yet.</p>
              ) : (
                followModal.users.map(u => (
                  <div key={u.id} className="flex items-center gap-3">
                    <img 
                      src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || "User")}&background=0D9488&color=fff`} 
                      alt={u.name} 
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{u.name}</h4>
                      <p className="text-[10px] text-zinc-400 truncate">@{u.username}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Backdrop click to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setFollowModal({ ...followModal, isOpen: false })}></div>
        </div>
      )}

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center pt-10 pb-8 px-4">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-teal-400 to-blue-600 p-[3px] shadow-2xl shadow-teal-500/20 mb-4">
          <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center overflow-hidden relative">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-white/20" />
            )}
          </div>
        </div>

        {/* Name & Username */}
        <h2 className="text-2xl font-bold text-white">{profile.name || "SnapTrek User"}</h2>
        <p className="text-white/40">@{profile.username || "user" + profile.id}</p>
        
        {profile.bio && (
            <p className="text-white/70 text-sm mt-3 max-w-md text-center leading-relaxed">
                {profile.bio}
            </p>
        )}

        {/* Edit Button */}
        <button 
            onClick={() => setIsEditOpen(true)}
            className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-semibold text-white transition"
        >
            Edit Profile
        </button>

        {/* Edit Modal */}
        {isEditOpen && (
            <EditProfileModal 
                user={profile} 
                onClose={() => setIsEditOpen(false)} 
                onUpdateSuccess={(updatedUser) => setProfile(prev => ({ ...prev, ...updatedUser }))}
            />
        )}

        {/* Stats */}
        <div className="flex items-center gap-8 mt-6 p-4 glass-panel rounded-2xl border border-white/5 bg-white/5">
          <div className="text-center">
            <span className="block font-bold text-xl text-white">{profile.posts?.length || 0}</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Posts</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <span className="block font-bold text-xl text-white">{profile.reels?.length || 0}</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Reels</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div 
            className="text-center cursor-pointer hover:bg-white/5 px-2 rounded-lg transition"
            onClick={() => handleShowFollows("followers")}
          >
            <span className="block font-bold text-xl text-white">{profile.followers || 0}</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Followers</span>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div 
            className="text-center cursor-pointer hover:bg-white/5 px-2 rounded-lg transition"
            onClick={() => handleShowFollows("following")}
          >
            <span className="block font-bold text-xl text-white">{profile.following || 0}</span>
            <span className="text-xs text-white/40 uppercase tracking-wider">Following</span>
          </div>
        </div>
      </div>

      {/* --- TAB NAVIGATION --- */}
      <div className="border-t border-white/10 mt-2">
        <div className="flex justify-center gap-8 md:gap-12 py-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all pb-1 ${
              activeTab === "posts"
                ? "text-white border-b-2 border-teal-500"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Grid size={16} />
            <span>Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("reels")}
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all pb-1 ${
              activeTab === "reels"
                ? "text-white border-b-2 border-teal-500"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Film size={16} />
            <span>Reels</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all pb-1 ${
              activeTab === "saved"
                ? "text-white border-b-2 border-teal-500"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Bookmark size={16} />
            <span>Saved</span>
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all pb-1 ${
              activeTab === "bookings"
                ? "text-white border-b-2 border-teal-500"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Ticket size={16} />
            <span>Bookings</span>
          </button>
        </div>
      </div>

      {/* --- POSTS GRID --- */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-4">
          {profile.posts.length === 0 ? (
              <div className="col-span-3 text-center py-20 text-white/30">
                  No posts yet. Upload one!
              </div>
          ) : (
              profile.posts.map((post) => (
              <div 
                  key={post.id} 
                  onClick={() => handlePostClick(post)}
                  className="relative aspect-square group bg-zinc-900 rounded-sm md:rounded-xl overflow-hidden cursor-pointer"
              >
                  <img 
                    src={post.imageUrl} 
                    alt="Post" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                          onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(post.id);
                          }}
                          className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110"
                          title="Delete Post"
                      >
                          <Trash2 size={20} />
                      </button>
                  </div>
              </div>
              ))
          )}
        </div>
      )}

      {/* --- REELS GRID --- */}
      {activeTab === "reels" && (
        <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-4">
          {!profile.reels || profile.reels.length === 0 ? (
              <div className="col-span-3 text-center py-20 text-white/30">
                  No reels yet. Upload one!
              </div>
          ) : (
              profile.reels.map((reel) => (
              <div 
                  key={reel.id} 
                  onClick={() => handleReelClick(reel)}
                  className="relative aspect-[9/16] group bg-zinc-900 rounded-sm md:rounded-xl overflow-hidden cursor-pointer"
              >
                  <MediaPreview 
                    image={reel.image_url} 
                    video={reel.video_url}
                    alt="Reel" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <button 
                          onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReel(reel.id);
                          }}
                          className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110"
                          title="Delete Reel"
                      >
                          <Trash2 size={20} />
                      </button>
                  </div>
              </div>
              ))
          )}
        </div>
      )}

      {/* --- SAVED GRID --- */}
      {activeTab === "saved" && (
        <div className="grid grid-cols-3 gap-1 md:gap-4 md:px-4">
          {!profile.savedReels || profile.savedReels.length === 0 ? (
              <div className="col-span-3 text-center py-20 text-white/30">
                  No saved reels yet.
              </div>
          ) : (
              profile.savedReels.map((item) => (
              <div 
                  key={item.id} 
                  onClick={() => handleReelClick(item.reel)}
                  className="relative aspect-[9/16] group bg-zinc-900 rounded-sm md:rounded-xl overflow-hidden cursor-pointer"
              >
                  {/* Thumbnail */}
                  <MediaPreview 
                    image={item.reel.image_url} 
                    video={item.reel.video_url}
                    alt="Reel" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Delete Button Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      <button 
                          onClick={(e) => {
                              e.stopPropagation();
                              handleUnsaveReel(item.reel.id);
                          }}
                          className="p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110"
                          title="Remove from Saved"
                      >
                          <Trash2 size={20} />
                      </button>
                  </div>
              </div>
              ))
          )}
        </div>
      )}

      {/* --- BOOKINGS LIST --- */}
      {activeTab === "bookings" && (
          <div className="px-4">
              {bookingsLoading ? (
                  <div className="text-center py-20 text-white/30">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                  <div className="text-center py-20 text-white/30">No bookings yet.</div>
              ) : (
                  <div className="space-y-4">
                      {bookings.map((booking) => (
                          <div key={booking.id} className="bg-zinc-900 rounded-xl p-4 flex gap-4 border border-white/5">
                              {/* Thumb */}
                               <div className="w-20 h-20 bg-black rounded-lg overflow-hidden shrink-0">
                                   <MediaPreview 
                                     image={booking.reel.image_url} 
                                     video={booking.reel.video_url}
                                     alt="Reel" 
                                     className="w-full h-full object-cover" 
                                   />
                              </div>
                              
                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-white mb-1 truncate">{booking.reel.title}</h4>
                                  <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                                      <CalIcon size={12} />
                                      <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex gap-4 text-xs text-white/80">
                                      <span>{booking.guests} Guests</span>
                                      <span className="font-bold text-teal-400">₹{booking.totalPrice}</span>
                                  </div>
                              </div>

                              {/* Status and Delete */}
                              <div className="flex flex-col items-end justify-between gap-2">
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded-md border border-green-500/30">
                                      {booking.status}
                                  </span>
                                  <button
                                      onClick={() => handleDeleteBooking(booking.id)}
                                      className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition"
                                      title="Cancel Booking"
                                  >
                                      <Trash2 size={16} />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      )}
    </div>
  );
}