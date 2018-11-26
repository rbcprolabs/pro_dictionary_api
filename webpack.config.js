const
  path = require('path'),
  slsw = require('serverless-webpack'),
  nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'api': path.resolve(__dirname, 'api'),
      'schema': path.resolve(__dirname, 'schema'),
      'handlers': path.resolve(__dirname, 'handlers'),
      'utils': path.resolve(__dirname, 'utils'),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: __dirname,
      exclude: /node_modules/
    }]
  }
}
