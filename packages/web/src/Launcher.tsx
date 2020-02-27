import React, { useContext } from 'react';
import { UserContext } from 'App';
import useUpdate from 'hooks/useUpdate';
import Routes from 'Routes';
import { LauncherLoader, LauncherUpdater } from 'components';
import { getUrlParameter } from 'helpers';

export const LauncherContext = React.createContext<any>({});

const Launcher = () => {
  const updateState = useUpdate();
  const { redirectToApp, checking, downloading, updateError } = updateState;
  const { user, loading, onLogin } = useContext(UserContext);
  const redirectToAuth = redirectToApp && !user && !getUrlParameter('skip_auth');

  if (checking || loading) {
    return <LauncherLoader />;
  }

  if (downloading || updateError) {
    return <LauncherUpdater />;
  }

  if (redirectToAuth) {
    onLogin();
    return <LauncherLoader />;
  }

  return (
    <LauncherContext.Provider value={updateState}>
      <Routes />
    </LauncherContext.Provider>
  );
};

export default Launcher;
