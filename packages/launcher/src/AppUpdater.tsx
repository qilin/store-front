import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, CircularProgress, LinearProgress } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import App, { LauncherContext } from '@qilin/shared/src/App';
import { BACKGROUND_DARK } from '@qilin/shared/src/styles/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTranslation } from 'react-i18next';

import {
  CHECK_FOR_UPDATE_PENDING,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_FAILURE,
  UPDATE_AVAILABLE,
  UPDATE_NOT_AVAILABLE,
  DOWNLOAD_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_SUCCESS,
  DOWNLOAD_PROGRESS,
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
  progressWrapper: {
    width: 500,
    margin: '10px 0',
  },
});

interface AppInfo {
  name: string;
  version: string;
  channel: string;
  channels: string[];
}

interface UpdateInfo {
  version: string;
  files: { url: string }[];
  releaseName: string;
  releaseNotes: string;
  releaseDate: string;
  stagingPercentage: number;
}

interface UpdateError {
  code: string;
  description?: string;
}

interface CheckUpdateParams {
  channel: string;
  autoDownload: boolean;
}

interface ProgressInfo {
  bytesPerSecond: any;
  percent: any;
  total: any;
  transferred: any;
}

const AppUpdater = () => {
  const { t } = useTranslation();
  const [checking, setChecking] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<ProgressInfo | null>();
  const [versionToDownload, setVersionToDownload] = useState();
  const [info, setAppInfo] = useState<AppInfo>();
  const [status, setUpdateStatus] = useState();
  const [updateError, setUpdateError] = useState<UpdateError | null>();
  const [redirectToApp, setRedirectToApp] = useState(false);

  const classes = useStyle();

  const checkUpdate = (params: CheckUpdateParams) => {
    setChecking(true);
    setDownloading(false);
    setDownloadProgress(null);
    setVersionToDownload(null);
    setUpdateError(null);
    setUpdateStatus(CHECK_FOR_UPDATE_PENDING);
    ipcRenderer.send(CHECK_FOR_UPDATE_PENDING, params);
  };

  const downloadUpdate = (autoInstall: boolean) => {
    ipcRenderer.send(DOWNLOAD_UPDATE_PENDING, autoInstall);
    setDownloading(true);
    setUpdateStatus(DOWNLOAD_UPDATE_PENDING);
  };

  const downloadUpdateAndInstall = () => {
    downloadUpdate(true);
  };

  const handleAppInfo = (event: any, appInfo: AppInfo) => {
    setAppInfo(appInfo);
    checkUpdate({ channel: appInfo.channel, autoDownload: true });
  };

  const handleCheckUpdateSuccess = (
    event: any,
    updateInfo: UpdateInfo,
    checkUpdateParams: CheckUpdateParams,
    currentAppVersion: string,
  ) => {
    const version = updateInfo && updateInfo.version;

    setChecking(false);
    setVersionToDownload(version);

    if (version && currentAppVersion && version !== currentAppVersion) {
      setUpdateStatus(UPDATE_AVAILABLE);

      if (checkUpdateParams.autoDownload) {
        //TODO если мажорная не изменилась то downloadUpdateAndInstallAfterQuit
        downloadUpdateAndInstall();
      }
    } else {
      setUpdateStatus(UPDATE_NOT_AVAILABLE);
      setRedirectToApp(true);
    }
  };

  const handleCheckUpdateFailure = (event: any, error: any) => {
    setChecking(false);
    setUpdateStatus(CHECK_FOR_UPDATE_FAILURE);
    setUpdateError({ code: error.code, description: error.description });
  };

  const handleDownloadUpdateSuccess = (event: any, autoInstall = true) => {
    setUpdateStatus(DOWNLOAD_UPDATE_SUCCESS);
    setDownloading(false);
    if (autoInstall) {
      ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
    }
  };

  const handleDownloadUpdateFailure = (event: any, error: any) => {
    setUpdateStatus(DOWNLOAD_UPDATE_FAILURE);
    setUpdateError({ code: error.code, description: error.description });
    setChecking(false);
    setDownloading(false);
  };

  const handleDownloadProgress = (event: any, progressInfo: ProgressInfo) => {
    setDownloadProgress(progressInfo);
  };

  useEffect(() => {
    ipcRenderer.send(APP_INFO);
    ipcRenderer.send(DOWNLOAD_PROGRESS);
    ipcRenderer.on(APP_INFO, handleAppInfo);
    ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, handleCheckUpdateSuccess);
    ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, handleCheckUpdateFailure);
    ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, handleDownloadUpdateSuccess);
    ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, handleDownloadUpdateFailure);
    ipcRenderer.on(DOWNLOAD_PROGRESS, handleDownloadProgress);
    // eslint-disable-next-line
  }, []);

  const appUpdaterContext = {
    info,
    versionToDownload,
    status,
    checking,
    updateError,
    downloadUpdateAndInstall,
    updateAvailable: status === UPDATE_AVAILABLE,
    changeChannel: (channel: string) => {
      checkUpdate({ channel, autoDownload: false });
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
      {!checking && (
        <Typography variant="h6">
          {t(`update_status.${status}`, { currentVersion: info && info.version, versionToDownload })}
        </Typography>
      )}
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
      {checking && <CircularProgress className={classes.loader} />}
      {downloading &&
        <div className={classes.progressWrapper}>
          <LinearProgress variant="determinate" value={(downloadProgress && downloadProgress.percent) || 0} />
        </div>}
      {downloading && <div>Speed: {downloadProgress && downloadProgress.bytesPerSecond} bytesPerSecond</div>}
    </div>
  );
};

export default AppUpdater;
