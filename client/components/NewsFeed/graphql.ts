import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NewsFeedResponse, ApolloWrapperProps } from './types';

const query = gql`
  query {
    newsFeed {
      feed {
        title
        description
      }
    }
  }
`;

export default graphql<NewsFeedResponse, ApolloWrapperProps>(query, {
  options: {
    pollInterval: 1000 * 60 * 15, // 15 min
    fetchPolicy: 'network-only',
  },
  props: ({ data: { newsFeed, error } }) => ({
    newsFeed: {
      feed: error || !newsFeed ? [] : newsFeed.feed,
    },
  }),
});
