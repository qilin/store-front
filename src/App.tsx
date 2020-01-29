import React from 'react';
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
import { qu } from 'helpers';
import { logout, login } from 'auth';
import { Layout } from 'components';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from 'query';

export const UserContext = React.createContext<any>({});

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

export default App;
