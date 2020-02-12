const { init } = require('@sentry/electron');

if (process.env.NODE_ENV !== 'development') {
  init({
    dsn: 'https://35ec6e7cd77d4d3284c7644f047f29bb@sentry.io/2459736',
  });
}
