import React from "react";
import Clock from "react-live-clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
// import getSymbolFromCurrency from "currency-symbol-map";
import { MyContext } from "./MyProvider";

// const temperature = parseInt(props.homeTemp);

const HomeCard = props => (
  <MyContext.Consumer>
    {context => (
      <div className="card">
        <h1 className="city">
          <FontAwesomeIcon icon={faHome} /> {props.homeCity}, {props.homeState}{" "}
          {props.homeCountry}
        </h1>
        <Clock timezone={"US/Pacific"} format={"h:mm:ssa"} ticking={true} />
        <span className="date">
          <Clock
            timezone={"US/Pacific"}
            format={"ddd, MMMM Mo, YYYY"}
            ticking={false}
          />
        </span>

        <div className="weather">
          <strong className="temperature">
            {parseInt(props.homeTemperature)}
            <span>˚</span>
            <span className="scale">f</span>
          </strong>
          <span className="weather-icon">
            <i className="fas fa-cloud-sun fa-lg" />
          </span>
          <div className="weather-details">
            <span>
              Precip: {props.homePrecip.toString().replace(/^[0.]+/, "")}%
            </span>
            <span>Wind: {props.homeWind} MPH</span>
            <span>
              Humidity: {props.homeHumid.toString().replace(/^[0.]+/, "")}%
            </span>
          </div>
        </div>
        <div className="hi-low">
          <span>
            <i className="fas fa-long-arrow-alt-down" />
            {parseInt(props.homeLow)}˚
            <i className="fas fa-long-arrow-alt-up" />
            {parseInt(props.homeHigh)}˚
          </span>
          <span className="weather-icon-desc">{props.homeDesc}</span>
        </div>
        <div className="money">
          Currency: {props.currencySymbol} {props.currencyName}
        </div>
      </div>
    )}
  </MyContext.Consumer>
);

export default HomeCard;
