import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function SessionRegister() {
  const { userId, userType } = useUser();
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({ date: "", time: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
              onRegister={fetchSessions}
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
