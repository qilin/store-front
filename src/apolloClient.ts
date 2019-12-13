import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { env } from 'helpers';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${env('API_URL')}/v1/graphql`,
});

const client = new ApolloClient({
  cache: cache,
  link: link,
});

export default client;
