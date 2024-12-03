import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
import Filter from "../components/Filter";
import "./memberDashboard.css";
const apiUrl = process.env.REACT_APP_API_URL;

function MemberDashboard() {
  const { userId, userType } = useUser();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredSessions, setFilteredSessions] = useState(sessions);
  const [showFilter, setShowFilter] = useState(false);

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
        setFilteredSessions(data);
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

  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <div>
      <Navbar />
      <div className="top-section">
        <h2>Upcoming Sessions:</h2>
        <button onClick={toggleShowFilter}>
          {showFilter ? "Hide" : "Show"} Filter
        </button>
      </div>
      {showFilter && (
        <Filter
          sessions={sessions}
          setFilteredSessions={setFilteredSessions}
          view="member"
        />
      )}
      <SessionList
        refresh={fetchSessions}
        view="member"
        type="registered"
        sessions={filteredSessions}
      />
    </div>
  );
}

export default MemberDashboard;
