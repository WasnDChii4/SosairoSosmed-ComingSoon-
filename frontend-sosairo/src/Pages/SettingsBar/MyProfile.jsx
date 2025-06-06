import React, { useEffect, useState, useCallback } from 'react';
import axiosCLient from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import SettingsLayoutPage from '../../Layout/SettingsLayoutPage';

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({ name: '', username: '', email: '', about_me: '' });

  const goBackChannels = () => navigate(-1);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') goBackChannels();
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosCLient.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        withCredentials: true,
      });
      setUser(response.data);
      setEditData({
        name: response.data.name || '',
        username: response.data.username || '',
        email: response.data.email || '',
        about_me: response.data.about_me || '',
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, fetchProfile]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === 'username') {
      newValue = value.replace(/\s+/g, '-');
    }

    setEditData({
      ...editData,
      [name]: newValue,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosCLient.put('/api/user/update', editData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        withCredentials: true,
      });

      await fetchProfile();

      document.getElementById('editInfoUser').close();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <SettingsLayoutPage>
      <div className="fixed left-64 top-0 right-0 z-50 flex items-center justify-between px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button className="btn btn-ghost btn-lg" onClick={goBackChannels}>← Back</button>
      </div>

      <div className="bg-base-100 p-6 mt-16 rounded-lg shadow-md">
        {user ? (
          <>
            <div className="flex items-center gap-6 mb-10">

              {/* Avatar User */}
              <div className="avatar relative w-16 h-16">
                <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img src="/images/sosairo-logo2.png" alt="User Avatar" className="w-full h-full object-cover" />
                </div>
                <button className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs shadow transition-opacity duration-200" onClick={() => document.getElementById('editAvatarModal').showModal()} title="Edit Avatar">
                  ✎
                </button>
              </div>

              {/* Modal Edit Avatar */}
              <dialog id='editAvatarModal' className='modal'>
                <div className='modal-box'>
                  <h3 className='font-bold text-lg mb-4'>Edit Avatar</h3>
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
                <form method='dialog' className='modal-backdrop'><button>Close</button></form>
              </dialog>

              {/* Display Name & Username User */}
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.username}</p>
              </div>
            </div>

            {/* Display Email dan About Me User */}
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">Email</label>
                <input type="text" value={user.email} className="input w-full" disabled />
              </div>
              <div className="form-control">
                <label className="label">About Me</label>
                <textarea value={user.about_me} className="textarea w-full" disabled />
              </div>
              <button className="btn w-full" onClick={() => document.getElementById('editInfoUser').showModal()}>Edit</button>

            </div>

            {/* Modal Input User */}
            <dialog id='editInfoUser' className='modal'>
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div className="form-control space-y-2">
                    <label className="label">Name</label>
                    <input type="text" name="name" value={editData.name} onChange={handleEditChange} className="input w-full" />
                  </div>
                  <div className="form-control space-y-2">
                    <label className="label">Username</label>
                    <input type="text" name="username" value={editData.username} onChange={handleEditChange} className="input w-full" />
                  </div>
                  <div className="form-control space-y-2">
                    <label className="label">Email</label>
                    <input type="text" name="email" value={editData.email} onChange={handleEditChange} className="input w-full" />
                  </div>
                  <div className="form-control space-y-2">
                    <label className="label">About Me</label>
                    <textarea name="about_me" value={editData.about_me} onChange={handleEditChange} className="textarea w-full" />
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog" className="flex gap-2">
                    <button className="btn btn-error text-white" type="submit">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save</button>
                  </form>
                </div>
              </div>
              <form method='dialog' className='modal-backdrop'><button>Close</button></form>
            </dialog>
          </>
        ) : (
          <div className='flex justify-center items-center min-h-[150px]'>
            <span className="loading loading-ring loading-xl"></span>
          </div>
        )}
      </div>
    </SettingsLayoutPage>
  );
}
