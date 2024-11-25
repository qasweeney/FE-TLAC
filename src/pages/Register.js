import { useState } from "react";
import Navbar from "../components/Navbar";
import { replace, useNavigate } from "react-router-dom";
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
    console.log(formData.email);
    formData.append("role", role);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      Email: formData.get("email"),
      Password: formData.get("password"),
      FirstName: formData.get("firstname"),
      LastName: formData.get("lastname"),
      Phone: formData.get("phone"),
    });
    console.log(raw);
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
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <label>
          Register as:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="member">Member</option>
            <option value="trainer">Trainer</option>
          </select>
        </label>

        {role === "member" && (
          <div>
            <h3>Member Registration</h3>
            <input name="firstname" type="text" placeholder="Nick" required />
            <input name="lastname" type="text" placeholder="Saban" required />
            <input
              name="email"
              type="text"
              placeholder="nick.saban@rolltide.com"
              required
            />
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(123) 456-7890"
              maxLength={14}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        )}

        {role === "trainer" && (
          <div>
            <h3>Trainer Registration</h3>
            <input
              name="trainerSpecificField"
              placeholder="Trainer Field"
              required
            />
          </div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
