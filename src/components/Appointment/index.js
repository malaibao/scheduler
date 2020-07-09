import React, { useEffect } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import PropTypes from 'prop-types';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = (props) => {
  const { interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  useEffect(() => {
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
  }, [mode, transition, interview]);

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
        />
      )}
    </article>
  );
};

Appointment.propTypes = {
  time: PropTypes.string.isRequired,
  interview: PropTypes.object,
};

export default Appointment;
