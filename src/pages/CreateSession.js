import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
const apiUrl = process.env.REACT_APP_API_URL;

function CreateSession() {
  const { userId, userType } = useUser();
  const [sessions, setExistingSessions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    description: "",
    price: "",
  });
  const today = new Date().toISOString().split("T")[0];
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
    }
  }

  async function fetchProfileData() {
    try {
      const response = await fetch(`${apiUrl}trainers/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.sessionPrice) {
          setFormData((preexisting) => ({
            ...preexisting,
            price: data.sessionPrice,
          }));
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch profile data.");
      }
    } catch (err) {
      setError("An error occurred while fetching profile data.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.date) < new Date().setHours(0, 0, 0, 0)) {
      alert("The date must be today or later.");
      return;
    }

    const startTime = new Date(`${formData.date}T${formData.time}:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const selectedDayOfWeek = daysOfWeek[new Date(formData.date).getDay()];
    const isTimeConflict = sessions.some((session) => {
      let [hours, minutes, seconds] = session.startTime.split(":").map(Number);
      const sessionStartTime = new Date(session.date);
      sessionStartTime.setHours(hours);
      sessionStartTime.setMinutes(minutes);
      sessionStartTime.setSeconds(seconds);
      const sessionEndTime = new Date(
        sessionStartTime.getTime() + 60 * 60 * 1000
      );

      return (
        (startTime >= sessionStartTime && startTime < sessionEndTime) ||
        (endTime > sessionStartTime && endTime <= sessionEndTime)
      );
    });

    const isConflictWithRecurring = sessions.some((session) => {
      if (session.date === null && session.dayOfWeek === selectedDayOfWeek) {
        const selectedStartTime = new Date(`1970-01-01T${formData.time}:00`);
        const selectedEndTime = new Date(
          selectedStartTime.getTime() + 60 * 60 * 1000
        );

        const sessionStartTime = new Date(`1970-01-01T${session.startTime}`);
        const sessionEndTime = new Date(
          sessionStartTime.getTime() + 60 * 60 * 1000
        );
        return (
          (selectedStartTime >= sessionStartTime &&
            selectedStartTime < sessionEndTime) ||
          (selectedEndTime > sessionStartTime &&
            selectedEndTime <= sessionEndTime)
        );
      }
      return false;
    });

    if (isTimeConflict) {
      alert("The selected time conflicts with an existing session.");
      return;
    }
    if (isConflictWithRecurring) {
      alert(
        "The selected time conflicts with a recurring session in your schedule."
      );
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        date: formData.date,
        startTime: `${formData.time}:00`,
        sessionType: "One-Time",
        sessionStatus: "Available",
        price: formData.price,
        trainerId: userId,
      });

      const requestOptions = {
        method: "POST",
        credentials: "include",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${apiUrl}sessions`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // setExistingSessions((prevSessions) => [...prevSessions, result]);
          fetchSessions();

          alert("Session created successfully!");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error submitting session:", error);
      alert("Failed to create session. Please try again.");
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchSessions();
  }, [userType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <Navbar />
      <h1>Create Session</h1>
      <div className="create-session-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($):</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*(\.\d{0,2})?$/.test(value)) {
                  setFormData({
                    ...formData,
                    price: value,
                  });
                }
              }}
              step="0.01"
              min="0"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSession;
