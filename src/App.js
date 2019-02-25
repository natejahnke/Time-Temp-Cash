import React from 'react';
import './styles/styles.scss';
// import Card from './components/Card';

import MyProvider from './components/MyProvider';
// import HomeButton from './components/HomeButton';

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <MyProvider />
      </React.Fragment>
    );
  }
}
