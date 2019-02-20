import React from 'react';
import {
    geocodeByAddress,
    getLatLng
  } from 'react-places-autocomplete';

export const MyContext = React.createContext();

export default class MyProvider extends React.Component {
  state = {
    address: '',
    city: '',
    state: '',
    country: '',
    latitude: '',
    longitude: ''
  };

  splitAddress = address => {
    let split = address.split(', ');

    console.log(address.split(',').length - 1);

    if (address.split(',').length - 1 === 2) {
      const city = split[0];
      const state = split[1];
      const country = split[2];

      this.setState({
        address: address,
        city: city,
        state: state,
        country: country
      });
    } else {
      const city = split[0];
      const country = split[1];

      this.setState({
        address: address,
        city: city,
        state: null,
        country: country
      });
    }
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(this.splitAddress(address))
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        this.setState({
          latitude: lat,
          longitude: lng
        })
      )
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          splitAddress: this.splitAddress,
          handleChange: this.handleChange,
          handleSelect: this.handleSelect
        }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}