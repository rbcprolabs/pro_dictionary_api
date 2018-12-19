const
  pathResolve = require('path').resolve,
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
      'api': pathResolve(__dirname, 'src/api'),
      'model': pathResolve(__dirname, 'src/model'),
      'schema': pathResolve(__dirname, 'src/schema'),
      'handlers': pathResolve(__dirname, 'src/handlers'),
      'utils': pathResolve(__dirname, 'src/utils'),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      // include: pathResolve(__dirname, 'src'),
      exclude: /node_modules/,
      use: [
        'babel-loader',
        'eslint-loader',
      ],
    }]
  }
}
