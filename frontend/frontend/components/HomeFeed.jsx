// // frontend/components/HomeFeed.jsx
// "use client";

// import { useEffect, useState } from "react";
// import PostCard from "./PostCard";

// export default function HomeFeed() {
//   // Replace this with your real API fetch later.
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Try to fetch from your backend: /api/posts or similar
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch("/api/posts");
//         if (res.ok) {
//           const data = await res.json();
//           setPosts(data);
//           return;
//         }
//       } catch (e) {
//         // ignore; fallback to mock
//       }

//       // Mock fallback
//       setPosts([
//         {
//           id: "1",
//           username: "travelwithsam",
//           location: "Bali, Indonesia",
//           caption: "Sunset at Uluwatu — must visit for surfers 🌊",
//           image:
//             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop",
//           likes: 1243,
//         },
//         {
//           id: "2",
//           username: "wanderlust_vani",
//           location: "Leh Ladakh, India",
//           caption: "Clear skies and frozen lakes — road trip goals ❄️",
//           image:
//             "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
//           likes: 987,
//         },
//       ]);
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="flex flex-col gap-6 py-4">
//       {posts.map((p) => (
//         <PostCard key={p.id} post={p} />
//       ))}
//     </div>
//   );
// }
