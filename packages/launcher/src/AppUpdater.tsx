import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import App from '@qilin/shared/src/App';
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
    color: '#fff',
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
    color: '#fff',
  },
});

const AppUpdater = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [readyToDownload, setReadyToDownload] = useState(false);
  const [info, setAppInfo] = useState<{ name: string; version: string; channel: string; channels: [] } | null>(null);
  const [status, setUpdateStatus] = useState(t('update_status.checking'));
  const [updateError, setUpdateError] = useState<{ code: string; description: string } | null>(null);
  const [redirectToApp, setRedirectToApp] = useState(false);

  const classes = useStyle();

  const downloadUpdateAndInstall = () => {
    setUpdateStatus(t('update_status.downloading_and_install'));
    ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);
  };

  useEffect(() => {
    ipcRenderer.send(APP_INFO);

    ipcRenderer.on(APP_INFO, (event: any, appInfo) => {
      console.log('App Info', appInfo);
      setAppInfo(appInfo);
      ipcRenderer.send(CHECK_FOR_UPDATE_PENDING, { channel: appInfo.channel, autoDownload: true });
    });

    //TODO если мажорная не изменилась то downloadUpdateAndInstallAfterQuit
    ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event: any, params = {}) => {
      const { autoDownload, currentAppVersion, updateInfo } = params;
      const version = updateInfo && updateInfo.version;

      if (version && version !== currentAppVersion) {
        setReadyToDownload(true);
        setUpdateStatus(t('update_status.found_version', { version }));

        if (autoDownload) {
          downloadUpdateAndInstall();
        }
      } else {
        setUpdateStatus(t('update_status.current_version_is_latest', { version }));
        setLoading(false);
        setRedirectToApp(true);
      }
    });

    ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, (event: any, error: any) => {
      setLoading(false);
      setUpdateStatus(t('update_status.checking_failure'));
      setUpdateError({ code: error.code, description: error.description });
    });

    ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, () => {
      //TODO check autoinsall or install after quit
      setUpdateStatus(t('update_status.download_success'));
      setUpdateStatus(DOWNLOAD_UPDATE_SUCCESS);
      ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
    });

    ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, (event: any, error: any) => {
      setUpdateStatus(t('update_status.download_failure'));
      setUpdateError({ code: error.code, description: error.description });
      setLoading(false);
    });
  }, []);

  const appUpdaterContext = {
    info,
    readyToDownload,
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
      <App launcherContextValue={appUpdaterContext} />
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
