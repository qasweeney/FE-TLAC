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
import CreateSession from "../pages/CreateSession";

const AppRoutes = () => {
  const { userType } = useUser();
  const navigate = useNavigate();

  console.log(userType);

  return (
    <Routes>
      <Route
        path=""
        element={
          userType === "Admin" ? (
            <Navigate to="/admin/dashboard" replace />
          ) : userType === "Member" ? (
            <Navigate to="/member/dashboard" replace />
          ) : userType === "Trainer" ? (
            <Navigate to="/trainer/dashboard" replace />
          ) : (
            <Home />
          )
        }
      />
      <Route
        path="/login"
        element={
          userType === "Admin" ? (
            <Navigate to="/admin/dashboard" replace />
          ) : userType === "Member" ? (
            <Navigate to="/member/dashboard" replace />
          ) : userType === "Trainer" ? (
            <Navigate to="/trainer/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
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
        path="/trainer/create-session"
        element={
          <ProtectedRoute requiredRole="Trainer">
            <CreateSession />
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
      <Route
        path="*"
        element={
          userType === "Admin" ? (
            <Navigate to="/admin/dashboard" replace />
          ) : userType === "Member" ? (
            <Navigate to="/member/dashboard" replace />
          ) : userType === "Trainer" ? (
            <Navigate to="/trainer/dashboard" replace />
          ) : (
            <Navigate to="" replace />
          )
        }
      />

      {/* <Route path="*" element={<Navigate to="" replace />} /> */}
    </Routes>
  );
};

export default AppRoutes;
