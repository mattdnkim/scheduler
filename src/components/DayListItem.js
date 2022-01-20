import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`;
    }

    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }

    if (props.spots === 0) {
      return "no spots remaining";
    }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots()}</h3>
    </li>
  );
}
