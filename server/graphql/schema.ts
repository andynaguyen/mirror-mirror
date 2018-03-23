import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { Forecast, Traffic } from './types';
import { getForecast, getTraffic } from './resolvers';

type GraphQLQuery = {
  type: GraphQLObjectType;
  resolve: () => Promise<object>;
};

const withLogging = ({ type, resolve }: GraphQLQuery) => ({
  type,
  resolve: async () => {
    console.log(`GraphQL: query ${type} start.`);
    try {
      const data = await resolve();
      console.log(`Result:  `, data);
      console.log(`GraphQL: query ${type} end.`);
      return data;
    } catch (error) {
      console.log('GraphQL Error:  ', error);
      console.log(`GraphQL: query ${type} end.`);
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
};

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
  }),
});
