import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import axiosCLient from "../api/axios";

export default function SidebarLeft() {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/servers")
  //     .then((res) => res.json())
  //     .then((data) => setServers(data))
  //     .catch(() => setServers([]));
  // }, []);

  const handleLogout = async () => {
    try {
      // await axiosCLient.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      //   withCredentials: true
      // });

      await axiosCLient.post("http://127.0.0.1:8000/api/logoutSosairo", {}, {
        withCredentials: true
      });

      navigate("/loginSosairo"); 
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }

  return (
    <div className="fixed top-12 left-0 w-16 h-[calc(100vh-3rem)] bg-neutral text-neutral-content flex flex-col items-center py-4 space-y-4 z-40">
      <div className="tooltip tooltip-right">
        <div className=" tooltip-content bg-base-300 shadow-md shadow-black">
          <div className="text-sm">Direct Message</div>
        </div>
        <button onClick={() => navigate('/channels/friends')} className="w-12 h-12 btn btn-circle btn-sm bg-primary hover:bg-primary-focus">
          <img src="/images/sosairo-logo2.png" alt="LogoSosairo" />
        </button>
      </div>

      <div className="tooltip tooltip-right">
        <div className="tooltip-content bg-base-300 shadow-md shadow-black">
          <div className="text-sm"></div>
        </div>
        {servers.length > 0 && (
          servers.map((server, index) => (
            <button key={index} className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-accent-focus" title={server.name}>
              {server.icon ? (
                <img src={server.icon} alt={server.name} className="object-cover w-6 h-6 rounded-full" />
              ) : (
                <span className="text-xs font-bold">
                  {server.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          ))
        )}
      </div>
      
      <div className="tooltip tooltip-right">
        <div className="tooltip-content bg-base-300 shadow-md shadow-black">
          <div className="text-sm">Add Server</div>
        </div>
        <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-success-focus hover:bg-primary" onClick={() => document.getElementById("my_modal_server").showModal()}>
          <FaPlus size={18} />
        </button>
      </div>
      <dialog id="my_modal_server" className="modal">
          <div className="modal-box">
          {/* <label className="input w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow w-full" placeholder="Where would you like to go?" />
          </label> */}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>

      <div className="flex-1"></div>

      <div className="flex flex-col mb-2 space-y-3 space-x-5 dropdown dropdown-right dropdown-end">
        <div className="tooltip tooltip-right" tabIndex={0}>
          <div className="tooltip-content bg-base-300 shadow-md shadow-black">
            <div className="text-sm">Menu</div>
          </div>
          <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-primary">
            <FaEllipsisV size={16} />
          </button>
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-slate-700 rounded-box z-1 w-40 p-2 shadow-sm">
          <li><button>Profile</button></li>
          <li><button>Setting</button></li>
          <li className="text-red-500"><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
};
