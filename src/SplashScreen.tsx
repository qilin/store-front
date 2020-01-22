import React from 'react';
import {
  CHECK_FOR_UPDATE_PENDING,
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_SUCCESS,
  QUIT_AND_INSTALL_UPDATE,
  APP_INFO,
} from './ipc.constants';

const { ipcRenderer } = window as any;

ipcRenderer.send(APP_INFO);
ipcRenderer.send(CHECK_FOR_UPDATE_PENDING);

if (!ipcRenderer) {
  console.log('init renderer in web');
} else {
  console.log('load renderer in electron with ');
}

ipcRenderer.on(APP_INFO, (event: any, { version, name }: any) => {
  console.log(`App Version: ${version}`);
  console.log(`App Name: ${name}`);
});

ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event: any, updateInfo: any, currentAppVersion: any) => {
  const version = updateInfo && updateInfo.version;

  // Imitate slow internet
  setTimeout(() => {
    if (version && version !== currentAppVersion) {
      console.log('version', version);
      console.log('currentAppVersion', currentAppVersion);
      console.log('Found new version ${version}</p><p>Downloading the update.');
      ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);
      // Update your updateCheckLevel to DOWNLOAD in your state.
    } else {
      console.log('hide loader');
      console.log('Show Auth Page');
    }
  }, 2000);

});

ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, (event: any, error: any) => {
  // Trigger failure in your state.
  setTimeout(() => {
    console.log('hide loader');
    console.log('Checking for update failure.');
    console.log('show error', error.code, error.description);
  }, 2000);
});

ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, () => {
  setTimeout(() => {
    console.log('Installing updates, application will be restart after 1 second.');
    setTimeout(() => {
      ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
    }, 1500);
  }, 2000);
});

ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, (event: any, error: any) => {
  setTimeout(() => {
    console.log('download update failure');
    console.log('hide loader');
    console.log('show error', error.code, error.description);
  }, 2000);
});

const SplashScreen = () => {
  return (
    <div>Checking update...</div>
  );
};

export default SplashScreen;
