import { isLauncher } from 'helpers';

const API_URL = process.env.REACT_APP_API_URL;

const baseLoginUrl = `${API_URL}/v1/auth/login`;
const baseLogoutUrl = `${API_URL}/v1/auth/logout`;
const launcherCallbackUrl = 'file:///callback';

export const login = () => {
  const currentUrl = window.location.href;
  const redirectUrl = isLauncher ? launcherCallbackUrl : currentUrl;
  const loginUrl = `${baseLoginUrl}?redirect=${redirectUrl}`;

  window.location.href = loginUrl;
};

export const logout = () => {
  const currentUrl = window.location.href;
  const redirectUrl = isLauncher ? launcherCallbackUrl : currentUrl;
  const loginUrl = `${baseLogoutUrl}?redirect=${redirectUrl}`;

  window.location.href = loginUrl;
};
