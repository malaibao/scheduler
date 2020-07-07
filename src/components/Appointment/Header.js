import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <header className='appointment__time'>
      <h4 className='text--semi-bold'>{props.time}</h4>
      <hr className='appointment__separator' />
    </header>
  );
};

Header.propTypes = {
  time: PropTypes.string.isRequired,
};

export default Header;
