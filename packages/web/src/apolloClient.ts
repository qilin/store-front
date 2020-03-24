import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { login } from 'auth';

const INVALID_SESSION_STATUS_CODE = 474;

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

const customFetch = async (uri: string, options: any) => {
  const response = await fetch(uri, options);

  if (response.status === INVALID_SESSION_STATUS_CODE) {
    login(false);
  }

  return response;
};

const cache = new InMemoryCache({ fragmentMatcher });
const link = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/v1/graphql`,
  credentials: 'include',
  fetch: customFetch,
});

const client = new ApolloClient({ cache, link });

export default client;
