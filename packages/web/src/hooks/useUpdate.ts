import { useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import { qu } from 'helpers';
import { ProgressInfo, UpdateError, CheckUpdateParams, UpdateInfo } from 'types';

export default (IPCConstants: any, ipcRenderer: any) => {
  const [checking, setChecking] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<ProgressInfo | null>(null);
  const [versionToDownload, setVersionToDownload] = useState<string | null>(null);
  const [status, setUpdateStatus] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<UpdateError | null>(null);
  const [updateChecked, setUpdateChecked] = useState(false);

  const checkUpdate = (params: CheckUpdateParams) => {
    qu('myevent', { key: IPCConstants.CHECK_FOR_UPDATE_PENDING, data: { params } });
    setChecking(true);
    setDownloading(false);
    setDownloadProgress(null);
    setVersionToDownload(null);
    setUpdateError(null);
    setUpdateStatus(IPCConstants.CHECK_FOR_UPDATE_PENDING);
    ipcRenderer.send(IPCConstants.CHECK_FOR_UPDATE_PENDING, params);
  };

  const downloadUpdate = (autoInstall: boolean) => {
    qu('myevent', { key: IPCConstants.DOWNLOAD_UPDATE_PENDING, data: { autoInstall } });
    ipcRenderer.send(IPCConstants.DOWNLOAD_UPDATE_PENDING, autoInstall);
    setDownloading(true);
    setUpdateStatus(IPCConstants.DOWNLOAD_UPDATE_PENDING);
  };

  const downloadUpdateAndInstall = () => {
    downloadUpdate(true);
  };

  const handleCheckUpdateSuccess = (
    _event: IpcRendererEvent,
    updateInfo: UpdateInfo,
    checkUpdateParams: CheckUpdateParams,
    currentAppVersion: string,
  ) => {
    const version = updateInfo && updateInfo.version;
    setChecking(false);
    setVersionToDownload(version);

    if (version && currentAppVersion && version !== currentAppVersion) {
      qu('myevent', {
        key: IPCConstants.UPDATE_AVAILABLE,
        data: { updateInfo, checkUpdateParams, currentAppVersion },
      });
      setUpdateStatus(IPCConstants.UPDATE_AVAILABLE);

      if (checkUpdateParams.autoDownload) {
        downloadUpdateAndInstall();
      }
    } else {
      qu('myevent', {
        key: IPCConstants.UPDATE_NOT_AVAILABLE,
        data: { updateInfo, checkUpdateParams, currentAppVersion },
      });
      setUpdateChecked(true);
      setUpdateStatus(IPCConstants.UPDATE_NOT_AVAILABLE);
    }
  };

  const handleCheckUpdateFailure = (_event: IpcRendererEvent, error: UpdateError) => {
    qu('myevent', { key: IPCConstants.CHECK_FOR_UPDATE_FAILURE, data: { error } });
    setChecking(false);
    setUpdateStatus(IPCConstants.CHECK_FOR_UPDATE_FAILURE);
    setUpdateError(error);
  };

  const handleDownloadUpdateSuccess = (_event: IpcRendererEvent, autoInstall = true) => {
    qu('myevent', { key: IPCConstants.DOWNLOAD_UPDATE_SUCCESS, data: { autoInstall } });
    setUpdateStatus(IPCConstants.DOWNLOAD_UPDATE_SUCCESS);
    setDownloading(false);
    if (autoInstall) {
      ipcRenderer.send(IPCConstants.QUIT_AND_INSTALL_UPDATE);
    }
  };

  const handleDownloadUpdateFailure = (_event: IpcRendererEvent, error: UpdateError) => {
    qu('myevent', { key: IPCConstants.DOWNLOAD_UPDATE_FAILURE, data: { error } });
    setUpdateStatus(IPCConstants.DOWNLOAD_UPDATE_FAILURE);
    setUpdateError(error);
    setChecking(false);
    setDownloading(false);
  };

  const handleDownloadProgress = (_event: IpcRendererEvent, progressInfo: ProgressInfo) => {
    qu('myevent', { key: IPCConstants.DOWNLOAD_PROGRESS, data: { progressInfo } });
    setDownloadProgress(progressInfo);
  };

  const changeChannel = (channel: string) => {
    qu('myevent', { key: 'CHECK_CHANNEL_UPDATE', data: { channel } });
    checkUpdate({ channel, autoDownload: false });
  };

  useEffect(() => {
    ipcRenderer.on(IPCConstants.CHECK_FOR_UPDATE_SUCCESS, handleCheckUpdateSuccess);
    ipcRenderer.on(IPCConstants.CHECK_FOR_UPDATE_FAILURE, handleCheckUpdateFailure);
    ipcRenderer.on(IPCConstants.DOWNLOAD_UPDATE_SUCCESS, handleDownloadUpdateSuccess);
    ipcRenderer.on(IPCConstants.DOWNLOAD_UPDATE_FAILURE, handleDownloadUpdateFailure);
    ipcRenderer.on(IPCConstants.DOWNLOAD_PROGRESS, handleDownloadProgress);
    // eslint-disable-next-line
  }, []);

  return {
    checkUpdate,
    downloading,
    downloadProgress,
    versionToDownload,
    updateChecked,
    status,
    checking,
    updateError,
    downloadUpdateAndInstall,
    updateAvailable: status === IPCConstants.UPDATE_AVAILABLE,
    changeChannel,
  };
};
