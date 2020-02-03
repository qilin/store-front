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
} = require('../../src/ipc.constants');

const currentAppVersion = app.getVersion();

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;

ipcMain.on(CHECK_FOR_UPDATE_PENDING, (event, { channel, autoDownload }) => {
  log.info(CHECK_FOR_UPDATE_PENDING, { channel, currentAppVersion });
  const { sender } = event;
  autoUpdater.channel = channel;

  if (isDev) {
    sender.send(CHECK_FOR_UPDATE_SUCCESS);
  } else {
    const result = autoUpdater.checkForUpdates();

    result
      .then(checkResult => {
        const { updateInfo } = checkResult;
        log.info(CHECK_FOR_UPDATE_SUCCESS, { channel, checkResult });
        sender.send(CHECK_FOR_UPDATE_SUCCESS, { updateInfo, currentAppVersion, autoDownload });
      })
      .catch(error => {
        log.info(CHECK_FOR_UPDATE_FAILURE, { error });
        sender.send(CHECK_FOR_UPDATE_FAILURE, error);
      });
  }
});

ipcMain.on(DOWNLOAD_UPDATE_PENDING, event => {
  const result = autoUpdater.downloadUpdate();
  const { sender } = event;
  log.info(DOWNLOAD_UPDATE_PENDING);

  result
    .then(() => {
      log.info(DOWNLOAD_UPDATE_SUCCESS);
      sender.send(DOWNLOAD_UPDATE_SUCCESS);
    })
    .catch(error => {
      log.info(DOWNLOAD_UPDATE_FAILURE, { error });
      sender.send(DOWNLOAD_UPDATE_FAILURE, error);
    });
});

ipcMain.on(QUIT_AND_INSTALL_UPDATE, () => {
  log.info(QUIT_AND_INSTALL_UPDATE);
  autoUpdater.quitAndInstall(
    true, // isSilent
    true, // isForceRunAfter, restart app after update is installed
  );
});
