import React from "react";

import "components/Application.scss";

import DayList from "./DayList";

import { useState } from "react";

import Appointment from "./Appointment";

import Axios from "axios";

import { useEffect } from "react";

import { getAppointmentsForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       },
//     },
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       },
//     },
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
// ];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState({
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  function setDay(day) {
    const newState = { ...state, day: day };
    setState(newState);
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment time="5pm" />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
