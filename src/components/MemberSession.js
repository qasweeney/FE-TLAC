import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import TrainerProfileGlance from "./TrainerProfileGlance";
import "./sessionList.css";
const apiUrl = process.env.REACT_APP_API_URL;

function MemberSession(props) {
  const { userId } = useUser();
  const trainer = props.session.trainer;
  const today = new Date();
  const sessionDate = new Date(props.session.date);
  const [rating, setRating] = useState(props.session.rating || 0.0);
  const [isEditing, setIsEditing] = useState(false);
  const [showTrainerGlance, setShowTrainerGlance] = useState(false);

  const toggleShowTrainer = () => {
    setShowTrainerGlance(!showTrainerGlance);
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,1}(\.\d{0,1})?$/.test(value) && value >= 0 && value <= 5) {
      setRating(value);
    }
  };

  const handleUnregister = () => {
    const requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    fetch(
      `${apiUrl}sessions/unregister/${props.session.sessionID}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));

    alert("Session canceled");
    props.refresh();
  };

  const handleSave = () => {
    props.updateRating(props.session.sessionID, parseFloat(rating));
    setIsEditing(false);
  };
  function getTimeFromString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date.toLocaleTimeString();
  }
  const [hours, minutes, seconds] = props.session.startTime
    .split(":")
    .map(Number);

  sessionDate.setHours(hours, minutes, seconds);
  if (props.type === "available") {
    return (
      <div className={props.className}>
        <h3>Session</h3>
        <p>
          Trainer Name:{" "}
          <span
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#0056b3";
              e.target.style.textDecoration = "none";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#007bff";
              e.target.style.textDecoration = "underline";
            }}
            onClick={toggleShowTrainer}
          >
            {trainer.firstName} {trainer.lastName}{" "}
          </span>
        </p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Price: ${props.session.price.toFixed(2)}</p>
        {showTrainerGlance ? <TrainerProfileGlance trainer={trainer} /> : null}
        <button onClick={() => props.onRegister(props.session)}>
          Register
        </button>
      </div>
    );
  } else if (
    props.type === "registered" &&
    sessionDate >= today &&
    props.session.sessionStatus === "Registered"
  ) {
    return (
      <div className={props.className}>
        <h3>Session</h3>
        <p>
          Trainer Name:{" "}
          <span
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#0056b3";
              e.target.style.textDecoration = "none";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#007bff";
              e.target.style.textDecoration = "underline";
            }}
            onClick={toggleShowTrainer}
          >
            {trainer.firstName} {trainer.lastName}{" "}
          </span>
        </p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Date: {sessionDate.toDateString()}</p>
        <p>Price: ${props.session.price.toFixed(2)}</p>
        {showTrainerGlance ? <TrainerProfileGlance trainer={trainer} /> : null}
        <button className="cancel-button" onClick={handleUnregister}>
          Cancel
        </button>
      </div>
    );
  } else if (
    props.type === "past" &&
    sessionDate < today &&
    props.session.sessionStatus === "Registered"
  ) {
    return (
      <div className={props.className}>
        <h3>Session</h3>
        <p>
          Trainer Name:{" "}
          <span
            style={{
              color: "#007bff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#0056b3";
              e.target.style.textDecoration = "none";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#007bff";
              e.target.style.textDecoration = "underline";
            }}
            onClick={toggleShowTrainer}
          >
            {trainer.firstName} {trainer.lastName}{" "}
          </span>
        </p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Date: {sessionDate.toDateString()}</p>
        <p>Price: ${props.session.price.toFixed(2)}</p>
        {isEditing ? (
          <div>
            <label>
              Rating (0.0 - 5.0):
              <input
                type="number"
                value={rating}
                step="0.1"
                min="0"
                max="5"
                onChange={handleRatingChange}
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <p>
            Rating: {props.session.rating}{" "}
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </p>
        )}
        {showTrainerGlance ? <TrainerProfileGlance trainer={trainer} /> : null}
      </div>
    );
  } else {
    return null;
  }
  return (
    <div>
      <h3>Session</h3>
    </div>
  );
}

export default MemberSession;
