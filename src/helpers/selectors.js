import Appointment from "components/Appointment";

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((d) => d.name === day);
  let output = [];
  if (filteredDay.length > 0) {
    const filteredAppointment = filteredDay[0].appointments;
    for (const id of filteredAppointment) {
      if (state.appointments[id]) {
        output.push(state.appointments[id]);
      }
    }
  }
  return output;
}

export function getInterview(state, interview) {
  let output = {};
  const appointmentKeys = Object.keys(state.appointments);
  if (!interview) {
    return null;
  }
  for (const key of appointmentKeys) {
    if (state.appointments[key]["interview"] === interview) {
      const interviewerID = state.appointments[key].interview.interviewer;
      return (output = {
        student: interview.student,
        interviewer: state.interviewers[interviewerID],
      });
    }
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((d) => d.name === day);
  const result = []
  if (!filteredDay) {
    return [];
  }
  const filteredInterviewerIds = filteredDay.interviewers
  for (const id of filteredInterviewerIds) {
    result.push(state.interviewers[id])
  }
  return result
}

