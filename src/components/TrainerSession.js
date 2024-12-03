import "./sessionList.css";
const apiUrl = process.env.REACT_APP_API_URL;

function TrainerSession(props) {
  function getTimeFromString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date.toLocaleTimeString();
  }

  const member = props.session.member;
  const sessionDate = new Date(props.session.date);

  const [hours, minutes, seconds] = props.session.startTime
    .split(":")
    .map(Number);

  sessionDate.setHours(hours, minutes, seconds);

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

  const today = new Date();
  if (props.type === "registered" && sessionDate >= today) {
    return (
      <div className={props.className}>
        <h3>Session</h3>
        <p>
          Member Name: {member.firstName} {member.lastName}
        </p>
        <p>Date: {new Date(props.session.date).toDateString()}</p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Price: ${props.session.price}</p>
        <button className="cancel-button" onClick={handleUnregister}>
          Cancel
        </button>
      </div>
    );
  } else if (
    props.type === "past" &&
    sessionDate < new Date() &&
    props.session.sessionStatus === "Registered"
  ) {
    return (
      <div className={props.className}>
        <h3>Session</h3>
        <p>
          Member Name: {member.firstName} {member.lastName}
        </p>
        <p>Date: {new Date(props.session.date).toDateString()}</p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Price: ${props.session.price}</p>
        {props.session.rating === null ? (
          <p>Rating: Not yet rated</p>
        ) : (
          <p>Rating: {props.session.rating}</p>
        )}
      </div>
    );
  } else {
    return null;
  }
}
export default TrainerSession;
