import { useUser } from "../contexts/UserContext";
const apiUrl = process.env.REACT_APP_API_URL;

function MemberSession(props) {
  const { userId } = useUser();
  const trainer = props.session.trainer;
  function getTimeFromString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date.toLocaleTimeString();
  }
  function handleRegister() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(props.session.date);
    const raw = JSON.stringify({
      SessionID: props.session.sessionID,
      MemberID: userId,
      Date: props.session.date,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      credentials: "include",
      body: raw,
      redirect: "follow",
    };

    fetch(`${apiUrl}sessions/register`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Session registered");
        props.onRegister();
      })
      .catch((error) => console.error(error));
    // console.log(props.session.sessionID);
    // console.log(userId);
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
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Not available</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Member Session</h1>
    </div>
  );
}

export default MemberSession;
