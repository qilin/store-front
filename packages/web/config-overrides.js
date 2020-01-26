/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = function override(config) {
  const babel = config.module.rules
    .find(rule => 'oneOf' in rule)
    .oneOf.find(rule => /babel-loader/.test(rule.loader));

  if (!Array.isArray(babel.include)) {
    babel.include = [babel.include];
  }

  babel.include = babel.include.concat([
    path.resolve('src'),
    path.resolve('../shared/src'),
  ]);

  return config;
};
