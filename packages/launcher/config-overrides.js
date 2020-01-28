const path = require('path');
const { babelInclude } = require('customize-cra');

module.exports = function override(config) {
  config.target = 'electron-renderer';

  config = babelInclude([
    path.resolve('src'),
    path.resolve('../shared/src'),
  ])(config);

  return config;
};
