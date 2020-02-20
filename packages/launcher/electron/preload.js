const { ipcRenderer } = require('electron');

window.interop = {
  ipcRenderer: ipcRenderer,
};
