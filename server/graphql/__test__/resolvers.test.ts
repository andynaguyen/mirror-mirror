import axios from 'axios';
import { getForecast, getTraffic, getNewsFeed, getCoordinates } from '../resolvers';

const mockAxiosGet = (data: object) => jest.fn((_) => Promise.resolve({ data }));

describe('getCoordinates', () => {
  const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?key=key&address=address';
  beforeEach(() => {
    process.env = {
      GEOCODING_API_KEY: 'key',
    };
  });

  it('should get coordinates with successful response', async () => {
    axios.get = mockAxiosGet({
      status: 'OK',
      results: [
        {
          geometry: {
            location: {
              lat: 'latitude',
              lng: 'longitude',
            },
          },
        },
      ],
    });

    const coordinates = await getCoordinates('address');
    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(coordinates).toEqual({
      latitude: 'latitude',
      longitude: 'longitude',
    });
  });

  it('should throw error if response is not ok', async () => {
    axios.get = mockAxiosGet({ status: 'Error' });
    try {
      await getCoordinates('address');
    } catch (error) {
      expect(error).toEqual(Error('Non-OK status returned from query.'));
    }
  });
});

describe('getForecast', () => {
  const endpoint = 'https://api.darksky.net/forecast/key/latitude,longitude';
  beforeEach(() => {
    process.env = {
      DARK_SKY_KEY: 'key',
      ADDRESS: 'address',
    };
  });

  it('should get forecast data', async () => {
    const mockForecastResponse = {
      data: {
        currently: {
          icon: 'icon',
          precipProbability: 0,
          temperature: 100.5,
          windSpeed: 2,
        },
        hourly: {
          summary: 'summary',
        },
      },
    };

    const mockCoordinatesResponse = {
      data: {
        status: 'OK',
        results: [
          {
            geometry: {
              location: {
                lat: 'latitude',
                lng: 'longitude',
              },
            },
          },
        ],
      },
    };
    axios.get = jest.fn(
      (addr) =>
        addr === endpoint
          ? Promise.resolve(mockForecastResponse)
          : Promise.resolve(mockCoordinatesResponse),
    );

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
    'https://maps.googleapis.com/maps/api/distancematrix/json?' +
    'destinations=destination&key=key&origins=address&units=imperial';
  beforeEach(() => {
    process.env = {
      DESTINATION: 'destination',
      DISTANCE_MATRIX_API_KEY: 'key',
      ADDRESS: 'address',
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

describe('getNewsFeed', () => {
  const endpoint = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=key';
  beforeEach(() => {
    process.env = {
      NEWS_API_KEY: 'key',
    };
  });

  it('should get news feed data with successful response', async () => {
    axios.get = mockAxiosGet({
      status: 'ok',
      articles: [
        {
          title: 'title1',
          description: 'desc1',
        },
        {
          title: 'title2',
          description: 'desc2',
        },
      ],
    });

    const newsFeedData = await getNewsFeed();
    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(newsFeedData.feed).toContainEqual({
      title: 'title1',
      description: 'desc1',
    });
    expect(newsFeedData.feed).toContainEqual({
      title: 'title2',
      description: 'desc2',
    });
  });

  it('should throw error if response is not ok', async () => {
    axios.get = mockAxiosGet({ status: 'error' });

    try {
      await getNewsFeed();
    } catch (error) {
      expect(error).toEqual(Error('Non-OK status returned from query.'));
    }
  });
});
