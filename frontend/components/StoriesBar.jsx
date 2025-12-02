"use client";

export default function StoriesBar({ mobile = false }) {
  const stories = [
    { id: 1, name: "Asha", img: "/profile1.png" },
    { id: 2, name: "Ravi", img: "/profile2.png" },
    { id: 3, name: "Maya", img: "/profile3.png" },
    { id: 4, name: "Owen", img: "/profile4.png" },
    { id: 5, name: "Lina", img: "/profile5.png" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
      {stories.map((s) => (
        <div key={s.id} className="flex flex-col items-center gap-1">
          <div className={`rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-violet-500 to-orange-400 ${mobile ? "w-16 h-16" : "w-14 h-14"}`}>
            <div className="w-full h-full rounded-full bg-black p-[2px]">
              <img src={s.img} alt={s.name} className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          <span className="text-xs text-gray-300 max-w-[64px] truncate">{s.name}</span>
        </div>
      ))}
    </div>
  );
}