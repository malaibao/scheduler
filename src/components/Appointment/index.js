import React, { useEffect } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';
import PropTypes from 'prop-types';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) => {
  // const { interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  useEffect(() => {
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
  }, [mode, transition, interview]);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    bookInterview(id, newInterview).then(() => {
      transition(SHOW);
    });
  };

  const deleteAppointment = () => {
    transition(DELETING);
    cancelInterview(id).then(() => {
      transition(EMPTY);
    });
  };

  return (
    <article className='appointment'>
      <Header time={time} />

      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='DELETING' />}
      {mode === CONFIRM && (
        <Confirm
          message='Delete the appointment?'
          onCancel={back}
          onConfirm={deleteAppointment}
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
