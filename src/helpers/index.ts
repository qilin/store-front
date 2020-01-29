export const qu = (window as any).qu;

const envs: { [key: string]: string } = (window as any)._env_;

export const isDevMod = process.env.NODE_ENV === 'development';

export const isEnvDefined = () => {
  if (isDevMod) return true;
  const envsValues = Object.values(envs);
  return envsValues.length && envsValues.every(variable => variable !== '');
};

export const env = (name: string) => {
  const key = `REACT_APP_${name}`;

  return isDevMod ? process.env[key] : envs[key];
};

export const getUrlParameter = (name: string, search: string) => {
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export const humanStorageSize = (bytes: number) => {
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  return `${bytes.toFixed(1)} ${units[unitIndex]}`;
};

export const megabytesToSize = (megabytes: number) => {
  const bytes = megabytes * 1024 * 1024;
  return humanStorageSize(bytes);
};
