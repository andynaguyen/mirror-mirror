import axios from 'axios';
import * as express from 'express';
import { index } from '../routes';

// Mocks
class MockResponse {
  public json = jest.fn();
  public send = jest.fn();
  public sendFile = jest.fn();
}

let mockRes;

// Tests
describe('routes/index', () => {
  it('should send index.html', () => {
    mockRes = new MockResponse();
    index('mock/')(null, mockRes);
    expect(mockRes.sendFile).toHaveBeenCalledWith('mock/index.html');
  });
});
