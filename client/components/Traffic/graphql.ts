import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TrafficResponse, ApolloWrapperProps } from './types';

const query = gql`
  query {
    traffic {
      distance
      duration
    }
  }
`;

export default graphql<TrafficResponse, ApolloWrapperProps>(query, {
  options: {
    pollInterval: 1000 * 60 * 15, // 15 min
    fetchPolicy: 'network-only',
  },
  props: ({ data: { traffic, error } }) => ({
    traffic: {
      distance: error || !traffic ? 'N/A' : traffic.distance,
      duration: error || !traffic ? 'N/A' : traffic.duration,
    },
  }),
});
