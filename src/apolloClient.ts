import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { env } from 'helpers';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

const cache = new InMemoryCache({ fragmentMatcher });
const link = new HttpLink({
  uri: `${env('API_URL')}/v1/graphql`,
});

const client = new ApolloClient({
  cache: cache,
  link: link,
});

export default client;
