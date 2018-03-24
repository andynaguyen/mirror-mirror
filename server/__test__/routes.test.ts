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
    index(null, mockRes);
    expect(mockRes.sendFile).toHaveBeenCalled();
    expect(mockRes.sendFile).toHaveBeenCalledWith('./index.html');
  });
});
