import { Callback } from 'types';

import './ramblerIdHelper';

const ramblerIdHelper = (window as any).ramblerIdHelper;

const onLogin = (onLoginCallback: Callback) => {
  ramblerIdHelper.addListener('login', onLoginCallback);
  ramblerIdHelper.addListener('oauthlogin', onLoginCallback);
};

const getToken = (onGetTokenCallback: Callback) => {
  ramblerIdHelper.getSessionToken((data: any) => {
    let token = null;

    if (data && data.token) {
      token = data.token;
    }

    onGetTokenCallback(token);
  });
};

const getUser = (onGetUserCallback: Callback) => ramblerIdHelper.getProfileInfo(onGetUserCallback);

const openAuth = () => ramblerIdHelper.openAuth();

const logout = () => ramblerIdHelper.logout();

const init = (onInit: Callback) => {
  onLogin(() => {
    getUser(onInit);
  });

  getUser(onInit);
};

export default {
  init,
  logout,
  openAuth,
  getToken,
};
