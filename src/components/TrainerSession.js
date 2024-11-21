function TrainerSession(props) {
  function getTimeFromString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date.toLocaleTimeString();
  }

  const member = props.session.member;

  if (props.type === "registered") {
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
  } else {
    return (
      <div>
        <h1>Not registered</h1>
      </div>
    );
  }
}
export default TrainerSession;
