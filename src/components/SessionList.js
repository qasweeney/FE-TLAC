import MemberSession from "./MemberSession";
import TrainerSession from "./TrainerSession";

function SessionList(props) {
  const registeredSessions = props.sessions.filter(
    (s) => s.sessionStatus.toLowerCase() === props.type
  );
  return (
    <div>
      {registeredSessions.map((s, i) => {
        return props.view === "trainer" ? (
          <TrainerSession type={props.type} key={i} session={s} />
        ) : props.view === "member" ? (
          <MemberSession
            onRegister={props.onRegister}
            type={props.type}
            key={i}
            session={s}
          />
        ) : (
          <p>Not logged in as a trainer or member</p>
        );
      })}
    </div>
  );
}

export default SessionList;
