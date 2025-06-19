import React from "react";
import { Outlet } from "react-router-dom";
import FriendsNavbarTop from "./FriendsNavbarTop";
import FriendsSidebarLeft from "./FriendsSidebarLeft";

export default function FriendsLayoutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Navbar fixed height */}
      <div className="h-16 flex-shrink-0">
        <FriendsNavbarTop />
      </div>

      {/* Sisa layar = 100vh - 4rem (tinggi navbar) */}
      <div className="flex h-[calc(90vh-4rem)] overflow-hidden">
        {/* Sidebar scrollable */}
        <aside className="w-64 flex-shrink-0">
          <FriendsSidebarLeft />
        </aside>

        {/* Main content scrollable */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
