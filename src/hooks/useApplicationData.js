import { useReducer, useEffect } from 'react';
import { getDayId } from '../helpers/getDayId';
import axios from 'axios';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

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
      }
      if (action.subtype === 'BOOK_INTERVIEW') {
        newState.days[dayId].spots = newState.days[dayId].spots - 1;
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

/*
Code before useReducer

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
      dispatch({ type: SET_INTERVIEW, subtype: 'CANCEL_INTERVIEW', id });
      // setState((prev) => {
      //   const newState = { ...prev, appointments };
      //   const dayId = getDayId(id);
      //   newState.days[dayId].spots = prev.days[dayId].spots + 1;
      //   return newState;
      // });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
*/
