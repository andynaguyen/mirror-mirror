import moment from 'moment';
import * as React from 'react';
import Clock from './Clock';
import withRefresh, { RefreshOptions } from '../../refresher';
import { ClockData } from './types';

const DATE_FORMAT = 'MMM Do, YYYY';
const DAY_FORMAT = 'dddd';
const TIME_FORMAT = 'hh:mm:ss';
const REFRESH_INTERVAL = 1000;

/**
 * Packages the date, day and time of the moment variable into an object.
 *
 * @param m moment object to format
 */
const formatMoment = (m: moment.Moment): ClockData => ({
  date: m.format(DATE_FORMAT),
  day: m.format(DAY_FORMAT),
  time: m.format(TIME_FORMAT),
});

const options: RefreshOptions<ClockData> = {
  defaultState: formatMoment(moment(0)),
  interval: REFRESH_INTERVAL,
  refresh: () => Promise.resolve(formatMoment(moment())),
};

/**
 * A clock component that updates the date, day, and time every second.
 */
const EnhancedClock = withRefresh(options, Clock);
export default EnhancedClock;
