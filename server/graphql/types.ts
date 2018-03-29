import { GraphQLString, GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql';

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

const Headline = new GraphQLObjectType({
  name: 'Headline',
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const NewsFeed = new GraphQLObjectType({
  name: 'NewsQuery',
  fields: {
    feed: { type: new GraphQLList(Headline) },
  },
});

export { Forecast, Traffic, NewsFeed };
