import { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../contexts/UserContext";
import SessionList from "../components/SessionList";
import Filter from "../components/Filter";
const apiUrl = process.env.REACT_APP_API_URL;

function MemberPastSessions(props) {
  const { userId } = useUser();
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState(sessions);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateRating = (sessionId, newRating) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      rating: newRating,
      sessionID: sessionId,
    });

    const requestOptions = {
      method: "PUT",
      credentials: "include",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}sessions/rating`, requestOptions)
      .then((response) => response.text())
      .then((result) => fetchSessions())
      .catch((error) => console.error(error));
  };

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
  useState(() => {
    fetchSessions();
  }, [userId, sessions]);
  return (
    <div>
      <Navbar />
      <h1>Member Past Sessions</h1>
      <Filter
        sessions={sessions}
        setFilteredSessions={setFilteredSessions}
        view="member"
        subView="past"
      />
      <SessionList
        updateRating={updateRating}
        view="member"
        type="past"
        sessions={filteredSessions}
      />
    </div>
  );
}

export default MemberPastSessions;
