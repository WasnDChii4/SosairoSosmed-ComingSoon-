import React from "react"

export default function SettingsLayoutPage() {
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <aside className="w-64 bg-[#1e1f22] text-white overflow-y-auto p-4">
      <ul className="space-y-2">
        <li className="font-semibold">My Account</li>
        <li>Profiles</li>
        <li>Content & Social</li>
        <li>Data & Privacy</li>
        <li className="bg-gray-700 px-2 py-1 rounded">Family Center</li>
        <li>Authorized Apps</li>
        <li>Devices</li>
        <li>Connections</li>
        <li>Clips</li>
      </ul>
    </aside>

    {/* Konten */}
    <main className="flex-1 bg-[#313338] text-white overflow-y-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Devices</h2>
      <p className="mb-6">
        Here are all the devices that are currently logged in with your Discord account...
      </p>

      {/* Contoh daftar perangkat panjang */}
      <div className="space-y-4">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="p-4 bg-gray-800 rounded">
            <p><strong>Device {i + 1}</strong> - Windows / Chrome</p>
            <p className="text-sm text-gray-400">Semarang, Central Java - less than an hour ago</p>
          </div>
        ))}
      </div>
    </main>
  </div>
  )
}