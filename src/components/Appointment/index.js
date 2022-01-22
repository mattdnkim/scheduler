import React from "react";

import "components/Appointment/styles.scss";

import Header from "./header";

import Show from "./Show";

import Empty from "./Empty";

export default function Appointment(props) {
  const appointmentTime = () => {
    return `Appointment At ${props.time}`;
  };
  return (
    <article className="appointment">
      {props.time ? <Header time={appointmentTime()} /> : "No Appointments"}
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
