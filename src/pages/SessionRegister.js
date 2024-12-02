import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function SessionRegister() {
  const { userId, userType } = useUser();
  const [sessions, setSessions] = useState([]);
  const [currentSessions, setCurrentSessions] = useState([]);
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

  async function fetchCurrentSessions() {
    try {
      const response = await fetch(`${apiUrl}sessions/member/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentSessions(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch profile data.");
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    fetchCurrentSessions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    fetchSessions();
  };

  function areTimesWithinAnHour(time1, time2) {
    const toMinutes = (time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 60 + minutes + seconds / 60;
    };

    const time1Minutes = toMinutes(time1);
    const time2Minutes = toMinutes(time2);

    const difference = Math.abs(time1Minutes - time2Minutes);

    return difference < 60;
  }

  function handleRegister(session) {
    const sessionID = session.sessionID;
    const dateFromInput = new Date(formData.date);
    const conflict = currentSessions.some((e) => {
      const selectedDate = dateFromInput.toISOString().slice(0, 10);
      const thisDate = new Date(e.date).toISOString().slice(0, 10);
      const isDateSame = selectedDate === thisDate;

      const isTimeConflict = areTimesWithinAnHour(
        e.startTime,
        session.startTime
      );
      return isDateSame && isTimeConflict;
    });
    if (conflict) {
      alert(
        "This session conflicts with a session you're currently registered for"
      );
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
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
          fetchCurrentSessions();
        })
        .catch((error) => console.error(error));
    }
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
              currentSessions={currentSessions}
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
