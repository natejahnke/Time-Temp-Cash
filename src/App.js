import React from 'react';
import './styles/styles.scss';
import Card from './components/Card';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <h1>Test</h1>
        <Card />
      </div>
    );
  }
}
