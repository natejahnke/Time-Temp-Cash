import React from "react";
import Clock from "react-live-clock";

// const date = props.homeDate;

const HomeCard = props => (
  <div className="card">
    <h1 className="city">
      {props.homeCity}, {props.homeState}, {props.homeCountry}
    </h1>
    <Clock
      timezone={"US/Pacific"}
      format={"h:mm:ssa"}
      ticking={true}
      className={"clock"}
    />
    <span className="date">
      {/* {new Date().toLocaleString("en-US", { timeZone: date })} */}
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
    <div className="money">$1 USD = ¥109.765 JPY</div>
  </div>
);

export default HomeCard;
