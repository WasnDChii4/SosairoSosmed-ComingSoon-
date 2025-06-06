import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import axiosCLient from "../api/axios";

export default function MainSidebarLeft() {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/servers")
  //     .then((res) => res.json())
  //     .then((data) => setServers(data))
  //     .catch(() => setServers([]));
  // }, []);

  const goToSettings = () => navigate('/settings/myProfile');

  const handleLogout = async () => {
    try {
      await axiosCLient.post("http://127.0.0.1:8000/api/logoutSosairo", {}, {
        withCredentials: true
      });

      localStorage.removeItem('token')

      navigate("/loginSosairo"); 
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  }

  return (
    <div className="fixed top-12 left-0 w-16 h-[calc(100vh-3rem)] bg-neutral text-neutral-content flex flex-col z-40">
    {/* Bagian atas sidebar */}
    <div className="flex flex-col items-center py-4 space-y-4">
      {/* Logo */}
      <div className="tooltip tooltip-right">
        <div className="tooltip-content bg-base-300 shadow-md shadow-black">
          <div className="text-sm">Direct Message</div>
        </div>
        <button onClick={() => navigate('/channels/friends')} className="w-12 h-12 btn btn-circle btn-sm bg-primary hover:bg-primary-focus">
          <img src="/images/sosairo-logo2.png" alt="LogoSosairo" />
        </button>
      </div>
    </div>

    {/* Scrollable middle */}
    <div className="flex-1 overflow-y-auto flex flex-col items-center space-y-4 pb-4 overflow-x-hidden hide-scrollbar">
      {/* Server list */}
      {servers.length > 0 && (
        servers.map((server, index) => (
          <div key={index} className="tooltip tooltip-right" data-tip={server.name}>
            <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-accent-focus">
              {server.icon ? (
                <img src={server.icon} alt={server.name} className="object-cover w-6 h-6 rounded-full" />
              ) : (
                <span className="text-xs font-bold">
                  {server.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          </div>
        ))
      )}

      {/* Add server */}
      <div className="tooltip tooltip-right" data-tip="Add Server">
        <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-success-focus hover:bg-primary" onClick={() => document.getElementById("addServer").showModal()}>
          <FaPlus size={18} />
        </button>
      </div>
      <dialog id="addServer" className="modal">
        <div className="modal-box w-96">
          <h3 className="font-bold text-lg mb-4">Add New Server</h3>
          <form method="dialog" className="space-y-4">
            {/* Server Name */}
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text">Server Name</span>
              </label>
              <input type="text" placeholder="Enter server name" className="input input-bordered w-full" />
            </div>

            {/* Server Icon */}
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text">Server Icon</span>
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V17a2 2 0 002 2h14a2 2 0 002-2v-.5M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <p className="mb-1 text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk unggah</span>
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, JPEG</p>
                </div>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            {/* Action Buttons */}
            <div className="modal-action flex justify-between pt-4">
              <button className="btn btn-error text-white" formMethod="dialog">Cancel</button>
              <button className="btn btn-primary" type="submit">Add</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>

    {/* Dialog (tetap di luar scroll) */}
    <dialog id="addServer" className="modal">
      <div className="modal-box">
        <label className="input w-full">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" className="grow w-full" placeholder="" />
        </label>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>

    {/* Bagian bawah sidebar */}
    <div className="flex flex-col items-center mb-2 space-y-3 space-x-5 dropdown dropdown-right dropdown-end">
      <div className="tooltip tooltip-right" tabIndex={0}>
        <div className="tooltip-content bg-base-300 shadow-md shadow-black">
          <div className="text-sm">Menu</div>
        </div>
        <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-primary">
          <FaEllipsisV size={16} />
        </button>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-slate-700 rounded-box z-1 w-40 p-2 shadow-sm">
        <li><button onClick={goToSettings}>Setting</button></li>
        <li className="text-red-500"><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  </div>
  );
};
