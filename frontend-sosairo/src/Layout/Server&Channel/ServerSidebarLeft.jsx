import React, { useEffect, useState } from "react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import axiosCLient from "../../api/axios";
import { FaHashtag } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaGear, FaUserPlus } from "react-icons/fa6";

export default function ServerSidebarLeft() {
  const location = useLocation();
  const navigate = useNavigate();
  const [serverName, setServerName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textChannels, setTextChannels] = useState([]);
  const [voiceChannels, setVoiceChannels] = useState([]);

  const serverMatch = matchPath("/channels/server/:serverId/*", location.pathname);
  const serverId = serverMatch?.params?.serverId;

  useEffect(() => {
    const fetchServerInfo = async () => {
      if (!serverId) return;

      const token = localStorage.getItem("token");
      setIsLoading(true);

      try {
        const res = await axiosCLient.get(`/api/server/${serverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setServerName(res.data.name_server || `Server ${serverId}`);
        setTextChannels(res.data.text_channels || []);
        setVoiceChannels(res.data.voice_channels || []);
      } catch (error) {
        console.error("Gagal mengambil data server:", error);
        setServerName(`Server ${serverId}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServerInfo();
  }, [serverId]);

  const goToChannel = (channelId) => {
    navigate(`/channels/server/${serverId}/${channelId}`);
  };

  const title = isLoading
    ? <span className="loading loading-dots loading-md"></span>
    : serverName || "Server";

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
            <li><a><FaGear className="inline mr-2" /> Server Settings</a></li>
            <li><a><FaUserPlus className="inline mr-2" /> Invite People</a></li>
            <li><a className="text-red-500">Leave Server</a></li>
          </ul>
        </details>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 hide-scrollbar">

        <div>
          <div className="flex justify-between items-center text-xs text-[#8e9297] font-semibold uppercase mb-1">
            <span>Text Channels</span>
            <button className="text-white hover:text-green-400">+</button>
          </div>
          <ul className="space-y-1">
            {textChannels.map((channel) => (
              <li
                key={channel.id}
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-[#3a3c41] cursor-pointer ${location.pathname.includes(channel.id) ? 'bg-[#40444b]' : ''}`}
                onClick={() => goToChannel(channel.id)}
              >
                <FaHashtag className="text-gray-400" />
                <span className="text-sm">{channel.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs text-[#8e9297] font-semibold uppercase mb-1">
            <span>Voice Channels</span>
            <button className="text-white hover:text-green-400">+</button>
          </div>
          <ul className="space-y-1">
            {voiceChannels.map((channel) => (
              <li
                key={channel.id}
                className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-[#3a3c41] cursor-pointer ${location.pathname.includes(channel.id) ? 'bg-[#40444b]' : ''}`}
                onClick={() => goToChannel(channel.id)}
              >
                <HiSpeakerWave className="text-gray-400" />
                <span className="text-sm">{channel.name}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
