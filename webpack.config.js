var path = require('path');

module.exports = {
  entry: './src/lgtv.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lgtv-remote.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  module: {
    loaders: [
      { 
        test: /\.json$/, 
        loader: "json-loader"
      },
      {
        test: /\.js$/, 
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  }
};