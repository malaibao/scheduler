import React from 'react';
import PropTypes from 'prop-types';

const DayListItem = (props) => {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className='text--regluar'>{props.name}</h2>
      <h3 className='text--light'>{props.spot}spots remianing</h3>
    </li>
  );
};

DayListItem.propTypes = {};

export default DayListItem;
