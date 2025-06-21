import React from "react";
import ServerSidebarLeft from "../Layout/Server/ServerSidebarLeft";
import ServerChat from "../Layout/Server/ServerChat";

export default function Server() {
  return (
    <div className="flex h-screen">
      <ServerSidebarLeft />
      <ServerChat />
    </div>
  );
}
