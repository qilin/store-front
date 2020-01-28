import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import '@qilin/shared/src/i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { qu } from '@qilin/shared/src/helpers';
import { ApolloProvider } from '@apollo/react-hooks';

import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import { Layout } from './components';
import client from './apolloClient';

const history = createBrowserHistory();

history.listen(() => {
  qu('pageview');
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
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
