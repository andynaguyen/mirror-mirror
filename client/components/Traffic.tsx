import axios from 'axios';
import * as React from 'react';
import styled from 'styled-components';
import withRefresh from '../refresher';

const REFRESH_INTERVAL = 1000 * 60 * 15; // 15 min

interface TrafficProps {
  distance: string;
  duration: string;
  visible: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const CarIcon = styled.i`
  color: white;
  font-size: 22px;
  width: 36px;
`;

const Traffic: React.SFC<TrafficProps> = ({ distance, duration, visible }) => {
  return visible ? (
    <Container>
      <CarIcon className="icon-directions_car" />
      {distance} - {duration}
    </Container>
  ) : null;
};

const defaultState = {
  distance: 'N/A',
  duration: 'N/A',
};

const options = {
  defaultState,
  interval: REFRESH_INTERVAL,
  refresh: async () => {
    try {
      const traffic = await axios.get('/api/traffic');
      return traffic.data;
    } catch (error) {
      console.error(error);
      return defaultState;
    }
  },
};

/**
 * A component showing basic traffic conditions updated at every 15 minutes.
 */
const EnhancedTraffic = withRefresh(options, Traffic);
export default EnhancedTraffic;
