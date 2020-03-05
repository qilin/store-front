import { ipcRenderer } from 'electron';

import * as IPCConstants from './constants/ipc';

(window as any).interop = {
  ipcRenderer,
  IPCConstants,
};
