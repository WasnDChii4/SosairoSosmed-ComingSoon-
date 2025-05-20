// pages/MyAccount.jsx
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsLayoutPage from '../../Layout/SettingsLayoutPage';

export default function MyProfile() {
  const navigate = useNavigate();
  const goBackChannels = () => {
    navigate(-1);
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      goBackChannels();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);


  return (
    <SettingsLayoutPage>
      <div className="fixed left-64 top-0 right-0 z-50 flex items-center justify-between px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button className="btn btn-ghost btn-lg bg-transparent border-none hover:bg-transparent shadow-none" onClick={goBackChannels}>← Back</button>
      </div>

      <div className="bg-base-100 p-6 mt-16 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://placekitten.com/200/200" alt="User Avatar" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">ワセン</h2>
            <p className="text-sm text-gray-400">wasnkazuko</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">Email</label>
            <input type="email" value="user@gmail.com" className="input input-bordered" readOnly />
          </div>
          <div className="form-control">
            <label className="label">Phone Number</label>
            <input type="text" value="*********3587" className="input input-bordered" readOnly />
          </div>

          <button className="btn btn-primary mt-4">Change Password</button>
        </div>
      </div>
    </SettingsLayoutPage>
  );
}
