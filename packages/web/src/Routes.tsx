import React from 'react';
import MainPage from 'pages/MainPage';
import GamePage from 'pages/GamePage';
import { Layout } from 'components';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import { qu, isLauncher } from 'helpers';

const history = isLauncher ? createHashHistory() : createBrowserHistory();

history.listen(() => {
  qu('pageview');
});

const Routes = () => {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/game/:slug" component={GamePage} />
          <Route path="/" component={MainPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
