import axios from 'axios';
import * as express from 'express';
import { getForecast, index } from '../routes';

// Mocks
const mockAxiosGet = (data: object) =>
  jest.fn((_) => Promise.resolve({ data }));

class MockResponse {
  public json = jest.fn();
  public send = jest.fn();
  public sendFile = jest.fn();
}

let mockRes;

// Tests
describe('routes/index', () => {
  beforeEach(() => {
    mockRes = new MockResponse();
  });

  it('should send index.html', () => {
    index(null, mockRes);
    expect(mockRes.sendFile).toHaveBeenCalled();
    expect(mockRes.sendFile).toHaveBeenCalledWith('./index.html');
  });
});

describe('routes/getForecast', () => {
  const endpoint = 'https://api.darksky.net/forecast/key/latitude,longitude';
  beforeEach(() => {
    mockRes = new MockResponse();
    process.env = {
      DARK_SKY_KEY: 'key',
      LATITUDE: 'latitude',
      LONGITUDE: 'longitude',
    };
  });

  it('should get forecast', async () => {
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
    await getForecast(null, mockRes);

    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(mockRes.json).toHaveBeenCalledWith({
      icon: 'icon',
      precipitation: 0,
      summary: 'summary',
      temperature: 100,
      wind: 2,
    });
  });

  it('should handle error while requesting forecast', async () => {
    axios.get = jest.fn((_) => Promise.reject('Error'));
    await getForecast(null, mockRes);

    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(mockRes.send).toHaveBeenCalledWith('Error');
  });

  it('should handle error when forecast data is malformed', async () => {
    axios.get = mockAxiosGet({});
    await getForecast(null, mockRes);

    expect(axios.get).toHaveBeenCalledWith(endpoint);
    expect(mockRes.send).toHaveBeenCalled();
  });
});
