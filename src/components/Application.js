import React from 'react';
import DayList from './DayList';
import Appointment from './Appointment';

import useApplicationData from '../hooks/useApplicationData';
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from '../helpers/selectors';

import 'components/Application.scss';

export default function Application(props) {

  // use custom hook useApplicationData
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);

  const scheduler = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <>
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </>
    );
  });

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
        {appointments.length > 0 && scheduler}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
