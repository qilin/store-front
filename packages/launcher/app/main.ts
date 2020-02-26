import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
import log from 'electron-log';

import './auto-updater';
import { APP_INFO, APP_READY, APP_QUIT } from './constants/ipc';

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 680;
const WINDOW_TITLE = 'Qilin Launcher';
const BACKGROUND_DARK = '#262626';
const appVersion = app.getVersion();
const appChannel = appVersion.split('-')[1] || 'latest';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    title: WINDOW_TITLE,
    backgroundColor: BACKGROUND_DARK,
    webPreferences: {
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(process.env.REACT_APP_BASE_URL || '');

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  log.info(APP_READY);
  createWindow();
});

app.on('window-all-closed', () => {
  log.info(APP_QUIT);

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(APP_INFO, (event: any) => {
  event.sender.send(APP_INFO, {
    name: app.name,
    version: appVersion,
    channel: appChannel,
    channels: ['latest', 'beta', 'alpha'],
  });
});
