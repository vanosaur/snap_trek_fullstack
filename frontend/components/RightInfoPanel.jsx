"use client";

export default function RightInfoPanel({ data, onOpen }) {
  if (!data) return null;

  return (
    <aside className="p-6 flex flex-col gap-6 w-full">

      <div>
        <div className="text-sm text-gray-400">Destination</div>
        <h2 className="text-2xl font-bold mt-1">{data.place}</h2>
        <p className="text-sm text-gray-300 mt-2">{data.shortDesc}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Item label="Best time" value={data.bestTime} />
        <Item label="Duration" value={data.duration} />
        <Item label="Budget" value={data.budgetRange} />
        <Item label="Highlight" value={data.itinerary[0]} />
      </div>

      <div>
        <div className="text-xs text-gray-400 mb-2">Stay Options</div>
        {data.stays.map((s, i) => (
          <div key={i} className="flex justify-between text-sm mb-1">
            <span>{s.name}</span>
            <span className="text-gray-400">{s.price}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onOpen}
        className="mt-auto w-full bg-white text-black py-2 rounded-md font-semibold"
      >
        View Full Itinerary →
      </button>
    </aside>
  );
}

function Item({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-semibold mt-1">{value}</div>
    </div>
  );
}
