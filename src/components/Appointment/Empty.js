import React from 'react';
import PropTypes from 'prop-types';

const Empty = (props) => {
  return (
    <main className='appointment__add'>
      <img
        className='appointment__add-button'
        src='images/add.png'
        alt='Add'
        onClick={props.onAdd}
      />
    </main>
  );
};

Empty.propTypes = {};

export default Empty;
