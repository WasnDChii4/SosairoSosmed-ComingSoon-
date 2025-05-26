import React, { useEffect, useState, useCallback } from 'react';
import axiosCLient from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import SettingsLayoutPage from '../../Layout/SettingsLayoutPage';

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({ email: '', about_me: '' });

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
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
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

      document.getElementById('my_modal_5').close();
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
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="/images/sosairo-logo2.png" alt="User Avatar" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.username}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="form-control">
                <label className="label">Email</label>
                <input type="text" value={user.email} className="input w-full" disabled />
              </div>
              <div className="form-control">
                <label className="label">About Me</label>
                <textarea value={user.about_me} className="textarea w-full" disabled />
              </div>
              <button className="btn w-full" onClick={() => document.getElementById('my_modal_5').showModal()}>Edit</button>

              {/* Modal */}
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                  <div className="space-y-4">
                    <div className="form-control">
                      <label className="label">Email</label>
                      <input type="text" name="email" value={editData.email} onChange={handleEditChange} className="input w-full" />
                    </div>
                    <div className="form-control">
                      <label className="label">About Me</label>
                      <textarea name="about_me" value={editData.about_me} onChange={handleEditChange} className="textarea w-full" />
                    </div>
                  </div>
                  <div className="modal-action">
                    <form method="dialog" className="flex gap-2">
                      <button className="btn" type="submit">Cancel</button>
                      <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
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
