import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome () {
  const navigate = useNavigate();

  const goToChannels = () => navigate('/channels/friends');

  return (
    <div className="min-h-screen hero" style={{ backgroundImage: "url('/images/hero-bg3.jpg')" }}>
      <div className="bg-black hero-overlay backdrop-blur-sm bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-xl">
          <img src="/images/sosairo-logo1.png" alt="SosairoLogo" className="w-20 h-auto mx-auto mb-10 border-4 border-black rounded-full sm:w-24 md:w-32 lg:w-40" /> 
          <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight">
            Your Story Starts Here on <span className="text-primary">Sosairo</span>
          </h1>
          <p className="pb-5 mb-5 text-lg">
            Dive into a world where your voice matters. <span className="text-primary">Sosairo</span> is more than a social platform. It's your digital playground to connect, express, and belong. <br />
            Make friends. Share your passion. Build your legacy.
          </p>
          <button onClick={goToChannels} className="btn btn-primary rounded-full btn-wide animate-bounce shadow-md shadow-[#5854ec]">Join Now</button>
        </div>
      </div>
    </div>
  )
}