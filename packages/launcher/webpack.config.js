const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

const isEnvProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  mode: isEnvProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'app', 'dist'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    modules: [path.join(__dirname, 'app'), 'node_modules'],
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'REACT_APP_API_URL',
      'SENTRY_DSN',
    ]),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
};

const mainConfig = merge.smart(baseConfig, {
  target: 'electron-main',
  entry: './app/main.ts',
  output: {
    filename: 'main.js',
  },
});

const preloadConfig = merge.smart(baseConfig, {
  target: 'electron-preload',
  entry: './app/preload.ts',
  output: {
    filename: 'preload.js',
  },
});

module.exports = [mainConfig, preloadConfig];
