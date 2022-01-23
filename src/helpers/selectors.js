import Appointment from "components/Appointment";

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((d) => d.name === day);
  let output = [];
  if (filteredDay.length > 0) {
    const filteredAppointment = filteredDay[0].appointments;
    for (const id of filteredAppointment) {
      console.log(filteredAppointment);
      if (state.appointments[id]) {
        output.push(state.appointments[id]);
      }
    }
  }
  return output;
}
