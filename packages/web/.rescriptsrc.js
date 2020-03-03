module.exports = (config) => {
  console.log('CONFIG', config);
  config.output.publicPath = './';
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;
  return config;
}
