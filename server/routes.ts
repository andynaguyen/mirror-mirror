import axios from 'axios';
import { Request, Response } from 'express';

type RouteHandler = (req: Request, res: Response) => void;
type QueryParameters = { [s: string]: string };

/**
 * Builds a query with parameters.
 *
 * @param base base/prefix of the query
 * @param params object representation of query parameters
 */
const buildQuery = (base: string, params: QueryParameters) => {
  const paramString = Object.entries(params)
    .map(([param, value]) => `${param}=${value}`)
    .join('&');
  return base + paramString;
};

/**
 * Return the 'index.html' file.
 */
const index: RouteHandler = (req, res) => {
  res.sendFile('./index.html');
};

/**
 * Gets forecast data for the latitude and longitude (from the environment variables)
 * using the Dark Sky API.
 */
const getForecast: RouteHandler = async (req, res) => {
  const { DARK_SKY_KEY, LATITUDE, LONGITUDE } = process.env;
  const query = `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${LATITUDE},${LONGITUDE}`;

  try {
    const forecast = await axios.get(query);
    const { currently, hourly } = forecast.data;
    res.json({
      icon: currently.icon,
      precipitation: currently.precipProbability,
      summary: hourly.summary,
      temperature: Math.floor(currently.temperature),
      wind: currently.windSpeed,
    });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

/**
 * Gets traffic data for the origin and destination (from the environment variables)
 * using the Google Maps API.
 */
const getTraffic: RouteHandler = async (req, res) => {
  const { DESTINATION, GOOGLE_MAPS_KEY, ORIGIN } = process.env;
  const params = {
    destinations: DESTINATION,
    key: GOOGLE_MAPS_KEY,
    origins: ORIGIN,
    units: 'imperial',
  };
  const query = buildQuery('https://maps.googleapis.com/maps/api/distancematrix/json?', params);

  try {
    const traffic = await axios.get(query);
    const { rows, status } = traffic.data;
    if (status === 'OK') {
      const { distance, duration } = rows[0].elements[0];
      res.json({
        distance: distance.text,
        duration: duration.text,
      });
    } else {
      throw new Error('Non-OK status returned from query.');
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export { buildQuery, index, getForecast, getTraffic };
