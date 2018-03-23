import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ForecastResponse, ApolloWrapperProps } from './types';

const query = gql`
  query {
    forecast {
      icon
      precipitation
      summary
      temperature
      wind
    }
  }
`;

export default graphql<ForecastResponse, ApolloWrapperProps>(query, {
  options: {
    pollInterval: 1000 * 60 * 60, // 1 hour
    fetchPolicy: 'network-only',
  },
  props: ({ data: { forecast, error } }) => ({
    forecast: {
      icon: error || !forecast ? 'default' : forecast.icon,
      precipitation: error || !forecast ? -1 : forecast.precipitation,
      summary: error || !forecast ? 'N/A' : forecast.summary,
      temperature: error || !forecast ? -1 : forecast.temperature,
      wind: error || !forecast ? -1 : forecast.wind,
    },
  }),
});
