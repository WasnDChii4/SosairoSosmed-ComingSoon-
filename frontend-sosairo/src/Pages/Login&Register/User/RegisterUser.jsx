import React, { useState } from "react";
import axiosCLient from "../../../api/axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFOrmData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChangeRegister = (e) => {
    setFOrmData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axiosCLient.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await axiosCLient.post("http://127.0.0.1:8000/api/registerSosairo", formData, {
        withCredentials: true,
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil!',
        text: `Selamat datang, ${response.data.user.name}!`,
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/loginSosairo');
      });
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const errorMessages = err.response.data.errors;
        let message = '';
  
        for (const field in errorMessages) {
          message += `${errorMessages[field][0]}\n`;
        }
        Swal.fire({
          icon: 'error',
          title: 'Registrasi Gagal',
          text: message
        });
        setError(errorMessages);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Terjadi kesalahan',
          text: 'Silakan coba lagi nanti.'
        });
      }
    }
  };

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
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/images/registerLogin-bg3.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="p-8 rounded-xl shadow-2xl w-full max-w-xs md:max-w-lg backdrop-filter backdrop-blur-lg space-y-6">
        <div className="text-center font-bold text-2xl md:text-4xl">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmitRegister} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-lg font-semibold">Nama</label>
            <input type="text" name="name" value={formData.name} onChange={handleChangeRegister} className="w-full px-3 py-2 border rounded-lg focus:outline-none" placeholder="Enter your name" />
            {error?.name && <p className="text-red-500 text-sm">{error.name[0]}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-semibold">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChangeRegister} className="w-full px-3 py-2 border rounded-lg focus:outline-none" placeholder="Enter your email" />
            {error?.email && <p className="text-red-500 text-sm">{error.email[0]}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-lg font-semibold">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChangeRegister} className="w-full px-3 pr-10 py-2 border rounded-lg focus:outline-none" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">{showPassword ? <EyeClosed /> : <EyeOpen />}</button>
              {error?.password && <p className="text-red-500 text-sm">{error.password[0]}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password_confirmation" className="block text-lg font-semibold">Confirm Password</label>
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name="password_confirmation" value={formData.password_confirmation} onChange={handleChangeRegister} className="w-full px-3 pr-10 py-2 border rounded-lg focus:outline-none" placeholder="Enter your confirmed password" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5">{showConfirmPassword ? <EyeClosed /> : <EyeOpen />}</button>
              {error?.confirm_password && <p className="text-red-500 text-sm">{error.confirm_password[0]}</p>}
            </div>
          </div>
          {error?.general && <p className="text-red-500 text-sm">{error.general}</p>}
          {success && <p className="text-green-600 font-semibold text-sm">{success}</p>}
          <button type="submit" className="w-full bg-blue-800 py-2 rounded-lg hover:bg-blue-900 font-bold">Register</button>
          <div className="text-center">
            <span>Already have an account? </span><a href="/loginSosairo" className="text-blue-500 underline">Login here</a>
          </div>
        </form>
      </div>
    </div>
  )
}