//set of InterviewerListItem in a day

import React from "react";

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss";

import PropTypes from 'prop-types';

function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;

  const interviewerItems = interviewers.map((currentInterviewer) => {
    return (
      <InterviewerListItem
        key={currentInterviewer.id}
        name={currentInterviewer.name}
        avatar={currentInterviewer.avatar}
        selected={currentInterviewer.id === interviewer}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
