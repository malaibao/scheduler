import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from './Appointment';
import getAppointmentsForDay from '../helpers/selectors';
import 'components/Application.scss';

export default function Application(props) {
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');

    Promise.all([getDays, getAppointments]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const appointments = getAppointmentsForDay(state, state.day);

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointments.length > 0 &&
          appointments.map((appointment) => (
            <Appointment
              key={
                appointment.id === appointments.length - 1
                  ? 'last'
                  : appointments.id
              }
              {...appointment}
            />
          ))}
      </section>
    </main>
  );
}
