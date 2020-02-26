import { ipcMain, app } from 'electron';
import fs from 'fs';
import path from 'path';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import isDev from 'electron-is-dev';

import getUpdateError from './getUpdateError';

import {
  CHECK_FOR_UPDATE_FAILURE,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_PENDING,
  QUIT_AND_INSTALL_UPDATE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_SUCCESS,
  DOWNLOAD_PROGRESS,
} from '../constants/ipc';

const currentAppVersion = app.getVersion();

log.transports.file.level = 'info';
autoUpdater.logger = log;
autoUpdater.autoDownload = false;

ipcMain.on(CHECK_FOR_UPDATE_PENDING, (event: any, checkParams: any) => {
  const { sender } = event;
  autoUpdater.channel = checkParams.channel;
  log.info(CHECK_FOR_UPDATE_PENDING, { checkParams });

  if (isDev) {
    const updateInfo = { version: currentAppVersion };
    sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo, checkParams, currentAppVersion);
  } else {
    autoUpdater.checkForUpdates()
      .then((checkResult: any) => {
        const { updateInfo } = checkResult;
        log.info(CHECK_FOR_UPDATE_SUCCESS, { updateInfo, checkParams, currentAppVersion });
        sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo, checkParams, currentAppVersion);
      })
      .catch((error: any) => {
        log.error(CHECK_FOR_UPDATE_FAILURE, error);
        sender.send(CHECK_FOR_UPDATE_FAILURE, getUpdateError(error), checkParams);
      });
  }
});

ipcMain.on(DOWNLOAD_UPDATE_PENDING, (event: any, autoInstall: any) => {
  const { sender } = event;
  const downloadPendingFilePath = path.join(app.getPath('exe'), '..', 'download_pending');
  log.info(DOWNLOAD_UPDATE_PENDING, { autoInstall });

  fs.writeFile(downloadPendingFilePath, '', (error: any) => {
    if (error) {
      log.info(DOWNLOAD_UPDATE_FAILURE, error);
      sender.send(DOWNLOAD_UPDATE_FAILURE, getUpdateError(error));
    } else {
      autoUpdater.downloadUpdate()
        .then(() => {
          log.info(DOWNLOAD_UPDATE_SUCCESS, { autoInstall });
          sender.send(DOWNLOAD_UPDATE_SUCCESS, autoInstall);
        })
        .catch((error: any) => {
          log.error(DOWNLOAD_UPDATE_FAILURE, error);
          sender.send(DOWNLOAD_UPDATE_FAILURE, getUpdateError(error));
        });

      fs.unlink(downloadPendingFilePath, (error: any) => {
        log.error(error);
      });
    }
  });
});

ipcMain.once(DOWNLOAD_PROGRESS, (event: any) => {
  autoUpdater.signals.progress((info: any) => {
    log.info(DOWNLOAD_PROGRESS, { info });
    event.sender.send(DOWNLOAD_PROGRESS, info);
  });
});

ipcMain.on(QUIT_AND_INSTALL_UPDATE, () => {
  log.info(QUIT_AND_INSTALL_UPDATE);
  autoUpdater.quitAndInstall(
    true, // isSilent
    true, // isForceRunAfter, restart app after update is installed
  );
});
