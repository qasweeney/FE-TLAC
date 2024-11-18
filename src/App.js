import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import { useUser } from "./contexts/UserContext";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import EditSchedule from "./pages/EditSchedule";
import AppRoutes from "./components/AppRoutes";

function App() {
  const { userType, checkSession, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const initializeSession = async () => {
  //     await checkSession();
  //     if (location.pathname === "/" || location.pathname === "/login") {
  //       if (userType === "Admin") {
  //         navigate("/admin/dashboard", { replace: true });
  //       } else if (userType === "Trainer") {
  //         navigate("/trainer/dashboard", { replace: true });
  //       } else if (userType === "Member") {
  //         navigate("/member/dashboard", { replace: true });
  //       }
  //     }
  //   };

  //   initializeSession();
  // }, [checkSession, navigate, userType]);
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppRoutes />
    // <Routes>
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/admin/dashboard" element={<AdminDashboard />} />
    //   <Route path="/admin/profile" element={<Profile />} />
    //   <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
    //   <Route path="/trainer/profile" element={<Profile />} />
    //   <Route path="/trainer/edit-schedule" element={<EditSchedule />} />
    //   <Route path="/member/dashboard" element={<MemberDashboard />} />
    //   <Route path="/member/profile" element={<Profile />} />
    //   <Route path="*" element={<Home />} />
    // </Routes>
  );
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="" element={<Home />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route
  //         path="/admin/dashboard"
  //         element={
  //           <ProtectedRoute requiredRole="Admin">
  //             <AdminDashboard />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/trainer/dashboard"
  //         element={
  //           <ProtectedRoute requiredRole="Trainer">
  //             <TrainerDashboard />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/member/dashboard"
  //         element={
  //           <ProtectedRoute requiredRole="Member">
  //             <MemberDashboard />
  //           </ProtectedRoute>
  //         }
  //       />
  //     </Routes>
  //   </Router>
  // );
}

export default App;
