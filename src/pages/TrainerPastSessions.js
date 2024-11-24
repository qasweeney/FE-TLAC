import { useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
import TrainerSessionData from "../components/TrainerSessionData";
const apiUrl = process.env.REACT_APP_API_URL;

function TrainerPastSessions() {
  const { userId } = useUser();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSessions() {
    try {
      const response = await fetch(`${apiUrl}sessions/trainer/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
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
  useState(() => {
    fetchSessions();
  }, userId);
  return (
    <div>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <TrainerSessionData sessions={sessions} />
          <h1>Trainer past sessions</h1>
          <SessionList view="trainer" type="past" sessions={sessions} />
        </div>
      )}
      {/* <SessionList view="trainer" type="past" /> */}
    </div>
  );
}

export default TrainerPastSessions;
