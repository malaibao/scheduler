import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import './styles.scss';

const Appointment = (props) => {
  return (
    <article className='appointment'>
      <Header time={props.time} />
    </article>
  );
};

Appointment.propTypes = {};

export default Appointment;
