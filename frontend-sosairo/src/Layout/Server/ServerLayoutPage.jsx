import React from "react";
import ServerSidebarLeft from "./ServerSidebarLeft";
import ServerChat from "./ServerChat";

export default function ServerLayoutPage() {
  return (
    <div className="flex h-screen">
      <ServerSidebarLeft />
      <ServerChat />
    </div>
  );
}
