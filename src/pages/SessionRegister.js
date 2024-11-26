import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function SessionRegister() {
  const { userId, userType } = useUser();
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    availableOnly: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const today = new Date().toISOString().split("T")[0];

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${apiUrl}sessions/search`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sessions.");
      }

      const data = await response.json();
      setSessions(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    fetchSessions();
  };
  function handleRegister(sessionID) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(formData.date);
    const raw = JSON.stringify({
      SessionID: sessionID,
      MemberID: userId,
      Date: formData.date,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      credentials: "include",
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}sessions/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Session registered");
        fetchSessions();
      })
      .catch((error) => console.error(error));
    // console.log(props.session.sessionID);
    // console.log(userId);
  }
  return (
    <div>
      <Navbar />
      <h1>Session Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            min={today}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time (Optional):</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Search Sessions</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div>
        {sessions.length > 0 ? (
          <div>
            <h2>Available sessions:</h2>
            <SessionList
              onRegister={handleRegister}
              view="member"
              type="available"
              sessions={sessions}
            />
          </div>
        ) : (
          <p>No sessions found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}

export default SessionRegister;
