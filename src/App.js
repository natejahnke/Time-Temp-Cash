import React from 'react';
import './styles/styles.scss';
// import Card from './components/Card';
import HomeCard from './components/HomeCard';
import MyProvider from './components/MyProvider';
// import HomeButton from './components/HomeButton';
import LocationSearchInput from './components/LocationSearchInput';

export default class App extends React.Component {
  state = {
    // lat: null,
    // lng: null
  };

  // getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       this.setState({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       });
  //     },
  //     err => console.log(err)
  //   );
  // };

  render() {
    return (
      <React.Fragment>
        <MyProvider>
          <LocationSearchInput />
          <HomeCard />
        </MyProvider>
      </React.Fragment>
    );
  }
}
