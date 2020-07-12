import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');

    Promise.all([getDays, getAppointments, getInterviewers]).then((all) => {
      console.log(all[0].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  useEffect(() => {}, [state.days]);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        setState((prev) => {
          const newState = { ...prev, appointments };
          const dayId = getDayId(id);
          newState.days[dayId].spots = prev.days[dayId].spots - 1;
          return newState;
        });
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = { ...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => {
        const newState = { ...prev, appointments };
        const dayId = getDayId(id);
        newState.days[dayId].spots = prev.days[dayId].spots + 1;
        return newState;
      });
    });
  };

  const getDayId = (appointmentId) => {
    switch (appointmentId) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return 0;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        return 1;
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        return 2;
      case 16:
      case 17:
      case 18:
      case 19:
      case 20:
        return 3;
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
        return 4;
    }
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
