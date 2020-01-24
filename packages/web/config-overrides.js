/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const { override, babelInclude } = require('customize-cra');

// transpile shared-components from root node modules
module.exports = function (config, env) {
  return Object.assign(config, override(
    babelInclude([
      path.resolve('src'),
      fs.realpathSync('../../node_modules/@qilin/shared-components/src'),
    ]),
  )(config, env),
  );
};
