import React from "react";
import { FaQuestionCircle, FaInbox } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/channels/friends" : "Friends",
}

export default function TopNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const title = routeTitles[currentPath] || "Page";

  return (
    <div className="fixed left-0 right-0 flex z-10 items-center justify-between h-14 px-4 bg-neutral">
      <h1 className="text-xl font-extrabold">Sosairo</h1>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-base text-slate-500 font-semibold">
        {title}
      </h1>
      <div className="gap-4">
        <div className="tooltip tooltip-bottom">
          <div className="tooltip-content bg-base-300 shadow-md shadow-black">
            <div className="text-sm">Inbox</div>
          </div>
          <button className="text-xl btn btn-ghost btn-sm m-2.5"><FaInbox /></button>
        </div>
        <div className="tooltip tooltip-bottom">
            <div className="tooltip-content bg-base-300 shadow-md shadow-black">
              <div className="text-sm">Help</div>
            </div>
          <button className="text-xl btn btn-ghost btn-sm m-2.5"><FaQuestionCircle /></button>
        </div>
      </div>
    </div>
  )
}