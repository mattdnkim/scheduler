import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { day, days, setDay } = props;

  return (
    <ul>
      {days.map((currentDay) => {
        return (
          <DayListItem
            setDay={setDay}
            spots={currentDay.spots}
            name={currentDay.name}
            selected={day === currentDay.name}
          />
        );
      })}
    </ul>
  );
}
