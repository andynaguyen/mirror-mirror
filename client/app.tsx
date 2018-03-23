import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Layout from './Layout';

const apollo = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={apollo}>
    <Layout />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
