import React from 'react';

const HomeButton = props => (
  <button onClick={props.onClick} className='action-button shadow animate blue'>
    Locate Me
  </button>
);

export default HomeButton;
