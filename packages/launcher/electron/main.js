const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

require('./auto-updater');
const { APP_INFO } = require('../src/ipc.constants');

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 680;
const WINDOW_TITLE = 'Qilin Launcher';
const BACKGROUND_DARK = '#262626';
const appVersion = app.getVersion();
const appChannel = appVersion.split('-')[1] || 'latest';

let mainWindow;

function createWindow() {
  const startUrl = isDev ? 'http://localhost:3000' : url.format({
    pathname: path.join(__dirname, '..', 'index.html'),
    protocol: 'file:',
    slashes: true,
  });

  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    title: WINDOW_TITLE,
    backgroundColor: BACKGROUND_DARK,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false,
      // devTools: isDev
    },
  });

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(APP_INFO, event => {
  event.sender.send(APP_INFO, {
    name: app.name,
    version: appVersion,
    channel: appChannel,
    channels: ['latest', 'beta', 'alpha'],
  });
});
