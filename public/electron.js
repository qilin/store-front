const { app, session, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const autoUpdater = require('./auto-updater')
const { GET_APP_VERSION } = require('./ipc.constants');

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 680;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    webPreferences: {
      // webSecurity: false,
      // devTools: isDev
    }
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', 'build', 'index.html')}`);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
  createWindow()
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

ipcMain.on(GET_APP_VERSION, (event) => {
  event.sender.send(GET_APP_VERSION, { version: app.getVersion() })
})
