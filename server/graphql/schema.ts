import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Forecast, Traffic, NewsFeed } from './types';
import { getForecast, getTraffic, getNewsFeed } from './resolvers';

type GraphQLQuery = {
  type: GraphQLObjectType;
  resolve: () => Promise<object>;
};

const queries = {
  traffic: {
    type: Traffic,
    resolve: getTraffic,
  },
  forecast: {
    type: Forecast,
    resolve: getForecast,
  },
  newsFeed: {
    type: NewsFeed,
    resolve: getNewsFeed,
  },
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
  }),
});
