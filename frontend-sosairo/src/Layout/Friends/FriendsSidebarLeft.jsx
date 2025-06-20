import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";

export default function FriendsSidebarLeft() {
  const location = useLocation();

  const menuItems = [
    { name: "Friends", path: "/channels/friends", icon: <FaUserFriends /> },
  ];

  return (
    <div className="w-64 h-full text-white flex flex-col p-2">
      <div className="mb-2 flex-shrink-0">
        <ul className="space-y-1 w-full">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded transition-all ${
                    isActive
                      ? "bg-[#404249] font-semibold text-white"
                      : "hover:bg-[#3a3c41] text-gray-300"
                  }`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="uppercase text-xs text-gray-400 px-3 py-1">Direct Messages</div>
        <div className="space-y-1 mt-1">
          
        </div>
      </div>
    </div>
  );
}
