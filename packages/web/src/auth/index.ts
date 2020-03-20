import { isLauncher } from 'helpers';

export const AUTH_PASSED = 'AUTH_PASSED';
const API_URL = process.env.REACT_APP_API_URL;

const baseLoginUrl = `${API_URL}/v1/auth/login`;
const baseLogoutUrl = `${API_URL}/v1/auth/logout`;
const launcherCallbackUrl = 'file:///auth_callback';

export const login = (prompt = true) => {
  const currentUrl = window.location.href;
  const redirectUrl = isLauncher ? launcherCallbackUrl : currentUrl;
  const loginUrl = `${baseLoginUrl}?redirect=${redirectUrl}${prompt ? '' : '&prompt=none'}`;
  // https://store.tst.qilin.super.com/api/v1/auth/login?redirect=http://localhost:3000/&prompt=none

  window.location.href = loginUrl;
};

export const logout = () => {
  const currentUrl = window.location.href;
  const redirectUrl = isLauncher ? launcherCallbackUrl : currentUrl;
  const logoutUrl = `${baseLogoutUrl}?redirect=${redirectUrl}`;
  
  localStorage.setItem(AUTH_PASSED, new Date().toString());

  window.location.href = logoutUrl;
};
