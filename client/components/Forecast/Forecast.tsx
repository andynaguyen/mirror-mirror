import * as React from 'react';
import styled from 'styled-components';
import { ForecastProps } from './types';

// Maps the icon name from the API to the proper weather icon class name.
const ICON_MAP = {
  'clear-day': 'wi wi-day-sunny',
  'clear-night': 'wi wi-night-clear',
  cloudy: 'wi wi-cloudy',
  default: 'wi wi-na',
  fog: 'wi wi-fog',
  hail: 'wi wi-hail',
  'partly-cloudy-day': 'wi wi-day-cloudy',
  'partly-cloudy-night': 'wi wi-night-cloudy',
  rain: 'wi wi-rain',
  sleet: 'wi wi-sleet',
  snow: 'wi wi-snow',
  thunderstorm: 'wi wi-thunderstorm',
  tornado: 'wi wi-tornado',
  wind: 'wi wi-strong-wind',
};

const Temperature = styled.div`
  font-family: 'Raleway';
  font-size: 48px;
  float: left;
`;

const Summary = styled.span`
  font-size: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const PlainText = styled.span`
  font-family: 'Raleway';
`;

const WeatherIcon = styled.i`
  font-size: 64px;
  margin-left: 30px;
`;

const MiniWeatherIcon = styled.i`
  font-size: 24px;
  margin-right: 12px;
`;

export default ({ forecast, visible }: ForecastProps) => {
  const { icon, precipitation, summary, temperature, wind } = forecast;
  const iconClass = ICON_MAP[icon] || ICON_MAP.default;
  return visible ? (
    <>
      <div>
        <Temperature>
          {temperature} <i className="wi wi-fahrenheit" />
        </Temperature>
        <WeatherIcon className={iconClass} />
      </div>
      <div>
        <Summary>{summary}</Summary>
      </div>
      <div>
        <MiniWeatherIcon className="wi wi-umbrella" />
        <PlainText>{precipitation}</PlainText>%
      </div>
      <div>
        <MiniWeatherIcon className="wi wi-strong-wind" />
        <PlainText>{wind}</PlainText> mph
      </div>
    </>
  ) : null;
};
