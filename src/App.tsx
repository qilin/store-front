import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import 'i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MainPage from 'pages/MainPage';
import GamePage from 'pages/GamePage';
import { isEnvDefined, qu, ramblerAuth } from 'helpers';
import { Layout } from 'components';
import { ApolloProvider } from '@apollo/react-hooks';
import { User } from 'types';

import client from './apolloClient';

export const UserContext = React.createContext<any>({});

const history = createBrowserHistory();

history.listen(() => {
  qu('pageview');
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const onInit = (user: User) => {
    setUser(user);
    setLoading(false);
  };

  const onLogout = () => {
    ramblerAuth.logout();
    setUser(null);
  };

  const onLogin = () => {
    setLoading(true);
    ramblerAuth.openAuth();
  };

  useEffect(() => {
    ramblerAuth.init(onInit);
  }, []);

  if (!isEnvDefined()) {
    return <div>Environment variables is not defined</div>;
  }

  const userContextValue = {
    user,
    loading,
    onLogin,
    onLogout,
  };

  return (
    <UserContext.Provider value={userContextValue}>
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
    </UserContext.Provider>
  );
};

export default App;
