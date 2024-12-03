import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
import Filter from "../components/Filter";
const apiUrl = process.env.REACT_APP_API_URL;

function TrainerDashboard() {
  const { userId, userType } = useUser();
  const [sessions, setExistingSessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredSessions, setFilteredSessions] = useState(sessions);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

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
  const toggleShowUpcoming = () => {
    setShowUpcoming(!showUpcoming);
  };
  return (
    <div>
      <Navbar />
      <div className="top-section">
        <h2>{showUpcoming ? "Upcoming" : "Unregistered"} Sessions:</h2>
        <button onClick={toggleShowUpcoming}>
          Show {showUpcoming ? "Unregistered" : "Upcoming"}
        </button>{" "}
        <br />
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
        view="trainer"
        type={showUpcoming ? "registered" : "unregistered"}
        sessions={filteredSessions}
      />
      {/* <SessionList refresh={fetchSessions} view="trainer" type="unregistered" sessions={filteredSessions} /> */}
    </div>
  );
}

export default TrainerDashboard;
