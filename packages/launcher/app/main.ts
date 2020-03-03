import { app, BrowserWindow, ipcMain, Cookie } from 'electron';
import path from 'path';
import log from 'electron-log';

import './auto-updater';
import { APP_INFO, AUTH_SKIP } from './constants/ipc';

const isDev = process.env.NODE_ENV === 'development';
const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 680;
const WINDOW_TITLE = 'Qilin Launcher';
const BACKGROUND_DARK = '#262626';
const appVersion = app.getVersion();
const appChannel = appVersion.split('-')[1] || 'latest';
const pathToAppHtml = path.join(__dirname, '..', 'app.html');
const APP_URL = `file://${pathToAppHtml}`;
const callbackUrl = 'file:///callback';

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

  const { session } = mainWindow.webContents;
  const filter = { urls: [`${process.env.REACT_APP_API_URL}*`] };

  session.cookies.on('changed', (_event: Event, cookie: Cookie) => {
    if (cookie.name === 'ssid') {
      session.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['Cookie'] = `ssid=${cookie.value}`;

        callback({ requestHeaders: details.requestHeaders });
      });
    }
  });

  mainWindow.webContents.on('will-redirect', (_event, url) => {
    if (url === callbackUrl) {
      mainWindow && mainWindow.loadURL(APP_URL);
    }
  });

  mainWindow.loadURL(APP_URL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  log.info('App Ready', APP_URL);
  createWindow();
});

app.on('window-all-closed', () => {
  log.info('App Quit');

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(AUTH_SKIP, () => {
  mainWindow && mainWindow.loadURL(`${APP_URL}?skip_auth=true`);
});

ipcMain.on(APP_INFO, (event: any) => {
  event.sender.send(APP_INFO, {
    name: app.name,
    version: appVersion,
    channel: appChannel,
    channels: ['latest', 'beta', 'alpha'],
  });
});
