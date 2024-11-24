function TrainerSession(props) {
  function getTimeFromString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date.toLocaleTimeString();
  }

  const member = props.session.member;
  const sessionDate = new Date(props.session.date);
  if (props.type === "registered" && sessionDate > new Date()) {
    return (
      <div>
        <h1>Trainer Session</h1>
        <p>
          Member Name: {member.firstName} {member.lastName}
        </p>
        <p>Date: {new Date(props.session.date).toDateString()}</p>
        <p>Time: {getTimeFromString(props.session.startTime)}</p>
        <p>Price: ${props.session.price}</p>
      </div>
    );
  } else if (
    props.type === "past" &&
    sessionDate < new Date() &&
    props.session.sessionStatus === "Registered"
  ) {
    return (
      <div>
        <h1>Trainer Session</h1>
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
