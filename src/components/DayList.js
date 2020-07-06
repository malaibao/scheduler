import React from 'react';
import DayListItem from './DayListItem';
import PropTypes from 'prop-types';

function DayList(props) {
  return (
    <ul>
      {props.days.map((day) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      ))}
    </ul>
  );
}

DayList.propTypes = {};

export default DayList;
