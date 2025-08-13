import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import FriendsNavbarTop from "../Layout/Friends/FriendsNavbarTop";
import FriendsSidebarLeft from "../Layout/Friends/FriendsSidebarLeft";
import { FaComments } from "react-icons/fa";

export default function Friends() {
  const location = useLocation();

  const isChatSelected = location.pathname !== "/channels/friends";

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-16 flex-shrink-0">
        <FriendsNavbarTop />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 h-full">
          <FriendsSidebarLeft />
        </aside>
        <main className="flex-1 h-full overflow-hidden bg-[#2B2D31]">
          <div className="h-full overflow-y-auto p-4">
            {isChatSelected ? (
              <Outlet />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center space-y-4">
                <FaComments size={64} className="text-gray-500" />
                <h2 className="text-2xl font-bold text-white">Start a Conversation</h2>
                <p className="text-sm text-gray-400 max-w-sm">
                  Select a friend from the sidebar to begin chatting. Your conversations will appear here.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
