//component for confirm button and cancel button

import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  const handleClick = () => {
    if (typeof props.onClick === "function") {
      props.onClick();
    }
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
