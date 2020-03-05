import React, { useContext, useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import { UserContext } from 'App';
import useUpdate from 'hooks/useUpdate';
import Routes from 'Routes';
import { LauncherLoader, LauncherUpdater } from 'components';
import { getUrlParameter, qu } from 'helpers';
import { AppInfo } from 'types';

const { ipcRenderer = {}, IPCConstants = {} } = (window as any).interop || {};

export const LauncherContext = React.createContext<any>({});

const Launcher = () => {
  const updateState = useUpdate(IPCConstants, ipcRenderer);
  const { updateChecked, checkUpdate } = updateState;
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const { user, loading, onLogin } = useContext(UserContext);
  const showAuth = !user && !getUrlParameter('auth_guest');
  const showUpdate = !updateChecked && !getUrlParameter('initial_update_checked');

  const handleAppInit = (_event: IpcRendererEvent, appInfo: AppInfo) => {
    qu('myevent', { key: IPCConstants.APP_INIT, data: { appInfo } });
    setAppInfo(appInfo);
    checkUpdate({ channel: appInfo.channel, autoDownload: true });
  };

  useEffect(() => {
    ipcRenderer.on(IPCConstants.APP_INIT, handleAppInit);
  }, []);

  if (showUpdate) {
    return <LauncherUpdater appInfo={appInfo} {...updateState} />;
  }

  if (loading) {
    return <LauncherLoader />;
  }

  if (showAuth) {
    onLogin();
    return <LauncherLoader />;
  }

  return (
    <LauncherContext.Provider value={{ appInfo, ...updateState }}>
      <Routes />
    </LauncherContext.Provider >
  );
};

export default React.memo(Launcher);
