import React from 'react';

const City = props => (
  <div className='card'>
    <h1 className='city'>Tokyo, Japan</h1>
    <h3 className='time'>6:10 PM</h3>
    <span className='date'>Fri 08 Feb</span>

    <div className='weather'>
      <strong className='temperature'>
        78<span>˚</span>
        <span className='scale'>f</span>
      </strong>
      <span className='weather-icon'>
        <i className='fas fa-cloud-sun fa-lg' />
      </span>
      <div className='weather-details'>
        <span>Precip: 56%</span>
        <span>Wind: 11 MPH</span>Humidity: 82%
      </div>
    </div>
    <div className='hi-low'>
      <span>
        <i className='fas fa-long-arrow-alt-down' />
        72˚
        <i className='fas fa-long-arrow-alt-up' />
        85˚
      </span>
      <span className='weather-icon-desc'>Partly Cloudy</span>
    </div>
    <div className='money'>$1 USD = ¥109.765 JPY</div>
  </div>
);

export default CityCard;
