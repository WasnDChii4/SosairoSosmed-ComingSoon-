import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserFriends, FaInbox } from "react-icons/fa";
import { PiStorefrontFill } from "react-icons/pi";

export default function FriendsSidebarLeft() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-full text-white flex flex-col p-2">
      <div className="mb-2 flex-shrink-0">
        <ul className="space-y-1">
          <li>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded ${
                isActive("/channels/friends")
                  ? "bg-[#404249] font-semibold"
                  : "hover:bg-[#3a3c41]"
              }`}
            >
              <FaUserFriends /> Friends
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-[#3a3c41]">
              <FaInbox /> Message Requests
            </button>
          </li>
          <li>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-[#3a3c41]">
              <PiStorefrontFill /> Shop
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="uppercase text-xs text-gray-400 px-3 py-1">Direct Messages</div>
        <div className="space-y-1 mt-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="px-3 py-2 hover:bg-[#3a3c41] rounded cursor-pointer">
              DM User {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
