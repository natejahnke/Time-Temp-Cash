import React from 'react';
import { MyContext } from './MyProvider';

const HomeButton = props => (
  <MyContext.Consumer>
    {context => (
      <button onClick={context.onClick}>
        Set Home
      </button>
    )}
  </MyContext.Consumer>
);

export default HomeButton;
