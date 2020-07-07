import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import PropTypes from 'prop-types';
import './styles.scss';

const Appointment = (props) => {
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
};

Appointment.propTypes = {
  interview: PropTypes.object,
};

export default Appointment;
