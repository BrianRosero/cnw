// Enrutamiento (routes.jsx)
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/pages/Home.jsx";
import Login from "../views/authentication/authentication3/Login3.jsx";
import Register from "../views/authentication/authentication3/Register3.jsx";
import Profile from "../views/pages/Profile.jsx";
import BoardUser from "../views/pages/BoardUser.jsx";
import BoardModerator from "../views/pages/BoardModerator.jsx";
import BoardAdmin from "../views/pages/BoardAdmin.jsx";
import MainLayout from '@/layout/MainLayout/index.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user" element={<BoardUser />} />
      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/admin" element={<BoardAdmin />} />
    </Routes>
  );
};

export default AppRoutes;
