import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const day = props.day;
  const setDay = props.setDay;

  return (
    <ul>
      {days.map((currentDay) => {
        return (
          <DayListItem
            key={currentDay.id}
            name={currentDay.name}
            spots={currentDay.spots}
            selected={currentDay.name === props.day}
            setDay={props.setDay}
          />
        );
      })}
    </ul>
  );
}
