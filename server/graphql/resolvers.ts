import axios from 'axios';
import createDebug from 'debug';
import { buildQuery } from '../util';
import { ForecastData, TrafficData, NewsFeedData, Headline } from '../../common/types';

type Resolver<T> = (...args: any[]) => Promise<T>;

interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Gets coordinates (latitude and longitude) for given address.
 * @param address address to find coordinates of
 */
const getCoordinates: Resolver<Coordinates> = async (address: string) => {
  const debug = createDebug('graphql:getCoordinates');
  debug('start');
  const { GEOCODING_API_KEY } = process.env;
  const params = {
    key: GEOCODING_API_KEY,
    address,
  };
  debug('params (no key):  ', { address });
  const query = buildQuery('https://maps.googleapis.com/maps/api/geocode/json?', params);

  const coordinates = await axios.get(query);
  const { status, results } = coordinates.data;
  if (status !== 'OK') {
    throw new Error('Non-OK status returned from query.');
  }
  const { lat, lng } = results[0].geometry.location;
  const result = {
    latitude: lat,
    longitude: lng,
  };
  debug('result:  ', results[0].geometry.location);
  debug('end');
  return result;
};

/**
 * Gets forecast data for the latitude and longitude (from the environment variables)
 * using the Dark Sky API.
 */
const getForecast: Resolver<ForecastData> = async () => {
  const debug = createDebug('graphql:getForecast');
  debug('start');
  const { DARK_SKY_KEY, ADDRESS } = process.env;
  const { latitude, longitude } = await getCoordinates(ADDRESS);
  debug('params (no key):  ', { latitude, longitude });
  const query = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${latitude},${longitude}`;

  const forecast = await axios.get(query);
  const { currently, hourly } = forecast.data;
  const result = {
    icon: currently.icon,
    precipitation: currently.precipProbability,
    summary: hourly.summary,
    temperature: Math.floor(currently.temperature),
    wind: currently.windSpeed,
  };

  debug('result:  ', result);
  debug('end');
  return result;
};

/**
 * Gets traffic data for the address and destination (from the environment variables)
 * using the Google Maps Distance Matrix API.
 */
const getTraffic: Resolver<TrafficData> = async () => {
  const debug = createDebug('graphql:getTraffic');
  debug('start');
  const { DESTINATION, DISTANCE_MATRIX_API_KEY, ADDRESS } = process.env;
  const params = {
    destinations: DESTINATION,
    key: DISTANCE_MATRIX_API_KEY,
    origins: ADDRESS,
    units: 'imperial',
  };
  debug('params (no key):  ', {
    destinations: DESTINATION,
    origins: ADDRESS,
    units: 'imperial',
  });
  const query = buildQuery('https://maps.googleapis.com/maps/api/distancematrix/json?', params);

  const traffic = await axios.get(query);
  const { rows, status } = traffic.data;
  if (status !== 'OK') {
    throw new Error('Non-OK status returned from query.');
  }
  const { distance, duration } = rows[0].elements[0];
  const result = {
    distance: distance.text,
    duration: duration.text,
  };
  debug('result:  ', result);
  debug('end');
  return result;
};

/**
 * Gets the headlines for trending news articles from Google News using the News API.
 */
const getNewsFeed: Resolver<NewsFeedData> = async () => {
  const debug = createDebug('graphql:getNewsFeed');
  debug('start');
  const { NEWS_API_KEY } = process.env;
  const params = {
    sources: 'google-news',
    apiKey: NEWS_API_KEY,
  };
  debug('params (no key):  ', { sources: 'google-news' });
  const query = buildQuery('https://newsapi.org/v2/top-headlines?', params);

  const newsFeed = await axios.get(query);
  const { articles, status } = newsFeed.data;
  if (status !== 'ok') {
    throw new Error('Non-OK status returned from query.');
  }

  const headlines = articles
    .slice(0, 4)
    .map(({ title, description }: Headline) => ({ title, description }));
  const result = { feed: headlines };
  debug('result:  ', result);
  debug('end');
  return result;
};

export { getForecast, getTraffic, getNewsFeed, getCoordinates };
