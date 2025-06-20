import React from "react";

export default function ServerSidebarLeft() {
  return (
    <div className="w-64 bg-[#2B2D31] text-white flex flex-col h-full">
      {/* Header (Server Name) */}
      <div className="h-12 px-4 flex items-center font-bold border-b border-[#1f1f1f]">
        WasnSeventhCh's server
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 hide-scrollbar">
        {/* Menu Section */}
        <div>
          <div className="text-xs uppercase text-gray-400 mb-1">Menu</div>
          <ul className="space-y-1 text-sm">
            <li>📅 Events</li>
            <li>🔍 Browse Channels</li>
            <li>👥 Members</li>
            <li>🚀 Server Boosts</li>
          </ul>
        </div>

        {/* Channels Section */}
        <div>
          <div className="text-xs uppercase text-gray-400 mb-1">Text Channels</div>
          <ul className="space-y-1 text-sm">
            {["rules", "moderator-only", "games", "seed-electrum"].map((ch, i) => (
              <li key={i} className="hover:bg-[#3a3c41] px-2 py-1 rounded cursor-pointer">
                # {ch}
              </li>
            ))}
          </ul>
        </div>

        {/* Voice Channels Section */}
        <div>
          <div className="text-xs uppercase text-gray-400 mb-1">Voice Channels</div>
          <ul className="space-y-1 text-sm">
            {["general", "reading-manga", "sprite-karakter", "share-linked-gptchat", "simpanan-codingan", "informasi-utbk-snbt", "General"].map((vc, i) => (
              <li key={i} className="hover:bg-[#3a3c41] px-2 py-1 rounded cursor-pointer">
                🔊 {vc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
