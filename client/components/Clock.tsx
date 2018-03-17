import moment from 'moment';
import * as React from 'react';
import withRefresh from '../refresher';

const DATE_FORMAT = 'MMM Do, YYYY';
const DAY_FORMAT = 'dddd';
const TIME_FORMAT = 'hh:mm:ss';
const REFRESH_INTERVAL = 1000;

interface ClockProps {
  date: string;
  day: string;
  time: string;
  visible: boolean;
}

const Clock: React.SFC<ClockProps> = ({ date, day, time, visible }) =>
  visible ? (
    <div>
      {date} {time} {day} {visible}
    </div>
  ) : null;

/**
 * Packages the date, day and time of the moment variable into an object.
 *
 * @param m moment object to format
 */
const formatMoment = (m: moment.Moment) => ({
  date: m.format(DATE_FORMAT),
  day: m.format(DAY_FORMAT),
  time: m.format(TIME_FORMAT),
});

const options = {
  defaultState: formatMoment(moment(0)),
  interval: REFRESH_INTERVAL,
  refresh: () => Promise.resolve(formatMoment(moment())),
};

/**
 * A clock component that updates the date, day, and time every second.
 */
const EnhancedClock = withRefresh(options, Clock);
export default EnhancedClock;
