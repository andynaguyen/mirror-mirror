import axios from 'axios';
import * as React from 'react';
import styled from 'styled-components';
import withRefresh from '../refresher';

const REFRESH_INTERVAL = 1000 * 60 * 60; // 1 hour

// Maps the icon name from the API to the proper weather icon class name.
const ICON_MAP = {
  'clear-day': 'wi wi-day-sunny',
  'clear-night': 'wi wi-night-clear',
  'cloudy': 'wi wi-cloudy',
  'default': 'wi wi-na',
  'fog': 'wi wi-fog',
  'hail': 'wi wi-hail',
  'partly-cloudy-day': 'wi wi-day-cloudy',
  'partly-cloudy-night': 'wi wi-night-cloudy',
  'rain': 'wi wi-rain',
  'sleet': 'wi wi-sleet',
  'snow': 'wi wi-snow',
  'thunderstorm': 'wi wi-thunderstorm',
  'tornado': 'wi wi-tornado',
  'wind': 'wi wi-strong-wind',
};

interface ForecastProps {
  icon: string;
  precipitation: number;
  summary: string;
  temperature: number;
  wind: number;
  visible: boolean;
}

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

const Forecast: React.SFC<ForecastProps> = ({ icon, precipitation, summary, temperature, wind, visible }) => {
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

const defaultState = {
  icon: 'default',
  precipitation: 0,
  summary: 'N/A',
  temperature: 0,
  wind: 0,
};

const options = {
  defaultState,
  interval: REFRESH_INTERVAL,
  refresh: async () => {
    try {
      const forecast = await axios.get('/api/forecast');
      return forecast.data;
    } catch (error) {
      console.error(error);
      return defaultState;
    }
  },
};

/**
 * A component showing the weather forecast that updates every hour.
 */
const EnhancedForecast = withRefresh(options, Forecast);
export default EnhancedForecast;
