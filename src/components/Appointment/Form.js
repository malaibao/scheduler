import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import InterviewerList from '../InterviewerList';

const Form = (props) => {
  const [name, setName] = useState(props.name || '');
  const [error, setError] = useState('');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = () => {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }

    props.onSave(name, interviewer);
    setError('');
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form autoComplete='off' onSubmit={(event) => event.preventDefault()}>
          <input
            className='appointment__create-input text--semi-bold'
            name='name'
            type='text'
            placeholder='Enter Student Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid='student-name-input'
          />
          <section className='appointment__validation'>{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </form>
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

Form.propTypes = {
  name: PropTypes.string,
  interviewer: PropTypes.number,
  interviewers: PropTypes.array.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form;
