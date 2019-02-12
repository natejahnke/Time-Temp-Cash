import React from 'react';
import './styles/styles.scss';
// import Card from './components/Card';
import HomeCard from './components/HomeCard';
import HomeButton from './components/HomeButton';

export default class App extends React.Component {
  state = {
    lat: null,
    lng: null
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      err => console.log(err)
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.getLocation}>Click Me</button>
        {/* <HomeButton onClick={this.getLocation} /> */}
        <HomeCard />
      </div>
    );
  }
}
