import React from "react";

export default function ServerChat() {
  return (
    <div className="flex-1 h-full overflow-y-auto p-4 bg-[#313338] text-white">
      {/* Simulasi Chat Scroll */}
      <div className="space-y-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="bg-[#404249] p-4 rounded shadow">
            <p className="font-semibold">Victoria {i + 1}</p>
            <p className="text-sm text-gray-300">Free to play until 6/24/2025</p>
          </div>
        ))}
      </div>
    </div>
  );
}
