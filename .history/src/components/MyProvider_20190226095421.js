import React from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";
import countryCurrency from "../countryCurrency.json";

import HomeCard from "./HomeCard";
import LocationSearchInput from "./LocationSearchInput";
import HomeButton from "./HomeButton";
export const MyContext = React.createContext();

export default class MyProvider extends React.Component {
  state = {
    address: "",
    // city: "",
    // state: "",
    // country: "",
    latitude: "",
    longitude: "",
    // timezone: "",
    home: {
      city: null,
      state: null,
      country: null,
      latitude: "",
      longitude: "",
      timezone: "",
      weather: {
        temperature: null,
        low: "",
        high: "",
        humidity: "",
        precip: "",
        wind: "",
        icon: "",
        summary: "",
        fullSummary: ""
      }
    }
  };

  getCurrency = country => {
    const currencyCode = countryCurrency[country];
    axios
      .get(
        "https://api.exchangeratesapi.io/latest?base=USD&symbols=" +
          currencyCode
      )
      .then(currencyResults => {
        let results = currencyResults.data;
        console.log(results["rates"][currencyCode]);
      });
  };

  splitAddress = address => {
    let split = address.split(", ");

    console.log(address.split(",").length - 1);

    if (address.split(",").length - 1 === 2) {
      const city = split[0];
      const state = split[1];
      const country = split[2];

      this.setState({
        address: address,
        home: {
          city: city,
          state: state,
          country: country
        }
      });
    } else {
      const city = split[0];
      const country = split[1];

      this.setState({
        address: address,
        home: {
          city: city,
          state: null,
          country: country
        }
      });
    }
  };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(this.splitAddress(address))
      // .then(this.splitAddress(address))
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        this.setState({
          latitude: lat,
          longitude: lng
        })
      )
      .catch(error => console.error("Error", error));
  };

  onClickSetHome = e => {
    e.preventDefault();
    if (this.state.latitude & this.state.longitude) {
      console.log(
        "We have lats and longs " +
          this.state.latitude +
          " " +
          this.state.longitude
      );
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3c70f1ca1b87636d0e17fa5d97885be/" +
            this.state.latitude +
            "," +
            this.state.longitude +
            "?exclude=minutely,hourly,alerts,flags"
        )
        .then(weatherResults => {
          console.log(weatherResults.data.timezone);
          this.setState({
            home: {
              timezone: weatherResults.data.timezone,
              weather: {
                temperature: weatherResults.data.currently.temperature,
                low: weatherResults.data.daily.data[0].temperatureLow,
                high: weatherResults.data.daily.data[0].temperatureHigh,
                humidity: weatherResults.data.currently.humidity,
                precip: weatherResults.data.daily.data[0].precipProbability,
                wind: weatherResults.data.currently.windSpeed,
                icon: weatherResults.data.currently.icon,
                summary: weatherResults.data.currently.summary,
                fullSummary: weatherResults.data.daily.summary
              }
            }
          });
        })
        .then(this.getCurrency(this.state.home.country));
    }
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          splitAddress: this.splitAddress,
          handleChange: this.handleChange,
          handleSelect: this.handleSelect,
          onClick: this.onClickSetHome
        }}
      >
        {this.props.children}
        <div className="input-layout">
          <LocationSearchInput />
          <HomeButton />
        </div>
        {this.state.home.timezone && (
          <HomeCard
            homeCity={this.state.home.city}
            homeTemperature={this.state.home.weather.temperature}
            homeLow={this.state.home.weather.low}
            homeHigh={this.state.home.weather.high}
            homePrecip={this.state.home.weather.precip}
            homeWind={this.state.home.weather.wind}
            homeHumid={this.state.home.weather.humidity}
          />
        )}
      </MyContext.Provider>
    );
  }
}
