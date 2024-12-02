import "./displayScheduleDay.css";

function DisplayScheduleDay({ day, daySchedule, removeEntry }) {
  return (
    <div className="display-schedule-day">
      <h3>{day}:</h3>
      {daySchedule.map((e) => (
        <div className="session-card" key={e.sessionID}>
          <p>
            {new Date(`1990-10-10T${e.startTime}`).toLocaleTimeString(
              ([], { hour: "2-digit", minute: "2-digit" })
            )}
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
