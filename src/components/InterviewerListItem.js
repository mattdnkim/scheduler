import React from "react";

import "components/InterviewerListItem.scss";

import { useState } from "react";

import classNames from "classnames";

function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classNames({
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;
