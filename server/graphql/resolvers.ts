import axios from 'axios';
import { buildQuery } from '../util';
import { ForecastData, TrafficData, NewsFeedData, Headline } from '../../common/types';

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
  if (status !== 'OK') {
    throw new Error('Non-OK status returned from query.');
  }
  const { distance, duration } = rows[0].elements[0];
  return {
    distance: distance.text,
    duration: duration.text,
  };
};

const getNewsFeed: Resolver<NewsFeedData> = async () => {
  const { NEWS_API_KEY } = process.env;
  const params = {
    sources: 'google-news',
    apiKey: NEWS_API_KEY,
  };
  const query = buildQuery('https://newsapi.org/v2/top-headlines?', params);

  const newsFeed = await axios.get(query);
  const { articles, status } = newsFeed.data;
  if (status !== 'ok') {
    throw new Error('Non-OK status returned from query.');
  }

  const headlines = articles.slice(0, 4).map(({ title, description }: Headline) => ({ title, description }));
  return { feed: headlines };
};

export { getForecast, getTraffic, getNewsFeed };
