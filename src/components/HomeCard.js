import React from "react";
import Clock from "react-live-clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLongArrowAltDown,
  faLongArrowAltUp,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
// import getSymbolFromCurrency from "currency-symbol-map";
import { MyContext } from "./MyProvider";

const HomeCard = props => (
  <MyContext.Consumer>
    {context => (
      <div className="card">
        <div className="header">
          <FontAwesomeIcon icon={faHome} />
          <h1 className="city">
            {props.homeCity}, {props.homeState} {props.homeCountry}
          </h1>
          <FontAwesomeIcon
            className="delete"
            icon={faTimesCircle}
            onClick={props.onClick}
          />
        </div>
        <Clock
          timezone={context.state.home.timezone}
          format={"h:mm:ssa"}
          ticking={true}
        />
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
            <span>Precip: {props.homePrecip}%</span>
            <span>Wind: {props.homeWind} MPH</span>
            <span>
              Humidity: {props.homeHumid.toString().replace(/^[0.]+/, "")}%
            </span>
          </div>
        </div>
        <div className="hi-low">
          <span>
            <FontAwesomeIcon icon={faLongArrowAltDown} />
            <i className="fas fa-long-arrow-alt-down" />
            {parseInt(props.homeLow)}˚
            <FontAwesomeIcon icon={faLongArrowAltUp} />
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
