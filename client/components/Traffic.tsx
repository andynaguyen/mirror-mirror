import axios from 'axios';
import * as React from 'react';
import { graphql, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import withRefresh from '../refresher';

const query = gql`
  query {
    traffic {
      distance
      duration
    }
  }
`;

const REFRESH_INTERVAL = 1000 * 60 * 15; // 15 min

interface TrafficProps extends ApolloWrapperProps {
  data: QueryProps<TrafficData>;
  traffic: TrafficData;
}

interface ApolloWrapperProps {
  visible: boolean;
}

type TrafficData = {
  distance: string;
  duration: string;
};

type Response = {
  traffic: TrafficData;
};

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

const Traffic: React.SFC<TrafficProps> = ({ traffic, visible }) => {
  return visible ? (
    <Container>
      <CarIcon className="icon-directions_car" />
      {traffic.distance} - {traffic.duration}
    </Container>
  ) : null;
};

const defaultState = {
  distance: 'N/A',
  duration: 'N/A',
};

/**
 * A component showing basic traffic conditions updated at every 15 minutes.
 */
const EnhancedTraffic: React.ComponentClass<ApolloWrapperProps> = graphql<Response, ApolloWrapperProps>(query, {
  options: {
    pollInterval: REFRESH_INTERVAL,
    fetchPolicy: 'network-only',
  },
  props: ({ data: { traffic, error } }) =>
    error
      ? { traffic: defaultState }
      : {
          traffic: {
            distance: traffic && traffic.distance,
            duration: traffic && traffic.duration,
          },
        },
})(Traffic);
export default EnhancedTraffic;
