import React from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { userType, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const guestLinks = [
    { path: "/", label: "Home" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  const memberLinks = [
    { path: "/member/dashboard", label: "Dashboard" },
    { path: "/member/profile", label: "Profile" },
    { path: "/member/past-sessions", label: "Past Sessions" },
    { path: "/member/session-register", label: "Register for a Session" },
    { action: handleLogout, label: "Logout" },
  ];

  const trainerLinks = [
    { path: "/trainer/dashboard", label: "Dashboard" },
    { path: "/trainer/profile", label: "Profile" },
    { path: "/trainer/create-session", label: "Create Session" },
    { path: "/trainer/edit-schedule", label: "Edit Schedule" },
    { path: "/trainer/past-sessions", label: "Past Sessions/Data" },
    { action: handleLogout, label: "Logout" },
  ];

  const adminLinks = [
    { path: "/admin/dashboard", label: "Admin Dashboard" },
    { path: "/manage-users", label: "Manage Users" },
    { path: "/admin/profile", label: "Profile" },
    { action: handleLogout, label: "Logout" },
  ];

  const links =
    userType === "Admin"
      ? adminLinks
      : userType === "Member"
      ? memberLinks
      : userType === "Trainer"
      ? trainerLinks
      : guestLinks;

  return (
    <nav className="navbar">
    <div className="navbar-left">
        <div className="logo">
          <FontAwesomeIcon icon={faDumbbell} size="lg" />
          <span>Train Like A Champion</span>
        </div>
      </div>
      <div className="navbar-links">
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {link.path ? (
              <Link to={link.path}>{link.label}</Link>
            ) : (
              <button onClick={link.action}>{link.label}</button>
            )}
          </li>
        ))}
      </ul>
    </div>

      
      <div className="user-icon">
        <Link to="/profile">
          <FaUserCircle size={30} />
        </Link>
      </div>

      
    </nav>
  );
}

export default Navbar;
