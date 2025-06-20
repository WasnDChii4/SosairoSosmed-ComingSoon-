import React, { useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import axiosCLient from "../../api/axios";

export default function ServerSidebarLeft() {
  const location = useLocation();
  const [serverName, setServerName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentPath = location.pathname;

  const serverMatch = matchPath("/channels/server/:serverId", currentPath);

  useEffect(() => {
    const fetchServerName = async () => {
      if (serverMatch) {
        const { serverId } = serverMatch.params;
        const token = localStorage.getItem("token");

        setIsLoading(true);

        try {
          const res = await axiosCLient.get(`/api/server/${serverId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setServerName(res.data.name_server);
        } catch (error) {
          console.error("Gagal mengambil server:", error);
          setServerName(`Server ${serverId}`);
        } finally {
          setIsLoading(false);
        }
      } else {
        setServerName(null);
      }
    };

    fetchServerName();
  }, [serverMatch?.params?.serverId]);

  const title = serverMatch
    ? isLoading
      ? <span className="loading loading-dots loading-md"></span>
      : serverName
    : "Server";

  return (
    <div className="w-64 bg-[#2B2D31] text-white flex flex-col h-full">
      <div className="h-12 px-4 flex items-center font-bold border-b border-[#1f1f1f] text-2xl">
        {title}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 hide-scrollbar">
        <div>
          <div className="text-xs uppercase text-gray-400 mb-1">Menu</div>
          <ul className="space-y-1 text-sm">
            <li>📅 Events</li>
            <li>🔍 Browse Channels</li>
            <li>👥 Members</li>
            <li>🚀 Server Boosts</li>
          </ul>
        </div>

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

        <div>
          <div className="text-xs uppercase text-gray-400 mb-1">Voice Channels</div>
          <ul className="space-y-1 text-sm">
            {[
              "general",
              "reading-manga",
              "sprite-karakter",
              "share-linked-gptchat",
              "simpanan-codingan",
              "informasi-utbk-snbt",
              "General",
            ].map((vc, i) => (
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
