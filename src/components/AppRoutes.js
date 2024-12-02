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
import SessionRegister from "../pages/SessionRegister";
import TrainerPastSessions from "../pages/TrainerPastSessions";
import MemberPastSessions from "../pages/MemberPastSessions";
import Register from "../pages/Register";
import EditSchedule from "../pages/EditSchedule";
import ManageUsers from "../pages/ManageUsers";

const AppRoutes = () => {
  const { userType } = useUser();
  const navigate = useNavigate();

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
        path="/register"
        element={
          userType === "Admin" ? (
            <Navigate to="/admin/dashboard" replace />
          ) : userType === "Member" ? (
            <Navigate to="/member/dashboard" replace />
          ) : userType === "Trainer" ? (
            <Navigate to="/trainer/dashboard" replace />
          ) : (
            <Register />
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
        path="/admin/manage-users"
        element={
          <ProtectedRoute requiredRole="Admin">
            <ManageUsers />
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
        path="/trainer/edit-schedule"
        element={
          <ProtectedRoute requiredRole="Trainer">
            <EditSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainer/past-sessions"
        element={
          <ProtectedRoute requiredRole="Trainer">
            <TrainerPastSessions />
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
        path="/member/session-register"
        element={
          <ProtectedRoute requiredRole="Member">
            <SessionRegister />
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
        path="/member/past-sessions"
        element={
          <ProtectedRoute requiredRole="Member">
            <MemberPastSessions />
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
