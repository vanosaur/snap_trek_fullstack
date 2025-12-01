"use client";

import { useState } from "react";
import { FileVideo, ImagePlus, Loader2 } from "lucide-react";

export default function UploadReel() {
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

  async function uploadToCloudinary(file, type) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/${type}/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    return json.secure_url;
  }

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const video_url = await uploadToCloudinary(video, "video");
    const image_url = await uploadToCloudinary(thumb, "image");

    const body = {
      ...form,
      price: Number(form.price),
      seats: Number(form.seats),
      rating: Number(form.rating),
      stay: {
        ...form.stay,
        price: Number(form.stay.price),
        rating: Number(form.stay.rating),
      },
      video_url,
      image_url,
    };

    await fetch("https://snap-trek-fullstack.onrender.com/api/reels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);
    alert("Uploaded Successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl w-full max-w-xl shadow-2xl">
        
        <h1 className="text-3xl font-semibold mb-6 text-center">Upload Reel</h1>

        <form onSubmit={submitHandler} className="space-y-5">

          {/* BASIC INPUTS */}
          <input
            className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
            placeholder="Trip Title"
            onChange={(e) => updateForm("title", e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
            placeholder="Place"
            onChange={(e) => updateForm("place", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
              type="number"
              placeholder="Price"
              onChange={(e) => updateForm("price", e.target.value)}
            />
            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
              type="number"
              placeholder="Seats"
              onChange={(e) => updateForm("seats", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
              type="number"
              placeholder="Rating"
              onChange={(e) => updateForm("rating", e.target.value)}
            />
            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
              placeholder="Duration"
              onChange={(e) => updateForm("duration", e.target.value)}
            />
          </div>

          {/* HIGHLIGHTS */}
          <div>
            <h3 className="text-white/70 mb-2">Highlights</h3>
            {form.highlights.map((h, i) => (
              <input
                key={i}
                className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition mb-2"
                placeholder={`Highlight ${i + 1}`}
                value={h}
                onChange={(e) => {
                  const copy = [...form.highlights];
                  copy[i] = e.target.value;
                  updateForm("highlights", copy);
                }}
              />
            ))}
            <button
              type="button"
              className="text-blue-400 hover:text-blue-500 text-sm"
              onClick={() =>
                updateForm("highlights", [...form.highlights, ""])
              }
            >
              + Add more
            </button>
          </div>

          {/* ITINERARY */}
          <div>
            <h3 className="text-white/70 mb-2">Itinerary</h3>

            {form.itinerary.map((day, i) => (
              <div
                key={i}
                className="bg-zinc-900/40 p-3 rounded-lg mb-3 border border-white/20"
              >
                <input
                  className="w-full p-2 rounded bg-zinc-900/60 border border-white/30 focus:border-blue-400 outline-none text-sm transition mb-2"
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
                    className="w-full p-2 rounded bg-zinc-900/60 border border-white/30 focus:border-blue-400 outline-none text-sm transition mb-1"
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
                  className="text-blue-400 hover:text-blue-500 text-sm"
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

            <button
              type="button"
              className="text-green-400 hover:text-green-500 text-sm"
              onClick={() =>
                updateForm("itinerary", [
                  ...form.itinerary,
                  { day: `Day ${form.itinerary.length + 1}`, activities: [""] },
                ])
              }
            >
              + Add Day
            </button>
          </div>

          {/* STAY INFO */}
          <div>
            <h3 className="text-white/70 mb-2">Stay Information</h3>

            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition mb-2"
              placeholder="Stay Name"
              onChange={(e) =>
                updateForm("stay", { ...form.stay, name: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition mb-2"
              placeholder="Stay Description"
              onChange={(e) =>
                updateForm("stay", { ...form.stay, desc: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition mb-2"
              placeholder="Stay Price"
              onChange={(e) =>
                updateForm("stay", { ...form.stay, price: e.target.value })
              }
            />

            <input
              className="w-full p-3 rounded-lg bg-zinc-900/50 border border-white/30 focus:border-blue-400 outline-none transition"
              placeholder="Stay Rating"
              onChange={(e) =>
                updateForm("stay", { ...form.stay, rating: e.target.value })
              }
            />
          </div>

          {/* VIDEO UPLOAD */}
          <label className="border border-white/30 rounded-lg p-4 bg-zinc-900/40 hover:border-blue-400 cursor-pointer transition flex items-center justify-center min-h-[120px]">
            {videoPreview ? (
              <video src={videoPreview} className="rounded-lg" controls />
            ) : (
              <div className="flex flex-col items-center text-white/40">
                <FileVideo className="w-10 h-10 mb-2" />
                Upload Reel Video
              </div>
            )}

            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                setVideo(e.target.files[0]);
                setVideoPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>

          {/* THUMBNAIL UPLOAD */}
          <label className="border border-white/30 rounded-lg p-4 bg-zinc-900/40 hover:border-blue-400 cursor-pointer transition flex items-center justify-center min-h-[120px]">
            {thumbPreview ? (
              <img
                src={thumbPreview}
                className="rounded-lg w-full h-40 object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-white/40">
                <ImagePlus className="w-10 h-10 mb-2" />
                Upload Thumbnail
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setThumb(e.target.files[0]);
                setThumbPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Upload Reel"}
          </button>

        </form>
      </div>
    </div>
  );
}
