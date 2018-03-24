import axios from 'axios';
import { buildQuery } from '../util';
import { ForecastData, TrafficData } from '../../common/types';

type Resolver<T> = () => Promise<T>;

/**
 * Gets forecast data for the latitude and longitude (from the environment variables)
 * using the Dark Sky API.
 */
const getForecast: Resolver<ForecastData> = async () => {
  const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = process.env;
  const query = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE}`;

  const forecast = await axios.get(query);
  const { currently, hourly } = forecast.data;
  return {
    icon: currently.icon,
    precipitation: currently.precipProbability,
    summary: hourly.summary,
    temperature: Math.floor(currently.temperature),
    wind: currently.windSpeed,
  };
};

/**
 * Gets traffic data for the origin and destination (from the environment variables)
 * using the Google Maps API.
 */
const getTraffic: Resolver<TrafficData> = async () => {
  const { DESTINATION, GOOGLE_MAPS_KEY, ORIGIN } = process.env;
  const params = {
    destinations: DESTINATION,
    key: GOOGLE_MAPS_KEY,
    origins: ORIGIN,
    units: 'imperial',
  };
  const query = buildQuery('https://maps.googleapis.com/maps/api/distancematrix/json?', params);

  const traffic = await axios.get(query);
  const { rows, status } = traffic.data;
  if (status === 'OK') {
    const { distance, duration } = rows[0].elements[0];
    return {
      distance: distance.text,
      duration: duration.text,
    };
  } else {
    throw new Error('Non-OK status returned from query.');
  }
};

export { getForecast, getTraffic };
