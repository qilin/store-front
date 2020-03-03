import { ipcRenderer } from 'electron';

import * as IPCConstants from './constants/ipc';

(window as any).interop = {
  skipAuth: () => {
    ipcRenderer.send(IPCConstants.AUTH_SKIP);
  },
  ipcRenderer,
  IPCConstants,
};
