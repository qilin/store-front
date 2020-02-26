import { useState, useEffect } from 'react';
import { qu } from 'helpers';
import { AppInfo, ProgressInfo, UpdateError, CheckUpdateParams, UpdateInfo } from 'types';

const { ipcRenderer = {}, IPCConstants = {} } = (window as any).interop || {};
const {
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
} = IPCConstants;

export default () => {
  const [checking, setChecking] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<ProgressInfo | null>();
  const [versionToDownload, setVersionToDownload] = useState();
  const [info, setAppInfo] = useState<AppInfo>();
  const [status, setUpdateStatus] = useState();
  const [updateError, setUpdateError] = useState<UpdateError | null>();
  const [redirectToApp, setRedirectToApp] = useState(false);

  const checkUpdate = (params: CheckUpdateParams) => {
    qu('myevent', { key: CHECK_FOR_UPDATE_PENDING, data: { params } });
    setChecking(true);
    setDownloading(false);
    setDownloadProgress(null);
    setVersionToDownload(null);
    setUpdateError(null);
    setUpdateStatus(CHECK_FOR_UPDATE_PENDING);
    ipcRenderer.send(CHECK_FOR_UPDATE_PENDING, params);
  };

  const downloadUpdate = (autoInstall: boolean) => {
    qu('myevent', { key: DOWNLOAD_UPDATE_PENDING, data: { autoInstall } });
    ipcRenderer.send(DOWNLOAD_UPDATE_PENDING, autoInstall);
    setDownloading(true);
    setUpdateStatus(DOWNLOAD_UPDATE_PENDING);
  };

  const downloadUpdateAndInstall = () => {
    downloadUpdate(true);
  };

  const handleAppInfo = (event: any, appInfo: AppInfo) => {
    qu('myevent', { key: APP_INFO, data: { appInfo } });
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
      qu('myevent', { key: UPDATE_AVAILABLE, data: { updateInfo, checkUpdateParams, currentAppVersion } });
      setUpdateStatus(UPDATE_AVAILABLE);

      if (checkUpdateParams.autoDownload) {
        downloadUpdateAndInstall();
      }
    } else {
      qu('myevent', { key: UPDATE_NOT_AVAILABLE, data: { updateInfo, checkUpdateParams, currentAppVersion } });
      setUpdateStatus(UPDATE_NOT_AVAILABLE);
      setRedirectToApp(true);
    }
  };

  const handleCheckUpdateFailure = (event: any, error: UpdateError) => {
    qu('myevent', { key: CHECK_FOR_UPDATE_FAILURE, data: { error } });
    setChecking(false);
    setUpdateStatus(CHECK_FOR_UPDATE_FAILURE);
    setUpdateError(error);
  };

  const handleDownloadUpdateSuccess = (event: any, autoInstall = true) => {
    qu('myevent', { key: DOWNLOAD_UPDATE_SUCCESS, data: { autoInstall } });
    setUpdateStatus(DOWNLOAD_UPDATE_SUCCESS);
    setDownloading(false);
    if (autoInstall) {
      ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
    }
  };

  const handleDownloadUpdateFailure = (event: any, error: UpdateError) => {
    qu('myevent', { key: DOWNLOAD_UPDATE_FAILURE, data: { error } });
    setUpdateStatus(DOWNLOAD_UPDATE_FAILURE);
    setUpdateError(error);
    setChecking(false);
    setDownloading(false);
  };

  const handleDownloadProgress = (event: any, progressInfo: ProgressInfo) => {
    qu('myevent', { key: DOWNLOAD_PROGRESS, data: { progressInfo } });
    setDownloadProgress(progressInfo);
  };

  const changeChannel = (channel: string) => {
    qu('myevent', { key: 'CHECK_CHANNEL_UPDATE', data: { channel } });
    checkUpdate({ channel, autoDownload: false });
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

  return {
    info,
    downloading,
    downloadProgress,
    versionToDownload,
    redirectToApp,
    status,
    checking,
    updateError,
    downloadUpdateAndInstall,
    updateAvailable: status === UPDATE_AVAILABLE,
    changeChannel,
  };
};
