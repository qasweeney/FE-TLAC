import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../contexts/UserContext";
import DisplaySchedule from "../components/DisplaySchedule";
import AddRecurringForm from "../components/AddRecurringForm";
import "./editSchedule.css";

const apiUrl = process.env.REACT_APP_API_URL;

function EditSchedule() {
  const { userId } = useUser();
  const [schedule, setSchedule] = useState();
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (formData) => {
    const fetchSessions = async () => {
      try {
        getSchedule();
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const uniqueResponse = await fetch(
          `${apiUrl}sessions/trainer/${userId}`,
          requestOptions
        )
          .then((response) => response.json())
          .catch((error) => console.error(error));

        const uniqueSessions = await uniqueResponse.filter(
          (s) => s.sessionType === "One-Time" && new Date(s.date) > new Date()
        );
        return { uniqueSessions };
      } catch (error) {
        console.error("Error fetching sessions:", error);
        return { recurringSessions: [], uniqueSessions: [] };
      }
    };

    const { uniqueSessions } = await fetchSessions();

    const isConflictWithRecurring = schedule.some((session) => {
      if (session.dayOfWeek === formData.dayOfWeek) {
        const selectedStartTime = new Date(
          `1970-01-01T${formData.startTime}:00`
        );
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

    if (isConflictWithRecurring) {
      alert("Conflict with an existing recurring session.");
      return;
    }

    const parseTime = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      return hours * 60 + minutes; // Convert hours and minutes to total minutes
    };

    const uniqueConflict = uniqueSessions.some((session) => {
      const sessionDate = new Date(session.date);
      const sessionDayOfWeek = sessionDate.toLocaleString("en-US", {
        weekday: "long",
      });

      // Skip sessions on different days
      if (sessionDayOfWeek !== formData.dayOfWeek) {
        return false;
      }

      // Parse times into minutes since midnight for comparison
      const existingTime = parseTime(session.startTime); // Session's start time
      const newTime = parseTime(formData.startTime); // New session's start time

      const timeDifference = Math.abs(existingTime - newTime);
      return timeDifference < 60; // Conflict if within 1 hour
    });

    if (uniqueConflict) {
      alert("Conflict with an existing unique session.");
      return;
    }

    const startTime = new Date(`${formData.date}T${formData.startTime}:00`);
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
    const isTimeConflict = uniqueSessions.some((session) => {
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

    if (isTimeConflict) {
      alert("Conflict with an existing unique session.");
      return;
    }

    // If no conflicts, submit the form
    console.log("submit");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      trainerId: userId,
      dayOfWeek: formData.dayOfWeek,
      startTime: formData.startTime,
      price: formData.price,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}sessions/edit-schedule/add`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Recurring session added");
        getSchedule();
      })
      .catch((error) => console.error(error));
  };

  const removeEntry = async (sessionID) => {
    const requestOptions = {
      method: "PUT",
      credentials: "include",
      redirect: "follow",
    };

    fetch(`${apiUrl}sessions/edit-schedule/remove/${sessionID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result === true) {
          alert("Recurring session removed");
          getSchedule();
        } else {
          alert("Error removing session");
        }
      })
      .catch((error) => console.error(error));
  };
  const getSchedule = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
        credentials: "include",
      };

      fetch(`${apiUrl}sessions/schedule/${userId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setSchedule(result);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSchedule();
  }, []);
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="edit-schedule">
      <Navbar />
      <div className="edit-schedule-content">
        <h1>Edit Schedule</h1>
        <AddRecurringForm onSubmit={handleSubmit} />
        <p className="warning">
          Warning: Removing a time slot from your schedule WILL NOT cancel
          sessions that were already registered under that time.
        </p>
        <DisplaySchedule removeEntry={removeEntry} schedule={schedule} />
      </div>
    </div>
  );
}

export default EditSchedule;
