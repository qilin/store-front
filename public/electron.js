const electron = require('electron');
const app = electron.app;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      // webSecurity: false,
      // devTools: isDev
    }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}

<<<<<<< HEAD
app.on('ready', () => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    //console.log(details);
    //details.requestHeaders['User-Agent'] = 'MyAgent';
    details.requestHeaders['Origin'] = 'http://localhost:3000';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  createWindow()
});
=======
app.on('ready', createWindow);
>>>>>>> add electron

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
