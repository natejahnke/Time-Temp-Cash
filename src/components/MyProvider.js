import React from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";
import countryCurrency from "../countryCurrency.json";
import currency from "../currency.json";

import HomeCard from "./HomeCard";
import LocationSearchInput from "./LocationSearchInput";
import HomeButton from "./HomeButton";
export const MyContext = React.createContext();

export default class MyProvider extends React.Component {
  state = {
    address: "",
    latitude: "",
    longitude: "",
    home: {
      mode: "",
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
      timezone: "",
      currencyCode: "",
      toCurrency: "",
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
    console.log(country);
    const currencyCode = countryCurrency[country];
    console.log(currencyCode);
    axios
      .get(
        "https://api.exchangeratesapi.io/latest?base=USD&symbols=" +
          currencyCode
      )
      .then(currencyResults => {
        let results = currencyResults.data;
        console.log(results["rates"][currencyCode]);

        this.setState({
          home: {
            ...this.state.home,
            currencyCode: currencyCode,
            toCurrency: results["rates"][currencyCode]
          }
        });
      });
  };

  splitAddress = address => {
    let split = address.split(", ");
    console.log(split);

    console.log(address.split(",").length - 1);

    if (address.split(",").length - 1 === 2) {
      const city = split[0];
      const state = split[1];
      const country = split[2];
      console.log(city);
      console.log(state);
      console.log(country);

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

      console.log(city);
      console.log(country);

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

  handleSelectHome = address => {
    geocodeByAddress(address)
      .then(this.splitAddress(address))
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        this.setState({
          home: {
            ...this.state.home,
            latitude: lat,
            longitude: lng
          }
        })
      )
      .catch(error => console.error("Error", error));
  };

  homeLocaltoState = () => {
    this.setState({
      home: {
        ...this.state.home,
        latitude: localStorage.getItem("homeLat"),
        longitude: localStorage.getItem("homeLong"),
        city: localStorage.getItem("homeCity"),
        state: localStorage.getItem("homeState"),
        country: localStorage.getItem("homeCountry")
      }
    });
  };

  onClickSetHome = e => {
    e.preventDefault();
    localStorage.setItem("homeLat", this.state.home.latitude);
    localStorage.setItem("homeLong", this.state.home.longitude);
    localStorage.setItem("homeCity", this.state.home.city);
    localStorage.setItem("homeState", this.state.home.state);
    localStorage.setItem("homeCountry", this.state.home.country);

    if (this.state.home.latitude & this.state.home.longitude) {
      console.log(
        "We have lats and longs " +
          this.state.home.latitude +
          " " +
          this.state.home.longitude
      );
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3c70f1ca1b87636d0e17fa5d97885be/" +
            this.state.home.latitude +
            "," +
            this.state.home.longitude +
            "?exclude=minutely,hourly,alerts,flags"
        )
        .then(weatherResults => {
          console.log(weatherResults.data.timezone);
          this.setState({
            home: {
              ...this.state.home,
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

  getHomeWeather = () => {
    if (localStorage.getItem("homeLat") & localStorage.getItem("homeLong")) {
      console.log(
        "We have lats and longs " +
          this.state.home.latitude +
          " " +
          this.state.home.longitude
      );
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e3c70f1ca1b87636d0e17fa5d97885be/" +
            this.state.home.latitude +
            "," +
            this.state.home.longitude +
            "?exclude=minutely,hourly,alerts,flags"
        )
        .then(weatherResults => {
          console.log(weatherResults.data.timezone);
          this.setState({
            home: {
              ...this.state.home,
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
        });
    }
  };

  getCurrencyName = currencyCode => {
    return currency[currencyCode]["name"];
  };

  getCurrencySymbol = currencyCode => {
    return currency[currencyCode]["symbol"];
  };

  renderView = () => {
    this.setState({
      home: {
        ...this.state.home,
        mode: "view"
      }
    });
  };

  componentDidMount() {
    const renderHome = async () => {
      await this.homeLocaltoState();
      await this.getHomeWeather();
      await this.getCurrency(this.state.home.country);
      await this.renderView();
      throw new Error("oops");
    };
    if (localStorage.getItem("homeLat") & localStorage.getItem("homeLong")) {
      renderHome().catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    // console.log(currency["JPY"]["name"]);
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          splitAddress: this.splitAddress,
          handleChange: this.handleChange,
          handleSelect: this.handleSelectHome,
          onClick: this.onClickSetHome
        }}
      >
        {this.props.children}
        <div className="input-layout">
          <LocationSearchInput />
          <HomeButton />
        </div>
        {this.state.home.currencyCode && (
          <HomeCard
            homeCity={this.state.home.city}
            homeState={this.state.home.state}
            homeCountry={this.state.home.country}
            homeTemperature={this.state.home.weather.temperature}
            homeLow={this.state.home.weather.low}
            homeHigh={this.state.home.weather.high}
            homePrecip={this.state.home.weather.precip}
            homeWind={this.state.home.weather.wind}
            homeHumid={this.state.home.weather.humidity}
            homeToCurrency={this.state.home.toCurrency}
            currencySymbol={this.getCurrencySymbol(
              this.state.home.currencyCode
            )}
            currencyName={this.getCurrencyName(this.state.home.currencyCode)}
          />
        )}
      </MyContext.Provider>
    );
  }
}
