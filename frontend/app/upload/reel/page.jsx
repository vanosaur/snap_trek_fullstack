"use client";

import { useState } from "react";

export default function UploadReel() {
  const [form, setForm] = useState({
    title: "",
    place: "",
    price: "",
    seats: "",
    rating: "",
    duration: "",
    highlights: [""],
    itinerary: [
      { day: "Day 1", activities: [""] }
    ],
    stay: {
      name: "",
      desc: "",
      price: "",
      rating: ""
    }
  });

  const [video, setVideo] = useState(null);
  const [thumb, setThumb] = useState(null);

  // Cloudinary Upload Function
  async function uploadToCloudinary(file, type) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "YOUR_UPLOAD_PRESET");

    const uploadType = type === "video" ? "video" : "image";

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/${uploadType}/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    return json.secure_url;
  }

  // Update Form Helper
  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Upload video + thumbnail
    const video_url = await uploadToCloudinary(video, "video");
    const image_url = await uploadToCloudinary(thumb, "image");

    const body = {
      title: form.title,
      place: form.place,
      price: Number(form.price),
      seats: Number(form.seats),
      rating: Number(form.rating),
      duration: form.duration,
      highlights: form.highlights,
      itinerary_days: form.itinerary,
      stay: form.stay,
      video_url,
      image_url
    };

    const res = await fetch(
      "https://snap-trek-fullstack.onrender.com/api/reels",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );

    const result = await res.json();
    alert("Uploaded Successfully!");
    console.log(result);
  };

  return (
    <div className="p-6 text-white max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Reel</h1>

      <form onSubmit={submitHandler} className="space-y-4">

        {/* Title */}
        <input
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Trip Title"
          onChange={(e) => updateForm("title", e.target.value)}
        />

        {/* Place */}
        <input
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Place"
          onChange={(e) => updateForm("place", e.target.value)}
        />

        {/* Price */}
        <input
          type="number"
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Price"
          onChange={(e) => updateForm("price", e.target.value)}
        />

        {/* Seats */}
        <input
          type="number"
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Seats"
          onChange={(e) => updateForm("seats", e.target.value)}
        />

        {/* Rating */}
        <input
          type="number"
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Rating (4.5)"
          onChange={(e) => updateForm("rating", e.target.value)}
        />

        {/* Duration */}
        <input
          className="w-full p-3 bg-zinc-900 rounded"
          placeholder="Duration (2 - 4 days)"
          onChange={(e) => updateForm("duration", e.target.value)}
        />

        {/* Highlights */}
        <div>
          <h2 className="font-semibold mb-2">Highlights</h2>
          {form.highlights.map((h, i) => (
            <input
              key={i}
              className="w-full p-2 bg-zinc-900 rounded mb-1"
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
            className="px-3 py-1 bg-blue-600 rounded mt-1"
            onClick={() =>
              updateForm("highlights", [...form.highlights, ""])
            }
          >
            + Add Highlight
          </button>
        </div>

        {/* Itinerary */}
        <div>
          <h2 className="font-semibold mb-2">Itinerary</h2>

          {form.itinerary.map((day, i) => (
            <div key={i} className="bg-zinc-800 p-3 rounded mb-3">
              <input
                className="w-full p-2 bg-zinc-900 rounded mb-2"
                placeholder={day.day}
                value={day.day}
                onChange={(e) => {
                  const copy = [...form.itinerary];
                  copy[i].day = e.target.value;
                  updateForm("itinerary", copy);
                }}
              />

              <h3 className="mb-1">Activities</h3>
              {day.activities.map((act, j) => (
                <input
                  key={j}
                  className="w-full p-2 bg-zinc-900 rounded mb-1"
                  placeholder="Activity"
                  value={act}
                  onChange={(e) => {
                    const copy = [...form.itinerary];
                    copy[i].activities[j] = e.target.value;
                    updateForm("itinerary", copy);
                  }}
                />
              ))}
              <button
                type="button"
                className="px-3 py-1 bg-blue-600 rounded"
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
            className="px-3 py-1 bg-green-600 rounded"
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

        {/* Stay Information */}
        <div>
          <h2 className="font-semibold mb-2">Stay Information</h2>
          <input
            className="w-full p-2 bg-zinc-900 rounded mb-2"
            placeholder="Stay Name"
            onChange={(e) =>
              updateForm("stay", { ...form.stay, name: e.target.value })
            }
          />
          <input
            className="w-full p-2 bg-zinc-900 rounded mb-2"
            placeholder="Stay Description"
            onChange={(e) =>
              updateForm("stay", { ...form.stay, desc: e.target.value })
            }
          />
          <input
            className="w-full p-2 bg-zinc-900 rounded mb-2"
            placeholder="Stay Price"
            onChange={(e) =>
              updateForm("stay", { ...form.stay, price: Number(e.target.value) })
            }
          />
          <input
            className="w-full p-2 bg-zinc-900 rounded mb-2"
            placeholder="Stay Rating"
            onChange={(e) =>
              updateForm("stay", { ...form.stay, rating: Number(e.target.value) })
            }
          />
        </div>

        {/* Upload Video */}
        <input
          type="file"
          accept="video/*"
          className="block w-full mb-3"
          onChange={(e) => setVideo(e.target.files[0])}
        />

        {/* Upload Image */}
        <input
          type="file"
          accept="image/*"
          className="block w-full mb-4"
          onChange={(e) => setThumb(e.target.files[0])}
        />

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 rounded text-white font-bold"
        >
          Upload Reel
        </button>
      </form>
    </div>
  );
}
