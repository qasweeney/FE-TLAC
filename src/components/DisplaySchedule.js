import DisplayScheduleDay from "./DisplayScheduleDay";
import Navbar from "./Navbar";

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
    <div>
      <h1>DisplaySchedule</h1>
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
