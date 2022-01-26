import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

function InterviewerList(props) {
  const { interviewers, setInterviewer, value } = props;

  const interviewerItems = interviewers.map((currentInterviewer) => {
    return (
      <InterviewerListItem
        key={currentInterviewer.id}
        name={currentInterviewer.name}
        avatar={currentInterviewer.avatar}
        selected={currentInterviewer.id === value}
        setInterviewer={() => setInterviewer(currentInterviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}

export default InterviewerList;
