import axios from 'axios';
import { getForecast, getTraffic } from '../resolvers';

const mockAxiosGet = (data: object) => jest.fn((_) => Promise.resolve({ data }));

describe('getForecast', () => {
  const endpoint = 'https://api.darksky.net/forecast/key/latitude,longitude';
  beforeEach(() => {
    process.env = {
      DARK_SKY_KEY: 'key',
      LATITUDE: 'latitude',
      LONGITUDE: 'longitude',
    };
  });

  it('should get forecast data', async () => {
    axios.get = mockAxiosGet({
      currently: {
        icon: 'icon',
        precipProbability: 0,
        temperature: 100.5,
        windSpeed: 2,
      },
      hourly: {
        summary: 'summary',
      },
    });

    const forecastData = await getForecast();
    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(forecastData).toEqual({
      icon: 'icon',
      precipitation: 0,
      summary: 'summary',
      temperature: 100,
      wind: 2,
    });
  });
});

describe('getTraffic', () => {
  const endpoint =
    'https://maps.googleapis.com/maps/api/distancematrix/json?destinations=destination&key=googleMapsKey&origins=origin&units=imperial'; // tslint:disable-line
  beforeEach(() => {
    process.env = {
      DESTINATION: 'destination',
      GOOGLE_MAPS_KEY: 'googleMapsKey',
      ORIGIN: 'origin',
    };
  });

  it('should get traffic data with successful response', async () => {
    axios.get = mockAxiosGet({
      rows: [
        {
          elements: [
            {
              distance: { text: 'distance' },
              duration: { text: 'duration' },
            },
          ],
        },
      ],
      status: 'OK',
    });
    const trafficData = await getTraffic();
    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(trafficData).toEqual({
      distance: 'distance',
      duration: 'duration',
    });
  });

  it('should throw error if response is not OK', async () => {
    axios.get = mockAxiosGet({ rows: [], status: 'Error' });

    try {
      await getTraffic();
    } catch (error) {
      expect(error).toEqual(Error('Non-OK status returned from query.'));
    }
  });
});
