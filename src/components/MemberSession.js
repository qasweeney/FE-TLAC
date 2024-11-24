import { useState } from "react";
import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function MemberSession(props) {
  const { userId } = useUser();
  const trainer = props.session.trainer;
  const today = new Date();
  const sessionDate = new Date(props.session.date);
  const [rating, setRating] = useState(props.session.rating || 0.0);
  const [isEditing, setIsEditing] = useState(false);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,1}(\.\d{0,1})?$/.test(value) && value >= 0 && value <= 5) {
      setRating(value);
    }
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

  if (props.type === "available") {
    return (
      <div>
        <h1>Member Session</h1>
        <p>
          Trainer Name: {trainer.firstName} {trainer.lastName}
        </p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Price: ${props.session.price}</p>
        <button onClick={() => props.onRegister(props.session.sessionID)}>
          Register
        </button>
      </div>
    );
  } else if (
    props.type === "registered" &&
    sessionDate > today &&
    props.session.sessionStatus === "Registered"
  ) {
    return (
      <div>
        <h1>Member Session</h1>
        <p>
          Trainer Name: {trainer.firstName} {trainer.lastName}
        </p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Date: {sessionDate.toDateString()}</p>
        <p>Price: ${props.session.price}</p>
      </div>
    );
  } else if (
    props.type === "past" &&
    sessionDate < today &&
    props.session.sessionStatus === "Registered"
  ) {
    return (
      <div>
        <h1>Member Session</h1>
        <p>
          Trainer Name: {trainer.firstName} {trainer.lastName}
        </p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Date: {sessionDate.toDateString()}</p>
        <p>Price: ${props.session.price}</p>
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
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </p>
        )}
      </div>
    );
  } else {
    return null;
  }
  return (
    <div>
      <h1>Member Session</h1>
    </div>
  );
}

export default MemberSession;
