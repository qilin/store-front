const { ipcRenderer } = require('electron');

window.interop = {
  skipAuth: () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}?skip_auth=1`;
  },
  ipcRenderer: ipcRenderer,
};
