import axios from 'axios';
import { Request, Response } from 'express';

type RouteHandler = (req: Request, res: Response) => void;

/**
 * Return the 'index.html' file.
 */
const index: RouteHandler = (req, res) => {
  res.sendFile('./index.html');
};

/**
 * Gets forecast data for the latitude and longitude (from the environment
 * variables) using the Dark Sky API.
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

export { index, getForecast };
