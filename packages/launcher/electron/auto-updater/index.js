const { ipcMain, app } = require('electron');
const fs = require('fs');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const isDev = require('electron-is-dev');

const getError = require('../getError');

const {
  CHECK_FOR_UPDATE_FAILURE,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_PENDING,
  QUIT_AND_INSTALL_UPDATE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_SUCCESS,
  DOWNLOAD_PROGRESS,
} = require('../../src/ipc.constants');

const currentAppVersion = app.getVersion();

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

ipcMain.on(CHECK_FOR_UPDATE_PENDING, (event, checkParams) => {
  const { sender } = event;
  autoUpdater.channel = checkParams.channel;
  log.info(CHECK_FOR_UPDATE_PENDING, { checkParams });

  if (isDev) {
    const updateInfo = { version: currentAppVersion };
    sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo, checkParams, currentAppVersion);
  } else {
    autoUpdater.checkForUpdates()
      .then(checkResult => {
        const { updateInfo } = checkResult;
        log.info(CHECK_FOR_UPDATE_SUCCESS, { updateInfo, checkParams, currentAppVersion });
        sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo, checkParams, currentAppVersion);
      })
      .catch(error => {
        log.error(CHECK_FOR_UPDATE_FAILURE, error);
        sender.send(CHECK_FOR_UPDATE_FAILURE, getError(error), checkParams);
      });
  }
});

ipcMain.on(DOWNLOAD_UPDATE_PENDING, (event, autoInstall) => {
  const { sender } = event;
  const downloadPendingFilePath = path.join(app.getPath('exe'), '..', 'download_pending');
  log.info(DOWNLOAD_UPDATE_PENDING, { autoInstall });

  fs.writeFile(downloadPendingFilePath, '', error => {
    if (error) {
      log.info(DOWNLOAD_UPDATE_FAILURE, error);
      sender.send(DOWNLOAD_UPDATE_FAILURE, getError(error));
    } else {
      autoUpdater.downloadUpdate()
        .then(() => {
          log.info(DOWNLOAD_UPDATE_SUCCESS, { autoInstall });
          sender.send(DOWNLOAD_UPDATE_SUCCESS, autoInstall);
        })
        .catch(error => {
          log.error(DOWNLOAD_UPDATE_FAILURE, error);
          sender.send(DOWNLOAD_UPDATE_FAILURE, getError(error));
        });

      fs.unlink(downloadPendingFilePath, error => {
        log.error(error);
      });
    }
  });
});

ipcMain.once(DOWNLOAD_PROGRESS, event => {
  autoUpdater.signals.progress(info => {
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
