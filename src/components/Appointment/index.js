import React from "react";
import "components/Appointment/styles.scss";
import Header from "./header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
  }

  const appointmentTime = () => {
    return `Appointment At ${props.time}`;
  };

  function handleConfirm() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  function handleDelete() {
    transition(CONFIRM)
  }
  return (
    <article className="appointment">
      {props.time ? <Header time={appointmentTime()} /> : "No Appointments"}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={handleDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={(student, interviewer) => save(student, interviewer)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onCancel={back} onConfirm={handleConfirm} />}
      {mode === DELETING && <Status message={"Deleting"} />}
    </article>
  );
}
