const API_URL = process.env.REACT_APP_API_URL;

const baseLoginUrl = `${API_URL}/v1/auth/login`;
const baseLogoutUrl = `${API_URL}/v1/auth/logout`;

export const login = () => {
  const currentUrl = window.location.href;
  const loginUrl = `${baseLoginUrl}?redirect=${currentUrl}`;

  window.location.href = loginUrl;
};

export const logout = () => {
  const currentUrl = window.location.href;
  const loginUrl = `${baseLogoutUrl}?redirect=${currentUrl}`;

  window.location.href = loginUrl;
};
