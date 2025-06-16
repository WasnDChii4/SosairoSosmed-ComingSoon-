import React from "react";
import { Outlet } from "react-router-dom";
import FriendsNavbarTop from "./FriendsNavbarTop";
import FriendsSidebarLeft from "./FriendsSidebarLeft";

export default function FriendsLayoutPage() {
  return (
    <div className="relative">
      <FriendsNavbarTop />
      <FriendsSidebarLeft />
      <main className="p-4 pl-20 pt-14">
        <Outlet />
      </main>
    </div>
  )
}