import { ApolloClient } from 'apollo-client';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { login } from 'auth';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

// const checkSessionInvalid = (error: any) => {
//   return error.result?.error.includes('invalid_session');
// };

const customFetch = async (uri: string, options: any) => {
  const response = await fetch(uri, options);

  if (response.status === 401) {
    login(false);
  }

  return response;
};

const cache = new InMemoryCache({ fragmentMatcher });
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/v1/graphql`,
  credentials: 'include', // only develop mode,
  fetch: customFetch,
});

// const errorLink = onError(({ networkError }) => {
//   // if (checkSessionInvalid(networkError)) login(false);
//   if (networkError && networkError.statusCode &&  networkError.statusCode === 401) {
//     login(false);
//   }
// });

const client = new ApolloClient({
  cache: cache,
  link: httpLink,
});

export default client;
