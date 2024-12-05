import DisplayScheduleDay from "./DisplayScheduleDay";
import "./displaySchedule.css";

function DisplaySchedule({ schedule, removeEntry }) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="display-schedule">
      {daysOfWeek.map((day, i) => (
        <DisplayScheduleDay
          key={i}
          day={day}
          daySchedule={schedule.filter((s) => s.dayOfWeek === day)}
          removeEntry={removeEntry}
        />
      ))}
    </div>
  );
}

export default DisplaySchedule;
