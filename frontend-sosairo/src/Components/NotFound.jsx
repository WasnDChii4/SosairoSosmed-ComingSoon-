import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 overflow-hidden text-white">
      <div className="flex flex-row flex-wrap items-center justify-center w-full max-w-6xl gap-8">
        <div className="flex justify-center md:order-2">
          <img src="https://i.imgur.com/qIufhof.png" alt="404" className="w-72 md:w-96 opacity-80" />
        </div>
        <div className="max-w-xl text-center md:text-left md:order-1">
          <h1 className="mb-4 text-6xl font-extrabold text-red-500 animate-pulse">404</h1>
          <p className="mb-2 text-2xl font-semibold">Page Not Found</p>
          <p className="mb-6 text-gray-400">Oops... Looks like you've wandered into the void</p>
          <button onClick={() => navigate('/channels/directMessages')} className="animate-bounce shadow-lg shadow-[#5854ec] px-6 py-3 text-white transition duration-300 ease-in-out bg-indigo-600 rounded-full  btn btn-primary hover:bg-indigo-500 mt-3">
            🚀 Go Back Channels
          </button>
        </div>
      </div>
    </div>
  )
}