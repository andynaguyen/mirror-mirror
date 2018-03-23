import { buildQuery } from '../util';

describe('buildQuery', () => {
  it('should build query with params', () => {
    const base = 'https://base.com/';
    const params = {
      a: '1',
      b: '2',
      c: '3',
    };
    const expected = 'https://base.com/a=1&b=2&c=3';
    expect(buildQuery(base, params)).toBe(expected);
  });

  it('should build query with no params', () => {
    const base = 'https://base.com/';
    const params = {};
    const expected = 'https://base.com/';
    expect(buildQuery(base, params)).toBe(expected);
  });
});
