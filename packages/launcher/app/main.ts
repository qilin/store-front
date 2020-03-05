import { app, BrowserWindow, ipcMain, Cookie } from 'electron';
import path from 'path';
import log from 'electron-log';

import './auto-updater';
import { AUTH_GUEST, APP_INIT } from './constants/ipc';

const isDev = process.env.NODE_ENV === 'development';
const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 680;
const WINDOW_TITLE = 'Qilin Launcher';
const BACKGROUND_DARK = '#262626';
const appVersion = app.getVersion();
const appChannel = appVersion.split('-')[1] || 'latest';
const authRedirectUrl = 'file:///auth_callback';
const pathToAppHtml = path.join(__dirname, '..', 'app.html');
const APP_URL = isDev ? `${process.env.REACT_APP_BASE_URL}` : `file://${pathToAppHtml}`;

const apiUrlFilter = {
  urls: [
    `${process.env.REACT_APP_API_URL}*`,
  ],
};

const authUrlFilter = {
  urls: [
    `${process.env.REACT_APP_API_URL}/v1/auth/callback*`,
    `${process.env.REACT_APP_API_URL}/v1/auth/logout*`,
  ],
};

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

  const { webContents } = mainWindow;
  const { session } = webContents;

  session.cookies.on('changed', (_event: Electron.Event, cookie: Cookie) => {
    if (cookie.name === 'ssid') {
      session.webRequest.onBeforeSendHeaders(apiUrlFilter, (details, callback) => {
        details.requestHeaders['Cookie'] = `ssid=${cookie.value}`;

        callback({ requestHeaders: details.requestHeaders });
      });
    }
  });

  session.webRequest.onBeforeRedirect(authUrlFilter, details => {
    const { redirectURL } = details;

    if (redirectURL !== authRedirectUrl) {
      log.error('Get unexpected redirect', {
        redirectURL,
        requestUrl: details.url,
      });
    }

    webContents.loadURL(`${APP_URL}?initial_update_checked=true`);
  });

  mainWindow.loadURL(APP_URL);

  webContents.on('did-finish-load', () => {
    webContents.send(APP_INIT, {
      name: app.name,
      version: appVersion,
      channel: appChannel,
      channels: ['latest', 'beta', 'alpha'],
    });
  });

  ipcMain.on(AUTH_GUEST, () => {
    mainWindow && mainWindow.loadURL(`${APP_URL}?initial_update_checked=true&auth_guest=true`);
  });

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
