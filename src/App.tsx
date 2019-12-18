import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MainPage from 'pages/MainPage';
import GamePage from 'pages/GamePage';
import { isEnvDefined } from 'helpers';
import { Layout } from 'components';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './apolloClient';

const App = () => {
  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/game/:slug" component={GamePage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </Layout>
      </Router>
    </ApolloProvider>
  );
};

export default App;
