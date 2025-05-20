import React, { Children } from "react"
import { useNavigate } from "react-router-dom"

export default function SettingsLayoutPage({ children }) {
  return (
    <div className="flex h-screen text-base-content">
    {/* Sidebar */}
    <aside className="w-64 bg-[#1e1f22] text-white overflow-y-auto p-4">
      <h2 className="text-2xl font-semibold mb-3">User Settings</h2>
      <div className="w-full">        
        <ul className="menu space-y-2 w-full">
          <li><a href="/settings/myProfile">My Profile</a></li>
        </ul>
      </div>
    </aside>

    {/* Konten */}
    <main className="flex-1 bg-[#313338] text-white overflow-y-auto p-6">{children}</main>
  </div>
  )
}