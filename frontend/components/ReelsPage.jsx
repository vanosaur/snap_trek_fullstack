// "use client";

// import { useState } from "react";
// import ReelPlayer from "./ReelPlayer";
// import ItineraryPanel from "./ItineraryPanel";
// import reelsData from "../data/reelsData";

// export default function ReelsPage() {
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState(null);

//   return (
//     <div className="relative w-full h-screen bg-black">
//       <ReelPlayer
//         reels={reelsData}
//         onSwipeLeft={(reel) => {
//           setSelected(reel);
//           setOpen(true);
//         }}
//       />

//       <ItineraryPanel open={open} data={selected} onClose={() => setOpen(false)} />
//     </div>
//   );
// }
