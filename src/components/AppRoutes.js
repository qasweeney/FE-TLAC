import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import TrainerDashboard from "../pages/TrainerDashboard";
import MemberDashboard from "../pages/MemberDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUser } from "../contexts/UserContext";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Home from "../pages/Home";

const AppRoutes = () => {
  const { userType } = useUser();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute requiredRole="Admin">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainer/dashboard"
        element={
          <ProtectedRoute requiredRole="Trainer">
            <TrainerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainer/profile"
        element={
          <ProtectedRoute requiredRole="Trainer">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/dashboard"
        element={
          <ProtectedRoute requiredRole="Member">
            <MemberDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member/profile"
        element={
          <ProtectedRoute requiredRole="Member">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default AppRoutes;
