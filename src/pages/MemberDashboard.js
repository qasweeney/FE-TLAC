import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function MemberDashboard() {
  const { userId, userType } = useUser();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  async function fetchSessions() {
    try {
      const response = await fetch(`${apiUrl}sessions/member/${userId}`, {
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
  useEffect(() => {
    fetchSessions();
  }, [userType]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <h1>Member Dashboard</h1>
      <h2>Upcoming Sessions:</h2>
      <SessionList view="member" type="registered" sessions={sessions} />
    </div>
  );
}

export default MemberDashboard;
