import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import "./Login.css";
import "./Login.css";
const apiUrl = process.env.REACT_APP_API_URL;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Member");
  const { setUserType: setGlobalUserType, logout } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTrainer = async (id) => {
    let result;
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      result = await fetch(`${apiUrl}trainers/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result.isActive;
        })
        .catch((error) => console.error(error));
    } catch (error) {
      setError("Error");
    }
    return result;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${apiUrl}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, userType }),
      });
      if (response.ok) {
        setGlobalUserType(userType);
        let res = await response.json();
        console.log(res.userId);

        if (userType === "Admin") {
          navigate("/admin/dashboard");
        } else if (userType === "Trainer") {
          const trainerActive = await fetchTrainer(res.userId);
          if (trainerActive) {
            console.log(trainerActive);
            navigate("/trainer/dashboard");
          } else {
            alert("Trainer account not yet approved by TLAC staff.");
            await logout();
            navigate("/");
          }
        } else {
          navigate("/member/dashboard");
        }
      } else {
        setError("Invalid credentials or user type");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  




  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
      <div className="input-wrapper">
        <input
          type="text"
          id="username"
          placeholder=" "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="username">Username</label>
       </div>
       <div className="input-wrapper">
        <input
          type="password"
          id="password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        </div>

        <div className="input-wrapper">
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Trainer">Trainer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
  );
}

export default Login;
