function DisplayScheduleDay({ day, daySchedule, removeEntry }) {
  return (
    <div>
      <h3>{day}:</h3>
      {daySchedule.map((e) => (
        <div key={e.sessionID}>
          <h4>Recurring Session</h4>
          <p>
            Time:{new Date(`1990-10-10T${e.startTime}`).toLocaleTimeString()}
          </p>
          <button
            onClick={() => {
              removeEntry(e.sessionID);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default DisplayScheduleDay;
