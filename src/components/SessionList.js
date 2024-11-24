import MemberSession from "./MemberSession";
import TrainerSession from "./TrainerSession";

function SessionList(props) {
  const registeredSessions = props.sessions.filter(
    (s) => s.sessionStatus.toLowerCase() === props.type
  );

  if (props.type === "registered" && props.view === "trainer") {
    const registeredSessions = props.sessions.filter(
      (s) => s.sessionStatus.toLowerCase() === "registered"
    );
    return (
      <div>
        {registeredSessions.map((s, i) => {
          return <TrainerSession type={props.type} key={i} session={s} />;
        })}
      </div>
    );
  }

  if (props.type === "past" && props.view === "trainer") {
    // return (
    // )
  }
  if (props.type === "registered" && props.view === "member") {
    return (
      <div>
        {props.sessions.map((s, i) => {
          return <MemberSession type={props.type} key={i} session={s} />;
        })}
      </div>
    );
  }
  if (props.type === "past" && props.view === "member") {
    return (
      <div>
        {props.sessions.map((s, i) => {
          return (
            <MemberSession
              updateRating={props.updateRating}
              type={props.type}
              key={i}
              session={s}
            />
          );
        })}
      </div>
    );
  }
  return (
    <div>
      {props.sessions.map((s, i) => {
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
