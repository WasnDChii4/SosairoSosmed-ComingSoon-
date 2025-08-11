import React, { useEffect, useRef, useState } from "react";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import axiosCLient from "../../api/axios";
import { FaFolderPlus, FaHashtag, FaGear, FaUserPlus, FaPlus } from "react-icons/fa6";

export default function ServerSidebarLeft() {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [serverName, setServerName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openChannelModal, setOpenChannelModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState("text");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const serverMatch = matchPath("/channels/server/:serverId/*", location.pathname);
  const serverId = serverMatch?.params?.serverId;

  const fetchServerInfo = async () => {
    if (!serverId) return;
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const res = await axiosCLient.get(`/api/server/${serverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServerName(res.data.name_server || `Server ${serverId}`);
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Gagal mengambil data server:", error);
      const fallbackName = error?.response?.data?.name_server ?? `Server ${serverId}`;
      setServerName(fallbackName);
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    fetchServerInfo();

    if (dropdownRef.current && dropdownRef.current.open) {
      dropdownRef.current.open = false;
    }
  }, [serverId]);

  const goToChannel = (channelId) => {
    navigate(`/channels/server/${serverId}/${channelId}`);
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
  
    const token = localStorage.getItem("token");
  
    try {
      await axiosCLient.post(
        "/api/categories",
        {
          server_id: serverId,
          name: newCategoryName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setOpenCategoryModal(false);
      setNewCategoryName("");
      fetchServerInfo();
    } catch (error) {
      console.error("Gagal membuat kategori:", error);
      alert("Gagal membuat kategori");
    }
  };  

  const handleCreateChannel = async () => {
    const token = localStorage.getItem("token");
    await axiosCLient.post("/api/channel", {
      server_id: serverId,
      name: newChannelName,
      type: newChannelType,
      category_id: selectedCategoryId
    }, { headers: { Authorization: `Bearer ${token}` } });
    setOpenChannelModal(false);
    setNewChannelName("");
    setSelectedCategoryId(null);
    fetchServerInfo();
  };

  const title = isLoading
    ? <span className="loading loading-dots loading-md"></span>
    : serverName || "Server";

  return (
    <div className="w-64 bg-[#2B2D31] text-white flex flex-col h-full">
      <div className="h-12 px-2 pt-2 pb-12 border-b-2 border-[#1f1f1f]">
        <details ref={dropdownRef} className="dropdown w-full">
          <summary className="btn btn-ghost justify-between w-full text-left font-bold text-white text-lg px-2 hover:bg-[#3a3c41] rounded">
            <span>{title}</span>
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box mt-1 w-full">
            <li><button onClick={() => setOpenCategoryModal(true)}><FaFolderPlus className="inline mr-2" /> Create Category</button></li>
            <li><button onClick={() => setOpenChannelModal(true)}><FaHashtag className="inline mr-2" /> Create Channel</button></li>
            <li><a><FaGear className="inline mr-2" /> Server Settings</a></li>
            <li><a><FaUserPlus className="inline mr-2" /> Invite People</a></li>
            <li><a className="text-red-500">Leave Server</a></li>
          </ul>
        </details>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 hide-scrollbar">
        {categories.map((category) => (
          <div key={category.id}>
            <div className="flex justify-between items-center text-xs text-[#8e9297] font-semibold uppercase mb-1">
              <span>{category.name}</span>
              <button onClick={() => { setOpenChannelModal(true); setSelectedCategoryId(category.id); }} className="text-white hover:text-green-400"><FaPlus /></button>
            </div>
            <ul className="space-y-1">
              {category.channels.map((channel) => (
                <li key={channel.id} className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-[#3a3c41] cursor-pointer ${location.pathname.includes(channel.id) ? 'bg-[#40444b]' : ''}`} onClick={() => goToChannel(channel.id)}>
                  <FaHashtag className="text-gray-400" />
                  <span className="text-sm">{channel.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal Create Category */}
      {openCategoryModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-8 ">Create Category</h3>
            <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Category Name" className="input input-bordered w-full" />
            <div className="modal-action">
              <button className="btn" onClick={() => setOpenCategoryModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateCategory}>Create</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpenCategoryModal(false)}>Close</button>
          </form>
        </dialog>
      )}

      {/* Modal Create Channel */}
      {openChannelModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-8">Create Channel</h3>
            <div className="space-y-6">
              <input type="text" value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)} placeholder="Channel Name" className="input input-bordered w-full" />
              <select value={newChannelType} onChange={(e) => setNewChannelType(e.target.value)} className="select select-bordered w-full">
                <option value="text">Text</option>
                <option value="voice">Voice</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setOpenChannelModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateChannel}>Create</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpenChannelModal(false)}>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}
