import React from 'react';
import PropTypes from 'prop-types';

const Status = (props) => {
  return (
    <main className='appointment__card appointment__card--status'>
      <img
        className='appointment__status-image'
        src='images/status.png'
        alt='Loading'
      />
      <h1 className='text--semi-bold'>{props.message}</h1>
    </main>
  );
};

Status.propTypes = {
  message: PropTypes.string,
};

export default Status;
