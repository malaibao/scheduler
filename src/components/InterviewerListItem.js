import React from 'react';
import className from 'classnames';
import 'components/InterviewerListItem.scss';
import PropTypes from 'prop-types';

function InterviewerListItem({ name, avatar, selected, setInterviewer }) {
  const styleClass = className('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li className={styleClass} onClick={setInterviewer}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

InterviewerListItem.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  selected: PropTypes.bool,
  setInterviewer: PropTypes.func,
};

export default InterviewerListItem;
