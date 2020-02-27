import { ipcRenderer } from 'electron';

import * as IPCConstants from './constants/ipc';

(window as any).interop = {
  skipAuth: () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}?skip_auth=1`;
  },
  ipcRenderer: ipcRenderer,
  IPCConstants,
};
