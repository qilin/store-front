const electron = require('electron')
const { ipcMain, dialog } = electron;
const { autoUpdater } = require("electron-updater")
const {
  CHECK_FOR_UPDATE_FAILURE,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_PENDING,
  QUIT_AND_INSTALL_UPDATE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_SUCCESS,
  GET_UPDATE_CHANNEL,
  SET_UPDATE_CHANNEL
} = require("../ipc.constants");
const log = require("electron-log");
const currentAppVersion = require("../../package.json").version;
const currentAppUpdateChannel = currentAppVersion && currentAppVersion.split('-')[1] || 'latest';

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.channel = autoUpdater.channel || currentAppUpdateChannel;

ipcMain.on(GET_UPDATE_CHANNEL, (event) => {
  const { sender } = event;

  sender.send(GET_UPDATE_CHANNEL, {
    channel: autoUpdater.channel
  })
})

ipcMain.on(SET_UPDATE_CHANNEL, (event, channel) => {
  autoUpdater.channel = channel;
})

ipcMain.on(CHECK_FOR_UPDATE_PENDING, (event) => {
  const { sender } = event;
  const result = autoUpdater.checkForUpdates();

  result
    .then((checkResult) => {
      const { updateInfo } = checkResult;
      sender.send(CHECK_FOR_UPDATE_SUCCESS, updateInfo);
    })
    .catch((error) => {
      sender.send(CHECK_FOR_UPDATE_FAILURE, error);
    });
})

ipcMain.on(DOWNLOAD_UPDATE_PENDING, event => {
  const result = autoUpdater.downloadUpdate();
  const { sender } = event;

  result
    .then(() => {
      sender.send(DOWNLOAD_UPDATE_SUCCESS);
    })
    .catch((error) => {
      sender.send(DOWNLOAD_UPDATE_FAILURE, error);
    });
});

ipcMain.on(QUIT_AND_INSTALL_UPDATE, () => {
  autoUpdater.quitAndInstall(
    true, // isSilent
    true // isForceRunAfter, restart app after update is installed
  );
});
