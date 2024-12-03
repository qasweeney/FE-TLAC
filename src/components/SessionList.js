import { useState } from "react";
import MemberSession from "./MemberSession";
import TrainerSession from "./TrainerSession";
import "./sessionList.css";

function SessionList(props) {
  const registeredSessions = props.sessions.filter(
    (s) => s.sessionStatus.toLowerCase() === props.type
  );

  if (props.type === "registered" && props.view === "trainer") {
    const registeredSessions = props.sessions.filter(
      (s) => s.sessionStatus.toLowerCase() === "registered"
    );
    return (
      <div className="sessions-container">
        {registeredSessions.map((s, i) => {
          return (
            <TrainerSession
              className="session-card"
              type={props.type}
              key={i}
              session={s}
              refresh={props.refresh}
            />
          );
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
      <div className="sessions-container">
        {props.sessions.map((s, i) => {
          return (
            <MemberSession
              className="session-card"
              type={props.type}
              key={i}
              session={s}
              refresh={props.refresh}
            />
          );
        })}
      </div>
    );
  }
  if (props.type === "past" && props.view === "member") {
    return (
      <div className="sessions-container">
        {props.sessions.map((s, i) => {
          return (
            <MemberSession
              className="session-card"
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
    <div className="sessions-container">
      {props.sessions.map((s, i) => {
        return props.view === "trainer" ? (
          <TrainerSession
            className="session-card"
            type={props.type}
            key={i}
            session={s}
          />
        ) : props.view === "member" ? (
          <MemberSession
            className="session-card"
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
