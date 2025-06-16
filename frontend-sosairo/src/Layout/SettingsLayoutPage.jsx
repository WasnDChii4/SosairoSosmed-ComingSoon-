import React from "react";
import { useLocation } from "react-router-dom";

export default function SettingsLayoutPage({ children }) {
  const location = useLocation();

  // Daftar menu navigasi sidebar
  const menuItems = [
    { name: "My Profile", path: "/settings/myProfile" },
  ];

  return (
    <div className="flex h-screen text-base-content">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1f22] text-white overflow-y-auto p-4">
        <h2 className="text-2xl font-semibold mb-3">User Settings</h2>
        <div className="w-full">
          <ul className="menu space-y-2 w-full">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <a href={item.path} className={`rounded px-3 py-2 block transition-all ${ isActive ? "bg-primary text-white font-semibold" : "hover:bg-gray-700 text-gray-300" }`}>
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 bg-[#313338] text-white overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
