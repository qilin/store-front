import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { isLauncher } from 'helpers';
import { ApolloProvider } from '@apollo/react-hooks';
import Launcher from 'Launcher';
import Routes from 'Routes';
import client from 'apolloClient';
import { GET_USER } from 'query';
import { logout, login, AUTH_PASSED } from 'auth';
import { useQuery } from 'api';

export const UserContext = React.createContext<any>({});

const App = () => {
  const { loading, ...rest } = useQuery(GET_USER, { fetchPolicy: 'network-only' });
  const user = (rest.data && rest.data.auth) || null;

  console.log(rest, 123);

  const initPage = () => {
    if (loading) return;

    if (user) {
      localStorage.removeItem(AUTH_PASSED);
      return;
    }

    const isAuthPassed = localStorage.getItem(AUTH_PASSED);

    if (isAuthPassed) return;

    localStorage.setItem(AUTH_PASSED, new Date().toString());
    login(false);
  };

  useEffect(() => {
    initPage();
  }, [loading]);

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

  console.log(user);

  return (
    <UserContext.Provider value={userContextValue}>
      <CssBaseline />
      {isLauncher ? <Launcher /> : <Routes />}
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
