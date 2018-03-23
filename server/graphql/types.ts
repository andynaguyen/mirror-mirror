import { GraphQLString, GraphQLSchema, GraphQLObjectType } from 'graphql';

const Forecast = new GraphQLObjectType({
  name: 'ForecastQuery',
  fields: {
    icon: { type: GraphQLString },
    precipitation: { type: GraphQLString },
    summary: { type: GraphQLString },
    temperature: { type: GraphQLString },
    wind: { type: GraphQLString },
  },
});

const Traffic = new GraphQLObjectType({
  name: 'TrafficQuery',
  fields: {
    distance: { type: GraphQLString },
    duration: { type: GraphQLString },
  },
});

export { Forecast, Traffic };
