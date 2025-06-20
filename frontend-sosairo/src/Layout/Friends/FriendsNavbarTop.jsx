import React from "react";
import { useLocation } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";

const routeTitles = {
  "/channels/friends": "Friends - Direct Message",
};

export default function FriendsNavbarTop() {
  const location = useLocation();
  const currentPath = location.pathname;

  const title = routeTitles[currentPath] || "Untitled Page";

  return (
    <div className="fixed left-20 right-0 top-0 flex items-center h-16 px-4 gap-6 bg-gray-700 shadow shadow-black justify-between">
      <div className="text-2xl font-bold text-white">{title}</div>
      <div className="flex items-center gap-4">        
        <button className="btn btn-md bg-base-300 hover:bg-base-100" onClick={() => document.getElementById("myModalSearch").showModal()}>
          Find or start a conversation
        </button>
        
        <div className="w-px h-8 bg-neutral-content opacity-50"></div>
      
        <div className="tooltip tooltip-bottom" data-tip="Add Friends">
          <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-primary" onClick={() => document.getElementById("addFriends").showModal()}>
            <FaUserFriends size={16} />
          </button>
        </div>
      </div>
      <dialog id="myModalSearch" className="modal">
        <div className="modal-box">
          <label className="input w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow w-full" placeholder="Where would you like to go?" />
          </label>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
      <dialog id="addFriends" className="modal">
        <div className="modal-box">
          <div className="mb-8 space-y-2">
            <h3 className="font-bold text-lg">Add New Friends</h3>
            <p className="text-sm mb-4">You can add friends with their Username.</p>
          </div>
          <label className="input w-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16" className="opacity-60">
              <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="search" className="grow w-full" placeholder="Enter friend's username" />
          </label>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}
