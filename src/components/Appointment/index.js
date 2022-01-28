import React from "react";
import "components/Appointment/styles.scss";
import Header from "./header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .then(() => {
        transition(SHOW)
      })
      .catch(error => {
        transition(ERROR_SAVE, true)
      })
  }

  const appointmentTime = () => {
    return `Appointment At ${props.time}`;
  };

  function handleEdit() {
    transition(EDIT)
    props.bookInterview(props.id)
  }

  function handleConfirm() {
    transition(DELETING)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => { transition(ERROR_DELETE, true) })
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
          onEdit={handleEdit}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={(student, interviewer) => save(student, interviewer)} onCancel={back} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onCancel={back} onConfirm={handleConfirm} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && <Error message={"Could not save the appointment"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel the appointment"} onClose={back} />}
      {mode === EDIT && <Form interview={props.interview} interviewers={props.interviewers} onSave={(student, interviewer) => save(student, interviewer)} onCancel={back} />}
    </article>
  );
}
