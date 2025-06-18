import React from "react";
import { Outlet } from "react-router-dom";
import FriendsNavbarTop from "./FriendsNavbarTop";
import FriendsSidebarLeft from "./FriendsSidebarLeft";

export default function FriendsLayoutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="h-16 flex-shrink-0">
        <FriendsNavbarTop />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 h-full overflow-y-auto">
          <FriendsSidebarLeft />
        </aside>
        <main className="flex-1 h-full overflow-hidden p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
