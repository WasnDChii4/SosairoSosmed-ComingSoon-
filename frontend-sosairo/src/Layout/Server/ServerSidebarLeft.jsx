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
      <div className="h-12 px-2 pt-2 pb-12 border-b-2 border-[#1f1f1f]">
        <details className="dropdown w-full">
          <summary className="btn btn-ghost justify-between w-full text-left font-bold text-white text-lg px-2 hover:bg-[#3a3c41] rounded">
            <span>{title}</span>
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box mt-1 w-full">
            <li><a>Server Settings</a></li>
            <li><a>Invite People</a></li>
            <li><a className="text-red-500">Leave Server</a></li>
          </ul>
        </details>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 hide-scrollbar">
        
      </div>
    </div>
  );
}
