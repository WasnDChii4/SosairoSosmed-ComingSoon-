import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './Components/NotFound';
import Welcome from "./Pages/Welcome";
import Friends from './Pages/Friends';
import RegisterUser from './Pages/Login&Register/User/RegisterUser';
import LoginUser from './Pages/Login&Register/User/LoginUser';
import MyProfile from './Pages/SettingsBar/MyProfile';
import ProtectedRoute from './Middleware/ProtectedRoute';
import ServerPage from './Pages/ServerPage';
import MainLayoutPage from './Layout/Main/MainLayoutPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/registerSosairo' element={<RegisterUser />}></Route>
        <Route path='/loginSosairo' element={<LoginUser />}></Route>
        <Route path='/' element={<Welcome />}></Route>
        <Route path='/channels' element={<MainLayoutPage />}>
          <Route path='friends' element={<ProtectedRoute><Friends /></ProtectedRoute>}></Route>
          <Route path='server/:serverId' element={<ProtectedRoute><ServerPage /></ProtectedRoute>}></Route>
        </Route>
        <Route path='/settings/myProfile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}
