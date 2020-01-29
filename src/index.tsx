import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import client from './apolloClient';

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));
