import React, { useState } from "react";
import axiosCLient from "../../../api/axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleChangeLogin = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      await axiosCLient.get('/sanctum/csrf-cookie', {
        withCredentials: true
      });
      
      const response = await axiosCLient.post('/api/loginSosairo', formData, {
        withCredentials: true
      });
      
      localStorage.setItem('token', response.data.token);

      Swal.fire('Success!', response.data.message, 'success');
      
      navigate('/channels/friends'); 
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Login gagal', 'error');
    }
  }
  
  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );  

  const EyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 9.964 0 012.293-3.95M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: "url('/images/registerLogin-bg4.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
      <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-lg backdrop-filter backdrop-blur-lg space-y-6">
        <div className="text-center font-bold text-2xl md:text-4xl">
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmitLogin} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="" className="block text-lg font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChangeLogin} className="w-full px-3 py-2 border rounded-lg focus:outline-none" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg font-semibold">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChangeLogin} className="w-full px-3 pr-10 py-2 border rounded-lg focus:outline-none" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">{showPassword ? <EyeClosed /> : <EyeOpen />}</button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChangeLogin} className="checkbox border-white bg-white checked:border-neutral checked:bg-neutral" />
            <label htmlFor="remember_me" className="text-lg font-semibold">Remember Me</label>
          </div>
          <button type="submit" className="w-full bg-blue-800 py-2 rounded-lg hover:bg-blue-900 font-bold">Login</button>
          <div className="text-center">
            <span>Don't have an account? </span><a href="/registerSosairo" className="text-blue-500 underline">Register here</a>
          </div>
        </form>
      </div>
    </div>
  )
}