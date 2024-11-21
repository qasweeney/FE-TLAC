import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function TrainerDashboard() {
  const { userId, userType } = useUser();
  const [sessions, setExistingSessions] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  async function fetchSessions() {
    try {
      const response = await fetch(`${apiUrl}sessions/trainer/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setExistingSessions(data);
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
  useEffect(() => {
    fetchSessions();
  }, [userType]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <h1>Trainer Dashboard</h1>
      <SessionList view="trainer" type="registered" sessions={sessions} />
    </div>
  );
}

export default TrainerDashboard;
