import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

export default function useApplicationData() {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
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


    function bookInterview(id, interview) {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };


        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const addingSpotForDay = function (day, appointments) {
            const dailyAppointments = day.appointments.length
            const currentAppointments = day.appointments.reduce((count, id) => {
                if (appointments[id].interview) {
                    return count + 1
                }
                else { return count }
            }, 0)
            return dailyAppointments - currentAppointments
        }

        const days = state.days.map(day => day.appointments.includes(id) ? { ...day, spots: addingSpotForDay(day, appointments) } : day)

        return Axios.put(`/api/appointments/${id}`, { interview })
            .then(() => setState({ ...state, days, appointments }))
    }



    function cancelInterview(id) {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const deleteSpotForDay = function (day, appointments) {
            const dailyAppointments = day.appointments.length
            const currentAppointments = day.appointments.reduce((count, id) => {
                if (appointments[id].interview) {
                    return count + 1
                }
                else { return count }
            }, 0)
            return dailyAppointments - currentAppointments
        }

        const days = state.days.map(day => day.appointments.includes(id) ? { ...day, spots: deleteSpotForDay(day, appointments) } : day)

        return Axios.delete(`/api/appointments/${id}`)
            .then(() => setState({ ...state, days, appointments: { ...appointments } }))
    }


    function setDay(day) {
        const newState = { ...state, day: day };
        setState(newState);
    }

    return { setDay, cancelInterview, bookInterview, state }
};
