/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { babelInclude } = require('customize-cra');

module.exports = function override(config) {
  config = babelInclude([
    path.resolve('src'),
    path.resolve('../shared/src'),
  ])(config);

  return config;
};
