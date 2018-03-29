import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Forecast, Traffic, NewsFeed } from './types';
import { getForecast, getTraffic, getNewsFeed } from './resolvers';

type GraphQLQuery = {
  type: GraphQLObjectType;
  resolve: () => Promise<object>;
};

const withLogging = ({ type, resolve }: GraphQLQuery): GraphQLQuery => ({
  type,
  resolve: async () => {
    try {
      const data = await resolve();
      console.log(`GraphQL query [${type}] result:  `, data);
      return data;
    } catch (error) {
      console.log(`GraphQL query [${type}] error:  `, error);
      return {};
    }
  },
});

const queries = {
  traffic: withLogging({
    type: Traffic,
    resolve: getTraffic,
  }),
  forecast: withLogging({
    type: Forecast,
    resolve: getForecast,
  }),
  newsFeed: withLogging({
    type: NewsFeed,
    resolve: getNewsFeed,
  }),
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
  }),
});
