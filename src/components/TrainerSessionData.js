import "./trainerSessionData.css";

function TrainerSessionData(props) {
  const sessions = props.sessions;
  const today = new Date();
  let totalRev = 0;
  let count = 0;
  sessions.forEach((s) => {
    const sessionDate = new Date(s.date);
    if (sessionDate < today && s.sessionStatus === "Registered") {
      totalRev += s.price * 0.9;
      count++;
    }
  });
  return (
    <div className="financial-session-data">
      <h2>Gross Session Data:</h2>
      <p>
        Total Revenue (-10% fee):{" "}
        <strong>${Math.round(totalRev * 100) / 100}</strong>
      </p>
      <p>
        Total Sessions: <strong>{count}</strong>
      </p>
    </div>
  );
}

export default TrainerSessionData;
