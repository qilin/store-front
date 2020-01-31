import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, CircularProgress } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import App from '@qilin/shared/src/App';
import { BACKGROUND_DARK } from '@qilin/shared/src/styles/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  const [loading, setLoading] = useState(true);
  const [info, setAppInfo] = useState<{ name: string; version: string; channel: string } | null>(null);
  const [status, setUpdateStatus] = useState('');
  const [updateError, setUpdateError] = useState<{ code: string; description: string } | null>(null);
  const [redirectToApp, setRedirectToApp] = useState(false);

  const classes = useStyle();

  useEffect(() => {
    ipcRenderer.send(APP_INFO);
    ipcRenderer.send(CHECK_FOR_UPDATE_PENDING);

    ipcRenderer.on(APP_INFO, (event: any, appInfo) => {
      console.log('App Info', appInfo);
      setAppInfo(appInfo);
    });

    ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event: any, updateInfo: any, currentAppVersion: any) => {
      const version = updateInfo && updateInfo.version;

      if (version && version !== currentAppVersion) {
        ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);
        setUpdateStatus(`Found new version ${version}, downloading the update...`);
        // Update your updateCheckLevel to DOWNLOAD in your state.
      } else {
        setLoading(false);
        setRedirectToApp(true);
      }

    });

    ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, (event: any, error: any) => {
      setLoading(false);
      setUpdateStatus('Checking for update failure');
      setUpdateError({ code: error.code, description: error.description || 'no description' });
    });

    ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, () => {
      setUpdateStatus('Installing updates, application will be restart');
      setTimeout(() => {
        ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
      }, 1500);
    });

    ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, (event: any, error: any) => {
      setUpdateStatus('Download update failure');
      setUpdateError({ code: error.code, description: error.description || 'no description' });
      setLoading(false);
    });

  }, []);

  if (redirectToApp) {
    return <App />;
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
