import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
// import 'i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import { qu } from './helpers';
import { Layout } from './components';
import { ApolloProvider } from '@apollo/react-hooks';

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
        App
        {/* <Layout>
          <Switch>
            <Route path="/game/:slug" component={GamePage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </Layout> */}
      </Router>
    </ApolloProvider>
  );
};

export default App;
