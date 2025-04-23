import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './Components/NotFound';
import Welcome from "./Pages/Welcome";
import Friends from './Pages/Friends';
import RegisterUser from './Pages/Login&Register/User/RegisterUser';
import LoginUser from './Pages/Login&Register/User/LoginUser';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/registerSosairo' element={<RegisterUser />}></Route>
        <Route path='/loginSosairo' element={<LoginUser />}></Route>
        <Route path='/' element={<Welcome />}></Route>
        <Route path='/channels/friends' element={<Friends />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}
