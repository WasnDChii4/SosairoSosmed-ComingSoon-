import React from "react";
import { Outlet } from "react-router-dom";
import FriendsNavbarTop from "./FriendsNavbarTop";
import FriendsSidebarLeft from "./FriendsSidebarLeft";

export default function FriendsLayoutPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="h-16 flex-shrink-0">
        <FriendsNavbarTop />
      </div>
      <div className="flex overflow-hidden">
        <aside className="w-64 flex-shrink-0">
          <FriendsSidebarLeft />
        </aside>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
