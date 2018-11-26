const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)|(jsx)$/, use: 'babel-loader' }
    ]
  }
};