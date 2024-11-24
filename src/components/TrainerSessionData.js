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
    <div>
      <h2>Financial Session Data:</h2>
      <p>
        Total Revenue (-10% fee): <strong>${totalRev}</strong>
      </p>
      <p>
        Total Sessions: <strong>{count}</strong>
      </p>
    </div>
  );
}

export default TrainerSessionData;
