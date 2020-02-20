const { init } = require('@sentry/electron');

if (process.env.NODE_ENV !== 'development') {
  init({
    dsn: process.env.ELECTRON_SENTRY_DSN,
  });
}
