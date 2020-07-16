import { useReducer, useEffect } from 'react';
import axios from 'axios';

import { getDayId } from '../helpers/getDayId';
import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from '../actions/types';

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      // return Object.assign({}, state, action.day);
      return { ...state, day: action.day };
    }
    case SET_APPLICATION_DATA: {
      return Object.assign({}, state, action.value);
    }

    case SET_INTERVIEW: {
      const newState = { ...state, appointments: action.appointments };
      const dayId = getDayId(action.id);
      if (action.subtype === 'CANCEL_INTERVIEW') {
        newState.days[dayId].spots = newState.days[dayId].spots + 1;
      } else if (action.subtype === 'BOOK_INTERVIEW') {
        // Update spot remaining with reducer
        newState.days[dayId].spots = newState.days[dayId].appointments.reduce(
          (availableSpots, appointmentId) => {
            return newState.appointments[appointmentId].interview
              ? availableSpots
              : availableSpots + 1;
          },
          0
        );
      }
      return newState;
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
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
      const data = {
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      };
      dispatch({ type: SET_APPLICATION_DATA, value: data });
    });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

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
        dispatch({
          type: SET_INTERVIEW,
          subtype: 'BOOK_INTERVIEW',
          appointments,
          id,
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
      dispatch({
        type: SET_INTERVIEW,
        subtype: 'CANCEL_INTERVIEW',
        appointments,
        id,
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
