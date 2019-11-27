type Callback = (args?: any) => void;

console.log('from module', (window as any).ramblerIdHelper);

const ramblerIdHelper = (window as any).ramblerIdHelper || {
  getProfileInfo: () => { },
  getSessionToken: () => { },
  addListener: () => { },
};

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

const getUser = (onGetUserCallback: Callback) => {
  ramblerIdHelper.getProfileInfo((data: any) => {
    onGetUserCallback(data);
  });
};

export const openAuth = ramblerIdHelper.openAuth;

export const init = (onGetUser: Callback) => {
  // onLogin(() => {
  //   getUser(onGetUser);
  // });
  getUser(onGetUser);
};
