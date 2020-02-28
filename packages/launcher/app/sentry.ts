import { init } from '@sentry/electron/dist/main';

if (process.env.NODE_ENV !== 'development') {
  init({
    dsn: process.env.ELECTRON_SENTRY_DSN,
  });
}
