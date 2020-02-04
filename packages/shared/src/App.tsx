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
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';
import { Layout } from './components';
import client from './apolloClient';
import { GET_USER } from './query';
import { logout, login } from './auth';

export const UserContext = React.createContext<any>({});
export const LauncherContext = React.createContext<any>({});

const history = createBrowserHistory();

history.listen(() => {
  qu('pageview');
});

const App = () => {
  const { loading, data } = useQuery(GET_USER, { fetchPolicy: 'network-only' });
  const user = (data && data.auth) || null;

  const onLogout = () => {
    logout();
  };

  const onLogin = () => {
    login();
  };

  const userContextValue = {
    user,
    loading,
    onLogin,
    onLogout,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <Router history={history}>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/game/:slug" component={GamePage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </Layout>
      </Router>
    </UserContext.Provider>
  );
};

const AppWithApollo = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default AppWithApollo;
