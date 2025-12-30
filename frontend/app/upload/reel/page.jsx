"use client";

import { useState } from "react";
import { FileVideo, ImagePlus, Loader2, CheckCircle, MapPin, DollarSign, Users, Star, Clock, List, ChevronRight, ChevronLeft } from "lucide-react";
import api from "../../../utils/api";
import { useRouter } from "next/navigation";

export default function UploadReel() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    place: "",
    price: "",
    seats: "",
    rating: "",
    duration: "",
    highlights: [""],
    itinerary: [{ day: "Day 1", activities: [""] }],
    stay: { name: "", desc: "", price: "", rating: "" },
  });

  const [video, setVideo] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  async function uploadToCloudinary(file, type) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "snap-trek-fullstack");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dgynhfgjw/${type}/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    return json.secure_url;
  }

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!video || !thumb) {
        alert("Please upload both video and thumbnail");
        return;
    }
    setLoading(true);

    try {
        const video_url = await uploadToCloudinary(video, "video");
        const image_url = await uploadToCloudinary(thumb, "image");

        const body = {
          ...form,
          price: Number(form.price) || 0,
          seats: Number(form.seats) || 0,
          rating: Number(form.rating) || 0,
          stay: {
            ...form.stay,
            price: Number(form.stay.price) || 0,
            rating: Number(form.stay.rating) || 0,
          },
          video_url,
          image_url,
          itinerary_days: form.itinerary // Map to schema field name
        };

        const res = await api.post("/reels", body);

        if (res.status === 200 || res.status === 201) {
            setStatus("success");
            setTimeout(() => {
                router.push("/reels");
            }, 2000);
        }
    } catch (err) {
        console.error(err);
        alert("Upload failed. Check console.");
    } finally {
        setLoading(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (status === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-12 rounded-[40px] text-center max-w-md w-full animate-in zoom-in duration-500">
           <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-teal-400" />
           </div>
           <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent italic">Trek Published!</h2>
           <p className="text-zinc-400">Your travel reel has been uploaded successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 py-20 bg-[radial-gradient(circle_at_50%_50%,rgba(13,148,136,0.1),transparent_50%)]">
      
      <div className="w-full max-w-2xl mb-12">
        <h1 className="text-4xl font-black mb-4 text-center tracking-tight italic bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Share Your Adventure</h1>
        <div className="flex justify-between items-center px-4 max-w-sm mx-auto">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full mx-1 transition-all duration-500 ${step >= i ? 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-white/10'}`} />
            ))}
        </div>
      </div>

      <div className="backdrop-blur-3xl bg-white/[0.03] border border-white/10 p-10 rounded-[40px] w-full max-w-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <form onSubmit={submitHandler} className="relative z-10">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8"><Clock className="text-teal-400" /> Trip Details</h2>
              
              <div className="group relative">
                <input
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-teal-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-zinc-600 text-lg"
                    placeholder="Trek Title (e.g., Hidden Waterfalls of Bali)"
                    value={form.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                        className="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 focus:border-teal-500/50 outline-none transition-all"
                        placeholder="Location"
                        value={form.place}
                        onChange={(e) => updateForm("place", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                        className="w-full p-4 pl-12 rounded-2xl bg-white/5 border border-white/5 focus:border-teal-500/50 outline-none transition-all"
                        placeholder="Duration (e.g., 3 Days, 2 Nights)"
                        value={form.duration}
                        onChange={(e) => updateForm("duration", e.target.value)}
                    />
                  </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                        className="w-full p-4 pl-10 rounded-2xl bg-white/5 border border-white/5 focus:border-teal-500/50 outline-none transition-all"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={(e) => updateForm("price", e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                        className="w-full p-4 pl-10 rounded-2xl bg-white/5 border border-white/5 focus:border-teal-500/50 outline-none transition-all"
                        type="number"
                        placeholder="Seats"
                        value={form.seats}
                        onChange={(e) => updateForm("seats", e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                        className="w-full p-4 pl-10 rounded-2xl bg-white/5 border border-white/5 focus:border-teal-500/50 outline-none transition-all"
                        type="number"
                        step="0.1"
                        placeholder="Rating"
                        value={form.rating}
                        onChange={(e) => updateForm("rating", e.target.value)}
                    />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: HIGHLIGHTS & ITINERARY */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><List className="text-blue-400" /> Highlights & Plan</h2>
              
              <div>
                <label className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-3 block px-1">Top Features</label>
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {form.highlights.map((h, i) => (
                    <input
                        key={i}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/5 focus:border-blue-500/50 outline-none transition-all"
                        placeholder={`Feature #${i + 1}`}
                        value={h}
                        onChange={(e) => {
                        const copy = [...form.highlights];
                        copy[i] = e.target.value;
                        updateForm("highlights", copy);
                        }}
                    />
                    ))}
                </div>
                <button
                type="button"
                className="mt-3 py-2 px-4 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm font-bold transition-all"
                onClick={() => updateForm("highlights", [...form.highlights, ""])}
                >
                + Add Feature
                </button>
              </div>

              <div>
                <label className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-3 block px-1">Day Wise Plan</label>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {form.itinerary.map((day, i) => (
                    <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                        <input
                        className="w-full bg-transparent border-b border-white/10 pb-2 mb-4 font-bold text-teal-400 outline-none"
                        value={day.day}
                        onChange={(e) => {
                            const copy = [...form.itinerary];
                            copy[i].day = e.target.value;
                            updateForm("itinerary", copy);
                        }}
                        />
                        {day.activities.map((a, j) => (
                        <input
                            key={j}
                            className="w-full p-3 rounded-xl bg-white/5 border border-white/5 outline-none text-sm transition-all mb-2 focus:border-teal-500/30"
                            placeholder="Activity"
                            value={a}
                            onChange={(e) => {
                            const copy = [...form.itinerary];
                            copy[i].activities[j] = e.target.value;
                            updateForm("itinerary", copy);
                            }}
                        />
                        ))}
                        <button
                        type="button"
                        className="text-zinc-500 hover:text-teal-400 text-xs font-bold transition-colors"
                        onClick={() => {
                            const copy = [...form.itinerary];
                            copy[i].activities.push("");
                            updateForm("itinerary", copy);
                        }}
                        >
                        + Add Activity
                        </button>
                    </div>
                    ))}
                </div>
                <button
                type="button"
                className="mt-4 py-2 px-6 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-black transition-all"
                onClick={() => updateForm("itinerary", [...form.itinerary, { day: `Day ${form.itinerary.length + 1}`, activities: [""] }])}
                >
                + Extend Journey
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: STAY INFO */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8"><Star className="text-purple-400" /> Accommodation</h2>
              
              <div className="space-y-4">
                  <input
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-purple-500/50 outline-none"
                    placeholder="Stay Name (e.g., Grand Hyatt)"
                    value={form.stay.name}
                    onChange={(e) => updateForm("stay", { ...form.stay, name: e.target.value })}
                  />
                  <textarea
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-purple-500/50 outline-none min-h-[120px]"
                    placeholder="Short description of the stay"
                    value={form.stay.desc}
                    onChange={(e) => updateForm("stay", { ...form.stay, desc: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <input
                        className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-purple-500/50 outline-none"
                        placeholder="Price/Night"
                        value={form.stay.price}
                        onChange={(e) => updateForm("stay", { ...form.stay, price: e.target.value })}
                    />
                    <input
                        className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 focus:border-purple-500/50 outline-none"
                        placeholder="Rating (1-5)"
                        value={form.stay.rating}
                        onChange={(e) => updateForm("stay", { ...form.stay, rating: e.target.value })}
                    />
                  </div>
              </div>
            </div>
          )}

          {/* STEP 4: MEDIA UPLOAD */}
          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8"><FileVideo className="text-rose-400" /> Capturing the Trek</h2>
              
              <div className="grid grid-cols-2 gap-6">
                  {/* VIDEO UPLOAD */}
                  <label className="relative border-2 border-dashed border-white/10 rounded-[32px] p-6 bg-white/[0.02] hover:border-rose-500/50 hover:bg-white/[0.05] cursor-pointer transition-all aspect-[9/16] flex items-center justify-center overflow-hidden group">
                    {videoPreview ? (
                      <video src={videoPreview} className="w-full h-full object-cover rounded-2xl shadow-lg" autoPlay muted loop />
                    ) : (
                      <div className="flex flex-col items-center text-zinc-500 group-hover:text-rose-400">
                        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <FileVideo className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-sm">Upload Video</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setVideo(file);
                          setVideoPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>

                  {/* THUMBNAIL UPLOAD */}
                  <label className="relative border-2 border-dashed border-white/10 rounded-[32px] p-6 bg-white/[0.02] hover:border-teal-500/50 hover:bg-white/[0.05] cursor-pointer transition-all aspect-[9/16] flex items-center justify-center overflow-hidden group">
                    {thumbPreview ? (
                      <img src={thumbPreview} className="w-full h-full object-cover rounded-2xl shadow-lg" alt="Thumbnail" />
                    ) : (
                      <div className="flex flex-col items-center text-zinc-500 group-hover:text-teal-400">
                        <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ImagePlus className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-sm">Upload Cover</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setThumb(file);
                          setThumbPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
              </div>
            </div>
          )}

          {/* FOOTER NAVIGATION */}
          <div className="mt-12 flex gap-4">
              {step > 1 && (
                <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                    <ChevronLeft className="w-5 h-5" /> Back
                </button>
              )}
              
              {step < 4 ? (
                <button
                    type="button"
                    onClick={nextStep}
                    className="flex-[2] py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all flex items-center justify-center gap-2"
                >
                    Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-black shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" /> Submitting...
                        </>
                    ) : (
                        "Publish Reel"
                    )}
                </button>
              )}
          </div>

        </form>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}
