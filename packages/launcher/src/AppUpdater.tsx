import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import App, { LauncherContext } from '@qilin/shared/src/App';
import { BACKGROUND_DARK } from '@qilin/shared/src/styles/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTranslation } from 'react-i18next';

import {
  CHECK_FOR_UPDATE_PENDING,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_SUCCESS,
  QUIT_AND_INSTALL_UPDATE,
  APP_INFO,
} from './ipc.constants';

const useStyle = makeStyles({
  root: {
    backgroundColor: BACKGROUND_DARK,
    height: '100vh',
    color: 'white',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appInfoContainer: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loader: {
    marginTop: 15,
    color: 'white',
  },
});

interface AppInfo {
  name: string;
  version: string;
  channel: string;
  channels: [];
}

interface UpdateError {
  code: string;
  description?: string;
}

interface UpdateParams {
  currentAppVersion: string;
  autoDownload: boolean;
  updateInfo: any;
}

const AppUpdater = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [versionToDownload, setVersionToDownload] = useState(null);
  const [info, setAppInfo] = useState<AppInfo | null>(null);
  const [status, setUpdateStatus] = useState(t('update_status.checking'));
  const [updateError, setUpdateError] = useState<UpdateError | null>(null);
  const [redirectToApp, setRedirectToApp] = useState(false);

  const classes = useStyle();

  const handleAppInfo = (event: any, appInfo: AppInfo) => {
    setAppInfo(appInfo);
    ipcRenderer.send(CHECK_FOR_UPDATE_PENDING, { channel: appInfo.channel, autoDownload: true });
  };

  const downloadUpdateAndInstall = () => {
    setUpdateStatus('update_status.downloading_and_install');
    ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);
  };

  const handleCheckUpdateSuccess = (event: any, params: UpdateParams) => {
    const { autoDownload, currentAppVersion, updateInfo } = params;
    const version = updateInfo && updateInfo.version;

    //TODO если мажорная не изменилась то downloadUpdateAndInstallAfterQuit
    if (version && version !== currentAppVersion) {
      setVersionToDownload(version);
      setUpdateStatus('update_status.found_version');

      if (autoDownload) {
        setUpdateStatus('update_status.downloading_and_install');
        ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);
      }
    } else {
      setUpdateStatus('update_status.current_version_is_latest');
      setLoading(false);
      setRedirectToApp(true);
    }
  };

  const handleCheckUpdateFailure = (event: any, error: any) => {
    setLoading(false);
    setUpdateStatus('update_status.checking_failure');
    setUpdateError({ code: error.code, description: error.description });
  };

  const handleDownloadUpdateSuccess = () => {
    //TODO check autoinsall or install after quit
    setUpdateStatus('update_status.download_success');
    setUpdateStatus(DOWNLOAD_UPDATE_SUCCESS);
    ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
  };

  const handleDownloadUpdateFailure = (event: any, error: any) => {
    setUpdateStatus('update_status.download_failure');
    setUpdateError({ code: error.code, description: error.description });
    setLoading(false);
  };

  useEffect(() => {
    ipcRenderer.send(APP_INFO);
    ipcRenderer.on(APP_INFO, handleAppInfo);
    ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, handleCheckUpdateSuccess);
    ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, handleCheckUpdateFailure);
    ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, handleDownloadUpdateSuccess);
    ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, handleDownloadUpdateFailure);
  }, []);

  const appUpdaterContext = {
    info,
    versionToDownload,
    status,
    loading,
    updateError,
    downloadUpdateAndInstall,
    changeChannel: (channel: string) => {
      setLoading(true);
      ipcRenderer.send(CHECK_FOR_UPDATE_PENDING, { channel, autoDownload: false });
    },
  };

  if (redirectToApp) {
    return (
      <LauncherContext.Provider value={appUpdaterContext}>
        <App />
      </LauncherContext.Provider>
    );
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <Typography variant="h6">{status}</Typography>
      {updateError && (
        <Box textAlign="center">
          <Typography variant="subtitle1">Error</Typography>
          <Typography>code: {updateError.code}</Typography>
          <Typography>description: {updateError.description}</Typography>
        </Box>
      )}
      {info && (
        <div className={classes.appInfoContainer}>
          <div>name: {info.name}</div>
          <div>version: {info.version}</div>
          <div>channel: {info.channel}</div>
        </div>
      )}
      {loading && <CircularProgress className={classes.loader} />}
    </div>
  );
};

export default AppUpdater;
