import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'i18n';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { isLauncher } from 'helpers';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import Launcher from 'Launcher';
import Routes from 'Routes';
import client from 'apolloClient';
import { GET_USER } from 'query';
import { logout, login, isAuthPassed, restoreAuthSession } from 'auth';

export const UserContext = React.createContext<any>({});

const App = () => {
  const { loading, data } = useQuery(GET_USER, { fetchPolicy: 'network-only' });
  const user = (data && data.auth) || null;

  useEffect(() => {
    if (isAuthPassed) return;

    restoreAuthSession();
  }, []);

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
