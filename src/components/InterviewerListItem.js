import React from 'react';
import className from 'classnames';
import 'components/InterviewerListItem.scss';
import PropTypes from 'prop-types';

function InterviewerListItem(props) {
  const styleClass = className('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });
  return (
    <li className={styleClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

InterviewerListItem.propTypes = {};

export default InterviewerListItem;
