import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import axiosCLient from "../api/axios";

export default function MainSidebarLeft() {
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dialogRef = useRef(null);
  const [serverName, setServerName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, []);

  // ⬇️ Pindahkan fetchServers ke luar useEffect agar bisa dipanggil ulang
  const fetchServers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosCLient.get("/api/servers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServers(res.data.servers);
    } catch (error) {
      console.error("Gagal mengambil daftar server:", error);
    }
  };

  const handleAddServer = async (e) => {
    e.preventDefault();

    if (!serverName) return alert("Nama server wajib diisi");

    try {
      const formData = new FormData();
      formData.append("name", serverName);
      if (fileInputRef.current?.files[0]) {
        formData.append("icon", fileInputRef.current.files[0]);
      }

      const token = localStorage.getItem("token");

      const res = await axiosCLient.post("/api/servers", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      // ✅ Setelah berhasil menambahkan, langsung fetch ulang agar icon muncul
      await fetchServers();

      // Reset form
      setServerName("");
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      dialogRef.current?.close();
    } catch (error) {
      console.error("Gagal tambah server:", error);

      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        alert(Object.values(errors).flat().join("\n"));
      } else {
        alert("Gagal menambahkan server");
      }
    }
  };

  useEffect(() => {
    fetchServers();
  }, []);

  const goToSettings = () => navigate('/settings/myProfile');

  const handleLogout = async () => {
    try {
      await axiosCLient.post("http://127.0.0.1:8000/api/logoutSosairo", {}, {
        withCredentials: true
      });

      localStorage.removeItem('token');
      navigate("/loginSosairo");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return (
    <div className="fixed top-12 left-0 w-16 h-[calc(100vh-3rem)] bg-neutral text-neutral-content flex flex-col z-40">
      <div className="flex flex-col items-center py-4 space-y-4">
        <div className="tooltip tooltip-right">
          <div className="tooltip-content bg-base-300 shadow-md shadow-black">
            <div className="text-sm">Direct Message</div>
          </div>
          <button onClick={() => navigate('/channels/friends')} className="w-12 h-12 btn btn-circle btn-sm bg-primary hover:bg-primary-focus">
            <img src="/images/sosairo-logo2.png" alt="LogoSosairo" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col items-center space-y-4 pb-4 overflow-x-hidden hide-scrollbar">
        {servers.length > 0 && (
          servers.map((server, index) => (
            <div key={index} className="tooltip tooltip-right" data-tip={server.name}>
              <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 p-0 overflow-hidden">
                {server.icon ? (
                  <img
                    src={server.icon}
                    alt={server.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-xs font-bold">
                    {server.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
            </div>
          ))
        )}

        <div className="tooltip tooltip-right" data-tip="Add Server">
          <button className="w-12 h-12 btn btn-circle btn-sm bg-base-100 hover:bg-success-focus hover:bg-primary" onClick={() => document.getElementById("addServer").showModal()}>
            <FaPlus size={18} />
          </button>
        </div>

        <dialog id="addServer" className="modal" ref={dialogRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Add New Server</h3>
            <form method="dialog" className="space-y-4">
              <div className="form-control space-y-2">
                <div className="flex justify-center">
                  <label onClick={handleLabelClick} className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full cursor-pointer overflow-hidden hover:border-primary transition relative">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <svg className="w-6 h-6 mb-1 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V17a2 2 0 002 2h14a2 2 0 002-2v-.5M7 10l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                        <p className="text-xs text-gray-500 font-medium">Klik untuk unggah</p>
                        <p className="text-[10px] text-gray-400">PNG, JPG, JPEG</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="form-control space-y-2">
                <label className="label">
                  <span className="label-text">Server Name</span>
                </label>
                <input type="text" placeholder="Enter server name" className="input input-bordered w-full" value={serverName} onChange={(e) => setServerName(e.target.value)} />
              </div>

              <div className="modal-action flex justify-between pt-4">
                <button className="btn btn-error text-white" formMethod="dialog">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleAddServer}>Add</button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      </div>

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
