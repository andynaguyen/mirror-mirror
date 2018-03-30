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

const defaultState = {
  icon: 'default',
  precipitation: -1,
  summary: 'N/A',
  temperature: -1,
  wind: -1,
};

export default graphql<ForecastResponse, ApolloWrapperProps>(query, {
  options: {
    pollInterval: 1000 * 60 * 60, // 1 hour
    fetchPolicy: 'network-only',
  },
  props: ({ data: { forecast, error } }) => ({
    forecast:
      error || !forecast
        ? defaultState
        : {
            icon: forecast.icon,
            precipitation: forecast.precipitation,
            summary: forecast.summary,
            temperature: forecast.temperature,
            wind: forecast.wind,
          },
  }),
});
