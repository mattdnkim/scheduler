import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { id, days, day, setDay } = props;

  return (
    <ul>
      {days.map((currentDay) => {
        return (
          <DayListItem
            key={id}
            name={currentDay.name}
            spots={currentDay.spots}
            selected={currentDay.name === props.value}
            setDay={props.onChange}
          />
        );
      })}
    </ul>
  );
}
