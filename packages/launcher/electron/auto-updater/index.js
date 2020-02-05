const { ipcMain, app } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const isDev = require('electron-is-dev');

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

  if (isDev) {
    const updateInfo = { version: currentAppVersion };
    sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo, checkParams, currentAppVersion);
  } else {
    const result = autoUpdater.checkForUpdates();

    result
      .then(checkResult => {
        const { updateInfo } = checkResult;
        sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo, checkParams, currentAppVersion);
      })
      .catch(error => {
        sender.send(CHECK_FOR_UPDATE_FAILURE, error);
      });
  }
});

ipcMain.on(DOWNLOAD_UPDATE_PENDING, (event, autoInstall) => {
  const result = autoUpdater.downloadUpdate();
  const { sender } = event;

  result
    .then(() => {
      sender.send(DOWNLOAD_UPDATE_SUCCESS, autoInstall);
    })
    .catch(error => {
      sender.send(DOWNLOAD_UPDATE_FAILURE, error);
    });
});

ipcMain.once(DOWNLOAD_PROGRESS, event => {
  autoUpdater.signals.progress(info => {
    event.sender.send(DOWNLOAD_PROGRESS, info);
  });
});

ipcMain.on(QUIT_AND_INSTALL_UPDATE, () => {
  autoUpdater.quitAndInstall(
    true, // isSilent
    true, // isForceRunAfter, restart app after update is installed
  );
});
