import React from 'react';
import PropTypes from 'prop-types';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

function InterviewerList({ interviewers, value, onChange }) {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {interviewers &&
          interviewers.map((interviewer) => (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === value}
              setInterviewer={(event) => onChange(interviewer.id)}
            />
          ))}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number.isRequired,
  interviewers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InterviewerList;
