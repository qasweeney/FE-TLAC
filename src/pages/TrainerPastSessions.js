import { useState } from "react";
import Navbar from "../components/Navbar";
import SessionList from "../components/SessionList";
import { useUser } from "../contexts/UserContext";
import TrainerSessionData from "../components/TrainerSessionData";
import "./trainerPastSessions.css";
import Filter from "../components/Filter";
const apiUrl = process.env.REACT_APP_API_URL;

function TrainerPastSessions() {
  const { userId } = useUser();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredSessions, setFilteredSessions] = useState([]);

  function toggleShowFilter() {
    setShowFilter(!showFilter);
  }

  async function fetchSessions() {
    try {
      const response = await fetch(`${apiUrl}sessions/trainer/${userId}`, {
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
          <div className="top-section">
            <h2>Past Sessions:</h2>
            <button onClick={toggleShowFilter}>
              {showFilter ? "Hide" : "Show"} Filter
            </button>
          </div>
          {showFilter && (
            <Filter
              sessions={sessions}
              setFilteredSessions={setFilteredSessions}
              view="trainer"
              subView="past"
            />
          )}
          <TrainerSessionData sessions={filteredSessions} />
          <SessionList view="trainer" type="past" sessions={filteredSessions} />
        </div>
      )}
      {/* <SessionList view="trainer" type="past" /> */}
    </div>
  );
}

export default TrainerPastSessions;
