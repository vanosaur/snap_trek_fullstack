// "use client";

// import { useState } from "react";
// import { ImagePlus, UploadCloud } from "lucide-react";

// export default function UploadStory() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Cloudinary Upload
//   async function uploadToCloudinary(file) {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", "YOUR_UPLOAD_PRESET");

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
//       { method: "POST", body: data }
//     );

//     const json = await res.json();
//     return json.secure_url;
//   }

//   // Submit Handler
//   async function handleSubmit(e) {
//     e.preventDefault();

//     const imageUrl = await uploadToCloudinary(image);

//     await fetch("https://snap-trek-fullstack.onrender.com/api/story", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: 1,
//         imageUrl,
//       }),
//     });

//     alert("Story uploaded!");
//   }

//   // File select handler
//   function handleFileChange(e) {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-zinc-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl w-full max-w-md space-y-5"
//       >
//         <h1 className="text-2xl font-bold text-white text-center mb-2">
//           Upload Story
//         </h1>

//         {/* Upload Preview Box */}
//         <label
//           className="w-full h-64 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-zinc-800/40 transition"
//         >
//           {preview ? (
//             <img
//               src={preview}
//               className="w-full h-full object-cover rounded-xl"
//             />
//           ) : (
//             <div className="flex flex-col items-center text-gray-400">
//               <ImagePlus className="w-10 h-10 mb-2" />
//               <p className="text-sm">Click to upload story image</p>
//             </div>
//           )}

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {/* Upload Button */}
//         <button
//           className="w-full py-3 text-white font-semibold rounded-xl 
//           bg-gradient-to-r from-teal-500 to-blue-600 
//           shadow-lg shadow-teal-500/30 
//           hover:opacity-90 active:scale-95 transition"
//           disabled={!image}
//         >
//           <div className="flex items-center justify-center gap-2">
//             <UploadCloud className="w-5 h-5" />
//             Upload Story
//           </div>
//         </button>
//       </form>
//     </div>
//   );
// }
