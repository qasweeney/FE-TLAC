import { useState } from "react";
import Navbar from "../components/Navbar";
import { replace, useNavigate } from "react-router-dom";
import "./register.css";
const apiUrl = process.env.REACT_APP_API_URL;

function Register() {
  const [role, setRole] = useState("member");

  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return value;
  };

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("role", role);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      Email: formData.get("email"),
      Password: formData.get("password"),
      FirstName: formData.get("firstname"),
      LastName: formData.get("lastname"),
      Phone: formData.get("phone"),
    });
    if (role === "trainer") {
      raw = JSON.stringify({
        Email: formData.get("email"),
        Password: formData.get("password"),
        FirstName: formData.get("firstname"),
        LastName: formData.get("lastname"),
        Phone: formData.get("phone"),
        Bio: formData.get("bio"),
        SessionPrice: formData.get("sessionprice"),
      });
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}${role}s/register`, requestOptions)
      .then((response) => {
        if (response.ok) {
          alert("Registration successful");
          navigate("/login");
        } else {
          alert("Registration failed");
        }
        return response.text();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Navbar />
      <div className="register">
        <form onSubmit={handleSubmit}>
          <label>
            Register as:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="member">Member</option>
              <option value="trainer">Trainer</option>
            </select>
          </label>

          {role === "member" && (
            <div className="form-section">
              <h3>Member Registration</h3>
              <label htmlFor="firstname">First Name:</label>
              <input
                name="firstname"
                id="firstname"
                type="text"
                placeholder="Nick"
                required
              />
              <label htmlFor="lastname">Last Name:</label>
              <input
                name="lastname"
                id="lastname"
                type="text"
                placeholder="Saban"
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="text"
                id="email"
                placeholder="nick.saban@rolltide.com"
                required
              />
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(123) 456-7890"
                maxLength={14}
                minLength={14}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>
          )}

          {role === "trainer" && (
            <div className="form-section">
              <h3>Trainer Registration</h3>
              <div>
                <label htmlFor="firstname">First Name:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                  minLength={14}
                  required
                />
              </div>
              <div>
                <label htmlFor="bio">Bio:</label>
                <textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself"
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <label htmlFor="sessionprice">Session Price ($):</label>
                <input
                  type="number"
                  id="sessionprice"
                  name="sessionprice"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
